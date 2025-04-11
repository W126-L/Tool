let url = $request.url
let res = JSON.parse($response.body);
let m = url.match(/Account\/IndexDetail/)
if(m){
res.vipEndTime = "2999-09-09会员到期";
res.cartoonVip = true;
res.vipLevel = 2;
res.nickName = "Wuang ོ";
$done({body:JSON.stringify(res)});
}
m = url.match(/api\/movie\/DetailInfo/)
if(m){
res.movie.isFree = true;
$done({body:JSON.stringify(res)});
}
$done({body:JSON.stringify(res)});