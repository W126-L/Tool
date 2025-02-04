const fs = require('fs');
const path = require('path');

function go(){
    const Plugin_path = path.join(__dirname, 'Plugin');
    const plugins = fs.readdirSync(Plugin_path);
    let resHtml = `<table>
    <tr> <th> 插件名称 </th> <th> 插件功能 </th> </tr >
    <tr>
		$content
    </tr>
    </table>`
    let tmp = '<tr ><td ><a href="$url"><em>$name</em></a></td><td>$desc</td></tr>'
    let content = ''
    plugins.forEach(plugin => {
        let pluginContent = fs.readFileSync(path.join(Plugin_path, plugin), 'utf8')
        let m = pluginContent.match(/\#\!name.*/g)
        let name = m ? m[0].split('=').pop() : ""
        m = pluginContent.match(/\#\!desc.*/g)
        let desc = m ? m[0].split('=').pop() : ""
        m = pluginContent.match(/\#\!openUrl.*/g)
        let openUrl = m ? m[0].split('=').pop() : ""
        if(name && desc && openUrl){
            content += tmp.replace('$name', name).replace('$desc', desc).replace('$url', openUrl)
        }
    })
    resHtml = resHtml.replace('$content', content)
    fs.writeFileSync(path.join(__dirname, 'README.md'), resHtml)
}
go()
