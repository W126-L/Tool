let headers = $request.headers;
headers.referer = "https://ha2.dnnmr.cn/cplayer.html?v=2&url="+$request.url
$done({url:$request.url,headers:headers})