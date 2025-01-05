/******************************************
 * @name 酷我音乐
 * @description 解锁会员皮肤、会员音频(最高无损)、听书权限, 配合其他去广告脚本达到最佳效果
******************************************
hostname = *.kuwo.cn

^https?:\/\/(?:musicpay|nmobi|vip1|audiobookpay|tingshu｜anymatch)\.kuwo\.cn\/(?:music\.pay\?newver=\d+|mobi.s\?f=kwxs|vip\/(?:enc\/user\/vip\?op=ui&uid=|v2\/theme\?op=gd)|a\.p|v2\/api\/pay\/user\/info) url script-response-body https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/kuwo.js
******************************************/
let url = $request.url
let m = url.match(/vip\/enc/)
if(m){
    $done({body:"Vo4m6X2hTph/vfpPmau8PTT0sFN6JCgzxSLVH/u3sbEt7VniYsVHbRFgOgN+Uvs39rAI7R3C5HVpaSj8tr8U8dLYwYdDCjMILuUorh3z0BiQToiWxudHkcASIPHNrmZHZYC/yv3DP4b89hbzfqU5UUDUqaZpEBZr76sDF2wNPmYjUEFSVCMGyTl1F6j1DBmKJ1Tik0YuG/2UBa/Ilz12a1KneXsNs5x5EE41bXDke7EygIB3I+6SoITZXOLFAFQFZujdI0GzClNglDKtclpUxpjN3uVeJxHLU40FTwNWo3ZDNv8KSdZpYZ5BDEOCyZkifmHlf1wnocX2zTr2xRAM6JhAD2WaSSNQQVJUI5lv72QNZSN43Pj/qdzatHQP4Pp/H1YxyP36rv3qBcnnJy/55YouIczRc3eJjXExRgo54qdyTYRMYoS9GzNn/edR3hSNnMn9PnElBCfZhkL0R5kZ9JBFCM3vNOy7Cnp6RVyAG0GFHv/g2q1yqkJxibyDro5nlnnvHjhZrsOvSvTXI1BBUlQjGoRqqCTDUvHLoiNwWMoKKfxtswWQiXjoQ6mL5dazxjUsbsHzC1N8YNMVtzf8gBryr3nMWS44wyUpi1/0WhGTRW1wsCllO1DB24+ibTFH/yftWN+/apM9vbQAkc/J+aFy/01plK7rsGNwWYYKG0sr6CS8dGQzy0On6aFo07hiU+wjUEFSVCOf/wKzzX5Cn/OLMKeVa1BPDxV5tm39vCrsxIG6T29VHWx8ck93S/nXCm2dHfojuLySZKJ50B1FaN5uFIY+LA1RbO/0sL+CoSJhoNOLibzt75c5dleW+lbwxLAAdBh5AFq4Z1Uj8bPjm5mHcGWQuBAyZIO+ie8wP4yvWwQFf1ENJiNQQVJUIzwCo22cpAtoAzYZWm3XFPfSlov4G15JGaaHL2X5FG5BTeUwwbBiQfwUpcb6oT8dbIKh2SsUZCeJZW43lLI0UIo9u3y1+P4GMtOKEZ7Sx0aQ3ewknthU2tpL0gnykFtiEtKBxcfHjJEen158zVXrbxxC0W35SmaYOOwgAmEMfxwHI1BBUlQjhVUHnBabnJcnmXCICcyUBglrZkXcNLwg91p4889vKFTLlzROHTt20UzjfKWsNK3U8pYgKYXPbQtSzIuRheEEQDFhLvEhIGKaB6yDoacDLJZ0jgFRIKKFBkbK0VE4nIABi1qgQOXvq1sG4QeupjfEWYqMX8EyyqPHrsDiCltAF1wjUEFSVCNybeUusnxJF2zswj8xQtfPiwfDj3TwKWxKXCmkheqHy7/0Qpyc84xWvq+YXktsU97wUZLHrgJmARudJmQNEwAweIdHMafcwreBy731z6kGLojy5TLgTN7XSm5Ar+hgOW+1ZwkWLyrVvaCdO/8/zdYl1w/PQUCs6dw0ThIeahwjpQ=="})
}
m = url.match(/vip\/v2\/theme/)
if(m){
    let res = JSON.parse($response.body)
    res.data.needBieds = null
    $done({body:JSON.stringify(res)})
}
m = url.match(/\/a\.p/)
if(m){
    if($request.method == "GET"){
        let res = JSON.parse($response.body)
        if(res.songs){
            let rid = $request.url.match(/ids=(\d+)/)[1]
            $persistentStore.write(rid, 'kuwo_rid')
            $done({body:JSON.stringify(res)})
        }else{
            res.packs.end = 32495443200;
            res.packs.bought_vip_end = 32495443200;
            res.packs.bought_vip = 1;
            res.packs.type = 1;
            res.packs.period = 31;
            $done({body:JSON.stringify(res)})
        }
    }
    if($request.method == "POST"){
        let res = $response.body
        res = res.replace(/"playright":\d+/g, '"playright":1')
        res = res.replace(/"downright":\d+/g, '"downright":1')
        res = res.replace(/"policytype":\d+/g, '"policytype":3')
        res = res.replace(/"policy":\d+/g, '"policy":5')
        $done({body:res})
    }
}
m = url.match(/music\.pay/)
if(m){
    let user = []
    let res = JSON.parse($response.body)
    let pid = res.songs[0].audio[0].pid
    let type = res.songs[0].audio[0].policy
    let name = type + "_1"
    let id = res.songs[0].id
    $persistentStore.write(id, 'kuwo_rid')
    let price = res.songs[0].audio[0].price
    let audio = res.songs[0].audio.map((item)=>{
        return {
            ...item,
            st: 0
        };
    })
    res.songs[0].audio = audio
    let info_ = res.songs[0]
    let info = {
            "pid": pid,
            "type": type,
            "name": name,
            "categray": name,
            "id": id,
            "order": 375787919,
            "final": [],
            "buy": 1657425321,
            "begin": 1657425321,
            "end": 4180305321,
            "CurEnd": 0,
            "playCnt": 0,
            "playUpper": 300,
            "downCnt": 0,
            "downUpper": 300,
            "playVideoCnt": 0,
            "playVideoUpper": 3000,
            "downVideoCnt": 0,
            "downVideoUpper": 3000,
            "price": price,
            "period": 1000,
            "feetype": 0,
            "info":info_
        }
    user.push(info)
    res.user = user
    $done({body:JSON.stringify(res)})
}
m = url.match(/mobi\.s\?f=kwxs/)
if(m){
    let rid = $persistentStore.read('kuwo_rid')
    if(rid){
        let url = 'https://mobi.kuwo.cn/mobi.s?f=web&source=kwplayer_ar_1.1.9_jiakong_118980_320.apk&type=convert_url_with_sign&rid='+rid+'&priority=bitrate&network=3G&mode=download&br=2000kflac'
        $httpClient.get(url, function(error, response, data) {
            $done({body:data})
        });
    }
}
m = url.match(/vip\/v2\/user\/vip\?vers=/)
if(m){
  let res = JSON.parse($response.body)
	res.data.vipExpire = "4077187200315"
	res.data.isYearUser = "2"
	res.data.vipLuxuryExpire = "4077187200315"
	res.data.svipExpire = "4077187200315"
	res.data.svipAutoPayUser = "1"
	res.data.biedSong = "1"
	res.data.vipIcon = "https://image.kuwo.cn/fe/13e4f930-f8bc-4b86-8def-43cbc3c7d86c7.png"
  res.data.growthValue = "9999"
  res.data.vipTag = "VIP7"
  res.data.openBtnText = "永久会员"
  res.data.vipmIcon = "https://image.kuwo.cn/fe/34ad47f8-da7f-43e4-abdc-e6c995666368yyb.png"
  res.data.svipIcon = "https://image.kuwo.cn/fe/13e4f930-f8bc-4b86-8def-43cbc3c7d86c7.png"
  res.data.vipmExpire = "4077187200315"
  res.data.vipExpires = 4077187200315,
  res.data.luxuryIcon = "https://image.kuwo.cn/fe/2fae68ff-de2d-4473-bf28-8efc29e44968vip.png"
  res.data.luxAutoPayUser = "0"
  res.data.vipExpire = "4077187200315"
  $done({body:JSON.stringify(res)})
}


