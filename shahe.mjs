#!/usr/bin/env zx



function getDate(day = 1) { 
  var dd = new Date();
  dd.setDate(dd.getDate() + day);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return y + m + d;
};

const data = getDate()
console.log(data)

const token =
  "MzI5ZTcwNWQtMWNlMS00NDQ3LWE2ZjMtMjE0NmVmMWJiNjViLDE2NzY5MDkxMzc2NjksVWU1QUZhbXhFRGdEUVZvd0NGS2xiNFZjbkhjPQ==";
const currentDate = getDate();
const timeSlot = "0820-0830"
const row = {
  "lineName": "昌平线",
  "snapshotWeekOffset": 0,
  "stationName": "沙河站",
  "enterDate": currentDate,
  "snapshotTimeSlot": "0630-0930",
  "timeSlot": timeSlot
}

// 睡眠30秒
const sleepTime = 30 * 1000
// 一共调用10次
const maxIndex = 10



const fetchEnd = async () => {
  let index = 0
  const fetchS = async () => {
    index++ 
    const response = await fetch(
      "https://webapi.mybti.cn/Appointment/CreateAppointment",
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
      } else {
        if(index < maxIndex) {
          await sleep(sleepTime)
          await fetchS()
        }
      }
    } else {
      if(index < maxIndex) {
        await sleep(sleepTime)
        await fetchS()
      }
    }
  };
  await fetchS()
}

await fetchEnd()


