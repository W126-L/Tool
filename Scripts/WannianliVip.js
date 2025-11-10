let url = $request.url
let m = url.match(/api\/Member\/IsMember/)
if(m){
let obj = JSON.parse($response.body);
obj.data.isMember = true;
obj.data.endTime = "2099-12-31 23:59:59";
$done({ body: JSON.stringify(obj) });
}
m = url.match(/Api\/User\/GetExtInfo/)
if(m){
let obj = JSON.parse($response.body);
obj.data.memberType = 1;
obj.data.memberDate = "2099-12-31 23:59:59";
$done({ body: JSON.stringify(obj) });
}