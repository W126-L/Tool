/*
趣听音乐
解锁会员权益
*/

try{
let res = JSON.parse($response.body)
res.data.data[0].is_vip=true
$done({body:JSON.stringify(res)})
}catch(e){
$done($response)
}
