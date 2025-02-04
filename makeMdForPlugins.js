const fs = require('fs');
const path = require('path');

function go(){
    const Plugin_path = path.join(__dirname, 'Plugin');
    const plugins = fs.readdirSync(Plugin_path);
    let resHtml = `# Loon 插件列表

<table>
<tr><th> 图  标 </th> <th> 插 件 名 称 </th> <th> 插 件 功 能 </th> </tr >
$content
</table>`



    let tmp = '<tr ><td > <div style="width: 32px; height: 32px; overflow: hidden; display: flex; align-items: center; justify-content: center;"><img src="$icon" width="32" height="32"></div> </td><td><a href="$url"><em>$name</em></a></td><td>$desc</td></tr>'
    let content = ''
    plugins.forEach(plugin => {
        let pluginContent = fs.readFileSync(path.join(Plugin_path, plugin), 'utf8')
        let m = pluginContent.match(/\#\!name.*/g)
        let name = m ? m[0].split('=').pop() : ""
        m = pluginContent.match(/\#\!desc.*/g)
        let desc = m ? m[0].split('=').pop() : ""
        m = pluginContent.match(/\#\!openUrl.*/g)
        let openUrl = m ? m[0].split('=').pop() : ""
        m = pluginContent.match(/\#\!icon.*/g)
        let icon = m ? m[0].split('=').pop() : ""
        if(name && desc && openUrl){
            content += tmp.replace('$name', name.trim()).replace('$desc', desc.trim()).replace(/\$url/g,openUrl.trim()).replace('$icon', icon.trim())
        }
    })
    resHtml = resHtml.replace('$content', content)
    fs.writeFileSync(path.join(__dirname, 'README.md'), resHtml)
}
go()
