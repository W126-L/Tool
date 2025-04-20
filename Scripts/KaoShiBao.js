/**************************
\考\试\宝\ \部\分\功\能\解\锁\
\广\告\拦\截\




[mitm]
hostname = api.ankianki.com

[rewrite_local]
https:\/\/api\.ankianki\.com url script-response-body https://raw.githubusercontent.com/W126-L/Tool/master/Scripts/KaoShiBao.js
https:\/\/api\.ankianki\.com\/banner\/get url reject-200
https:\/\/api\.ankianki\.com\/popupAd\/get url reject-200
https:\/\/api\.ankianki\.com\/ad url reject-200
 ***************/
