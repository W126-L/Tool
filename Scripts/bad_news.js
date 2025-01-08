let url = 'https://bad.news/tag/porn/sort-hot/page-' + Math.floor(Math.random() * 10)
async function loadCheerio() {
    return new Promise(async (resolve) => {
        $.getScript(
            'https://cdn.jsdelivr.net/gh/Yuheng0101/X@main/Utils/cheerio.js'
        ).then((fn) => {
            eval(fn)
            const cheerio = createCheerio()
            console.log(`✅ cheerio加载成功, 请继续`)
            resolve(cheerio)
        })
    })
}
const cheerio = await loadCheerio()
console.log(`✅ cheerio加载成功, 请继续`)

var attach = {
    "openUrl":"https://video.twimg.com/ext_tw_video/1876816664043667456/pu/pl/JBGogn26Zdi863kl.m3u8?tag=12",
    "mediaUrl":"https://img.dnnmr.cn/short_image/7ec057d11d0c4f3cb389db976ea0b5e4.jpg"
}
$notification.post("title","subtitle","content",attach)
