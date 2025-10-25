/*
app：地址预警
[rewrite_local]
https://mobile-new.chinaeew.cn/v1/order/apple/vip url script-response-body https://raw.githubusercontent.com/W126-L/Tool/master/Scripts/Earthquake.js
hostname = mobile-new.chinaeew.cn
*/
let obj = JSON.parse($response.body);
const timestamp = Date.now() + 24 * 60 * 60 * 1000;
obj.data = {
  "productName" : "SVIP",
  "endTime" : timestamp,
  "vipType" : "svip",
  "productId" : "earthquake_early_warning_SVIP",
  "upgradePrice" : 0
};
$done({ body: JSON.stringify(obj) });
