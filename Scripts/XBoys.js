let res = JSON.parse($response.body);
res.vipEndTime = "2999-09-09会员到期";
res.cartoonVip = true;
res.vipLevel = 2;
res.nickName = "Wuang ོ";
$done({body:JSON.stringify(res)});