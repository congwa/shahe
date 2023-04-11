#!/usr/bin/env zx

// 配置token
const token ="";

// 配置飞书webhook
const FeishuWebhookUrl = '';

const currentTimeOut = new Date().getTime()




const currentDate = getDate();
const timeSlot = "0820-0830";

// 睡眠30秒
const sleepTime = 30 * 1000;
// 一共调用10次
const maxIndex = 10;

const requestUrl = 'https://webapi.mybti.cn/Appointment/CreateAppointment';







const row = {
  "lineName": "昌平线",
  "snapshotWeekOffset": 0,
  "stationName": "沙河站",
  "enterDate": currentDate,
  "snapshotTimeSlot": "0630-0930",
  "timeSlot": timeSlot
}





function getDate(day = 1) {
  var dd = new Date();
  dd.setDate(dd.getDate() + day);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return y + m + d;
};


const fetchFeishu = async () => {
  await fetch(, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "msg_type": "text",
      "content": {
        "text": currentDate + '预约进站成功'
      }
    })
  })
}

const fetchFeishuFail = async () => {
  await fetch(FeishuWebhookUrl, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "msg_type": "text",
      "content": {
        "text": currentDate + '预约失败'
      }
    })
  })
}

const fetchWhileTrue = async () => {
  let isSucceed = await fetchWangCong()
  const hasTwoMinute = ((new Date().getTime() - currentTimeOut) / 60 / 1000)  > 2
  if(!isSucceed) {
    while(!isSucceed && !hasTwoMinute) {
      isSucceed =  await fetchWangCong()
    }
  }
}


const fetchWangCong = async () => {
      const response = await fetch(
      requestUrl,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
          authorization: token,
          "content-type": "application/json;charset=UTF-8",
          "sec-ch-ua":
            '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          Referer: "https://webui.mybti.cn/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: JSON.stringify(row),
        method: "POST",
      }
    );
    if (response.ok) {
      const json = await response.clone().json();
      console.log(json)
      if (json.stationEntrance) {
        await fetchFeishu()
        return true
      } 
    }
    return false
}

const fetchEnd = async () => {
  let index = 0
  console.log('\n')
  const fetchS = async () => {
    index++
    const response = await fetch(
      requestUrl,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
          authorization: token,
          "content-type": "application/json;charset=UTF-8",
          "sec-ch-ua":
            '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          Referer: "https://webui.mybti.cn/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: JSON.stringify(row),
        method: "POST",
      }
    );
    if (response.ok) {
      const json = await response.clone().json();
      console.log(json)
      if (json.stationEntrance) {
        await fetchFeishu()
      } else {
        await fetchFeishuFail()
        if (index < maxIndex) {
          await sleep(sleepTime)
          await fetchS()
        }
      }
    } else {
      await fetchFeishuFail()
      if (index < maxIndex) {
        await sleep(sleepTime)
        await fetchS()
      }
    }
  };
  await fetchS()
}

// 如果有任意参数,进行while循环2分钟
if($1) {
  await fetchWhileTrue()
} else {
  await fetchEnd()
}


/**
 * 
  1 #PATH=/bin:/usr/bin:/usr/local/bin
  2 #59 11,19 * * * export NODE_PATH=/usr/local/lib/node_modules/ && /usr/local/    bin/zx /Users/cong/code/my/shahe/shahe.mjs >> /Users/cong/code/my/shahe/cesh    i.txt
 * 
 * 
 */


