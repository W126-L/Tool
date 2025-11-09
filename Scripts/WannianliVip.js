let obj = JSON.parse($response.body);
obj.data.memberType = 1;
obj.data.memberDate = "2166-01-01 00:00:00";
$done({ body: JSON.stringify(obj) });