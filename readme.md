# 沙河地铁站预约脚本

沙河地铁早晨预约真卷呀

## 功能

配合crontab进行定时任务预约，每天中午12点或者下午6点进行跑定时任务

两种模式

- shell不传任何参数，在12点进行每隔几秒请求一次
- shell传任何参数，执行while循环2分钟 

## 使用

### crontab配置

```js
  1 #PATH=/bin:/usr/bin:/usr/local/bin
  2 #59 11,19 * * * export NODE_PATH=/usr/local/lib/node_modules/ && /usr/local/    bin/zx /Users/cong/code/my/shahe/shahe.mjs >> /Users/cong/code/my/shahe/cesh    i.txt

```

### 配置token和飞书webhook

```js
//进入shahe.mjs填写以下就好

// 配置token
const token ="";

// 配置飞书webhook
const FeishuWebhookUrl = '';

```

### web token获取

打开网址[https://webui.mybti.cn/#/login](https://webui.mybti.cn/#/login)进行登陆，打开控制台，选中network，点击请求，进行抓取token

## 写这个脚本的原因

手动根本预约不上呀，非常卷。
建议使用while2分钟的形式，从11:59开始进行无限请求。
地铁预约项目应该是外包项目，已经使用几个月没有被封号或出现什么限制。