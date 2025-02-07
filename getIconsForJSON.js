const fs = require('fs');
const path = require('path');
const axios = require('axios');


function go() {
    const rootPath = path.join(__dirname, 'PendJSONs');
    const files = fs.readdirSync(rootPath)
    .filter(file => !file.startsWith('.'))  // 忽略以 . 开头的文件或目录
    .map(file => path.join(rootPath, file)) // 获取完整路径
    console.log(files);
    files.forEach(file => {
        let dirName = path.join(__dirname, 'IconSet', path.basename(file).split('.')[0])
        //创建目录
        fs.mkdirSync(dirName, { recursive: true });
        const data = fs.readFileSync(file, 'utf-8');
        const jsonData = JSON.parse(data);
        const icons = jsonData.icons;
        icons.forEach(icon => {
            const name = (icon.name.indexOf(".png") == -1) ? icon.name + ".png" : icon.name;
            const url = icon.url;
            axios.get(url, { responseType: 'arraybuffer' })
            .then(response => {
                const iconBuffer = Buffer.from(response.data, 'binary');
                fs.writeFileSync(dirName + '/' + name, iconBuffer);
            })
        })
    });
}

go();
