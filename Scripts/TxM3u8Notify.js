/*
 * 糖心 Vlog - M3u8 视频链接通知
 * 可编辑参数：scheme（协议头，Loon 界面选择项）
 *   "Safari"  = 保持原始 URL（https）
 *   "墨阁阁"   = 改为 mobox://download?url=原始URL
 */
var schemeLabel = ($argument && $argument.scheme) ? $argument.scheme : "Safari";

// 中文选项名 → 处理方式 的映射
var schemeMap = {
  "Safari": "",
  "墨阁阁": "mobox"
};
var NOTIFY_SCHEME = schemeMap[schemeLabel] !== undefined ? schemeMap[schemeLabel] : "";

var url = $request.url;
var match = url.match(/^https?:\/\/api\.[^\/]+\.(com|net|io|xyz|cn)\/txapi\/m3u8\/p\/[^\/?]+\.m3u8/);

if (match) {
  var notifyUrl = url;

  if (NOTIFY_SCHEME === "mobox") {
    // 关键改动：把原始 URL 作为 url 参数拼进 mobox://download?url=...
    notifyUrl = "mobox://download?url=" + url;
  }

  // 去重：同一链接只通知一次
  var key = "tx_m3u8_notified";
  var lastUrl = $persistentStore.read(key);

  if (lastUrl !== notifyUrl) {
    $notification.post(
      "Tx",
      "M3u8视频",
      "点击跳转",
      {
        openUrl: notifyUrl,
        clipboard: notifyUrl
      },
      300
    );
    $persistentStore.write(notifyUrl, key);
  }
}

$done({});
