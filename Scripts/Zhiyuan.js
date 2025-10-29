/*
app：知源经络穴位
*/
let obj = JSON.parse($response.body);
const date = new Date();
date.setDate(date.getDate() + 33333);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');

const formatted = `${year}-${month}-${day}`;
obj.data.vipEndedAt=formatted;
$done({ body: JSON.stringify(obj) });