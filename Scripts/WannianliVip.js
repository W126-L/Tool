let url = $request.url
let m = url.match(/api\/Member\/IsMember/)
if(m){
let obj = JSON.parse($response.body);
obj.data.isMember = true;
obj.data.endTime = "2166-01-01 00:00:00";
$done({ body: JSON.stringify(obj) });
}
m = url.match(/Api\/User\/GetExtInfo/)
if(m){
let obj = JSON.parse($response.body);
obj.data.memberType = 1;
obj.data.memberDate = "2166-01-01 00:00:00";
$done({ body: JSON.stringify(obj) });
}