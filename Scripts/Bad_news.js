let type = {
    "短视频": "tag/porn/sort-hot",
    "长视频": "tag/long-porn",
    "日本AV": "av",
    "H动漫": "dm"
}
let app = {
    "Safari": "",
    "zFuse": "splive://",
    "nPlayer": "nplayer-"
}
type = type[$argument.type] || type["短视频"];
let url = 'https://bad.news/' + type + '/page-' + Math.floor(Math.random() * 10)
    async function loadCheerio() {
    return new Promise(async(resolve) => {
        $httpClient.get("https://cdn.jsdelivr.net/gh/Yuheng0101/X@main/Utils/cheerio.js", function (errormsg, response, data) {
            eval(data)
            const cheerio = createCheerio()
                resolve(cheerio)
        })
    })
}
const cheerio = await loadCheerio()
$httpClient.get(url, function (errormsg, response, data) {
	const $ = cheerio.load(data)
	const divs = $('div.cnt.show');
	const randomIndex = Math.floor(Math.random() * divs.length);
	const randomElement = divs[randomIndex];
	const linkText = $(randomElement).find('h3 a').text().replace(/\s+/g, '');
	const videoUrl = $(randomElement).find('video.my-videos').attr('data-source')
	const imgUrl = $(randomElement).find('video.my-videos').attr('poster')
	var attach = {
		"mediaUrl":imgUrl,
		"openUrl": app[$argument.app] + videoUrl
	}
	$notification.post("bad.news", "", linkText, attach)
	$done()
})
