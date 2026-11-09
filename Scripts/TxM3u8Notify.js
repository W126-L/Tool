/*
 * 糖心 Vlog - M3u8 视频链接通知
 * 用途：匹配到 m3u8 播放地址时弹出通知，可一键跳转或复制链接
 */
var url = $request.url;

var match = url.match(/^https?:\/\/api\.[^\/]+\.(com|net|io|xyz|cn)\/txapi\/m3u8\/p\/[^\/?]+\.m3u8/);

if (match) {
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
}

$done({});
