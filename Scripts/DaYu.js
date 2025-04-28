const $ = new Env("DaYu");
let apis = ["https://dayu.qqsuu.cn/moyuribaoshipin/apis.php?type=json","https://dayu.qqsuu.cn/moyuribao/apis.php?type=json","https://dayu.qqsuu.cn/moyurili/apis.php?type=json","https://dayu.qqsuu.cn/mingxingbagua/apis.php?type=json","https://dayu.qqsuu.cn/neihanduanzi/apis.php?type=json","https://dayu.qqsuu.cn/weiyujianbao/apis.php?type=json","https://dayu.qqsuu.cn/qingganhuayuan/apis.php?type=json","https://dayu.qqsuu.cn/xingzuoyunshi/apis.php?type=json"];
let ms = apis.map((api)=>{
	return new Promise((resolve, reject) => {
  let option1 = {
    url: encodeURI(api),
    method: "GET",
    headers: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
      "sec-ch-ua":
        '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
    },
  };
  $.get(option1, (err, resp, response) => {
    if (response) {
      let obj = JSON.parse(response);
      resolve(obj);
    } else {
      getError("_error_1" + "获取失败，请稍后再试❗️");
    }
  });
});
});
Promise.all(ms)
  .then((result) => {
      result.forEach((item, index) => {
        switch (index) {
          case 0:
					  if($argument.moyushipin){
              $.notify("DaYu","摸鱼视频","",item.data);
						}
            break;
					case 1:
          if($argument.moyuribao){
            $.notify("DaYu","摸鱼日报","",item.data);
            }
            break;
					case 2:
          if($argument.moyurili){
            $.notify("DaYu","摸鱼日历","",item.data);
            }
            break;
					case 3:
          if($argument.mingxingbagua){
            $.notify("DaYu","明星八卦","",item.data);
            }
            break;
					case 4:
          if($argument.neihanduanzi){
            $.notify("DaYu","内涵段子","",item.data);
            }
            break;
					case 5:
          if($argument.xinwenjianbao){
           $.notify("DaYu","新闻简报","",item.data);
          }
            break;
					case 6:
          if($argument.qingganhuayuan){
            $.notify("DaYu","情感花园","",item.data);
            }
            break;
					case 7:
          if($argument.xingzuoyunshi){
            $.notify("DaYu","星座运势","",item.data);
            }
            break;
          default:
            break;
        }
      });
  })
  .catch((error) => {
    console.log(error);
    getError("_error_1");
  });
function getGoneDay(n = 0, yearFlag = true) {
  let myDate = new Date();
  myDate.setDate(myDate.getDate() - n);
  let month = myDate.getMonth() + 1;
  let day = myDate.getDate();
  let result =
    "" +
    (yearFlag ? myDate.getFullYear() : "") +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day);
  return result;
}
function getError(params = "") {
  $.notify(
    "DaYu",
    "",
    "🚧" + params,
    "https://i.pixiv.re/img-original/img/2023/06/15/23/00/01/109042224_p0.jpg"
  );
}
setTimeout(() => {
  $done({});
}, 3000);

function Env(name) {
  // 判断当前环境是否为 Loon
  const isLoon = typeof $loon !== "undefined";
  // 判断当前环境是否为 Surge
  const isSurge = typeof $httpClient !== "undefined" && !isLoon;
  // 判断当前环境是否为 QuantumultX
  const isQX = typeof $task !== "undefined";

  // 定义 read 方法，用于读取数据
  const read = (key) => {
    if (isLoon || isSurge) return $persistentStore.read(key);
    if (isQX) return $prefs.valueForKey(key);
  };

  // 定义 write 方法，用于写入数据
  const write = (key, value) => {
    if (isLoon || isSurge) return $persistentStore.write(key, value);
    if (isQX) return $prefs.setValueForKey(key, value);
  };

  // 定义 notify 方法，用于发送通知
  const notify = (title = "XiaoMao", subtitle = "", message = "", url = "",url2 = url) => {
    if (isLoon) $notification.post(title, subtitle, message, url);
    if (isSurge) $notification.post(title, subtitle, message, { url });
    if (isQX) $notify(title, subtitle, message, { "open-url": url, "media-url": url2 });
  };

  // 定义 get 方法，用于发送 GET 请求
  const get = (url, callback) => {
    if (isLoon || isSurge) $httpClient.get(url, callback);
    if (isQX) {
      url.method = `GET`;
      $task.fetch(url).then((resp) => callback(null, {}, resp.body));
    }
  };

  // 定义 post 方法，用于发送 POST 请求
  const post = (url, callback) => {
    if (isLoon || isSurge) $httpClient.post(url, callback);
    if (isQX) {
      url.method = `POST`;
      $task.fetch(url).then((resp) => callback(null, {}, resp.body));
    }
  };

  // 定义 put 方法，用于发送 PUT 请求
  const put = (url, callback) => {
    if (isLoon || isSurge) $httpClient.put(url, callback);
    if (isQX) {
      url.method = "PUT";
      $task.fetch(url).then((resp) => callback(null, {}, resp.body));
    }
  };

  // 定义 toObj 方法，用于将字符串转为对象
  const toObj = (str) => JSON.parse(str);

  // 定义 toStr 方法，用于将对象转为字符串
  const toStr = (obj) => JSON.stringify(obj);

  // 定义 queryStr 方法，用于将对象转为可以请求的字符串
  const queryStr = (obj) => {
    return Object.keys(obj)
      .map((key) => `${key}=${obj[key]}`)
      .join("&");
  };

  // 定义 log 方法，用于输出日志
  const log = (message) => console.log(message);

  // 定义 done 方法，用于结束任务
  const done = (value = {}) => $done(value);

  // 返回包含所有方法的对象
  return {
    name,
    read,
    write,
    notify,
    get,
    post,
    put,
    toObj,
    toStr,
    queryStr,
    log,
    done,
  };
}