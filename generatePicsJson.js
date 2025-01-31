const fs = require('fs');
const path = require('path');

// 定义文件夹路径
const folderPath = path.join(__dirname, 'IconSet');

// 定义图片文件的基础 URL
const baseURL = 'https://raw.githubusercontent.com/W126-L/Tool/main/IconSet/';
const jsonData = {
    "name": "墨 & Wuang",
    "description": "此图标库图标由Wuang大偷特偷，由墨倾情制作而成，桀桀桀，遇到两个相同图标，可选择搜索108px or 120px，选择对应的即可",
    "icons": []
}
fs.writeFileSync('pics.json', JSON.stringify(jsonData, null, 2)); 



// 获取文件夹中的所有文件
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('无法读取文件夹:', err);
        return;
    }

    // 筛选出所有图片文件（假设是 .png 格式）
    const images = files.filter(file => path.extname(file).toLowerCase() === '.png');

    // 生成 icons 数组
    const icons = images.map(file => ({
        name: path.basename(file, '.png'),  // 提取文件名，去掉扩展名
        url: `${baseURL}${file}`
    }));

    // 构建最终的 JSON 数据
    jsonData.icons = icons;

    // 将结果写入 pics.json 文件
    const outputFilePath = path.join(__dirname, 'pics.json');
    fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.error('写入 JSON 文件失败:', err);
        } else {
            console.log('成功生成 pics.json 文件!');
        }
    });
});
