const fs = require('fs');
const path = require('path');

function go(){
    const Plugin_path = path.join(__dirname, 'Plugin');
    const plugins = fs.readdirSync(Plugin_path);
    let resHtml = `# Loon 插件列表

<table>
<tr><th>插件图标</th><th>插件名称</th><th>插件功能</th></tr>
$content
</table>`



    let tmp = `<tr><td style="width: 48px; height: 48px;"><img src="$icon" style="max-width: 100%; max-height: 100%; object-fit: contain;"></td><td><a href="$url"><em>$name</em></a></td><td>$desc</td></tr>`
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
