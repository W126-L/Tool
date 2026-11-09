/*
 * 糖心 Vlog - M3u8 视频链接通知
 * 可编辑参数：scheme（协议头）
 *   ""       = 保持原始 URL（默认）
 *   "https"  = 强制 https
 *   "mobox"  = 替换为 mobox://
 */
var NOTIFY_SCHEME = ($argument && $argument.scheme) ? $argument.scheme : "";

var url = $request.url;
var match = url.match(/^https?:\/\/api\.[^\/]+\.(com|net|io|xyz|cn)\/txapi\/m3u8\/p\/[^\/?]+\.m3u8/);

if (match) {
  var notifyUrl = url;

  if (NOTIFY_SCHEME) {
    notifyUrl = notifyUrl.replace(/^https?:\/\//, NOTIFY_SCHEME + "://");
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
