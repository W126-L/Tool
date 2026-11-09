var url = $request.url;
var match = url.match(/^https?:\/\/api\.[^\/]+\.(com|net|io|xyz|cn)\/txapi\/m3u8\/p\/[^\/?]+\.m3u8/);

if (match) {
  // 用 URL 的哈希或截断值作为 key，避免 key 过长
  var key = "tx_m3u8_notified";
  var lastUrl = $persistentStore.read(key);

  if (lastUrl !== url) {
    // 是新的 URL，发通知并记录
    $notification.post(
      "Tx",
      "M3u8视频",
      "点击跳转",
      {
        openUrl: url,
        clipboard: url
      },
      300
    );
    $persistentStore.write(url, key);
  }
  // 如果是同一个 URL，静默跳过，不发通知
}

$done({});
