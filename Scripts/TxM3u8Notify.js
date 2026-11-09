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

// ===== 可编辑：去重缓存期限（毫秒） =====
// 默认 10 分钟。同一链接在期限内只通知一次，超期后可再次通知
var CACHE_TTL = 1 * 60 * 1000;

var url = $request.url;
var match = url.match(/^https?:\/\/api\.[^\/]+\.(com|net|io|xyz|cn)\/txapi\/m3u8\/p\/[^\/?]+\.m3u8/);

if (match) {
  var notifyUrl = url;

  if (NOTIFY_SCHEME === "mobox") {
    notifyUrl = "mobox://download?url=" + url;
  }

  // ===== 带期限的去重 =====
  var key = "tx_m3u8_notified";
  var cache = $persistentStore.read(key);   // 存的是 "时间戳|链接"
  var now = Date.now();
  var shouldNotify = true;

  if (cache) {
    var sep = cache.indexOf("|");
    if (sep > 0) {
      var ts = parseInt(cache.substring(0, sep), 10);
      var cachedUrl = cache.substring(sep + 1);
      // 链接相同 且 未超期 → 跳过
      if (cachedUrl === notifyUrl && !isNaN(ts) && (now - ts) < CACHE_TTL) {
        shouldNotify = false;
      }
    }
  }

  if (shouldNotify) {
    $notification.post(
      "糖心",
      "M3u8视频",
      "点击跳转",
      {
        openUrl: notifyUrl,
        clipboard: notifyUrl
      },
      300
    );
    // 存 "时间戳|链接"
    $persistentStore.write(now + "|" + notifyUrl, key);
  }
}

$done({});
