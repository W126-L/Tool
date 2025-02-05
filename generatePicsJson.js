const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

function makeMD(dirs){
    const mdContent = `# 图标库
此图标库图标由Wuang大偷特偷，由墨倾情制作而成，桀桀桀。
# 图标预览
`   
    let resHtml = ''
    const mdFilePath = path.join(__dirname, 'README.md');
    let imgHtml = `<img src="$src" alt="$alt" width="36" height="36" style="border: 1px solid #000;" loading="lazy">`
    for(dir of dirs){
        const px = dir.split('/').pop()
        const baseURL = 'https://raw.githubusercontent.com/W126-L/Tool/main/IconSet/'+px+'/';
        const files = fs.readdirSync(dir);
        const images = files.filter(file => path.extname(file).toLowerCase() === '.png');
        const imgsHtml = images.map(file => {
            return imgHtml.replace('$src', baseURL + file).replace('$alt', path.basename(file, '.png'))
        })
        resHtml = resHtml + px+ "\n\n" + `<div style="display: flex; flex-wrap: wrap; gap: 10px;">` + imgsHtml.join('\n') + "</div>\n\n"
    }
    fs.writeFile(mdFilePath, mdContent+resHtml, (err) => {
        if (err) {
            console.error('写入 README.md 文件失败:', err);
        } else {
            console.log('成功写入 README.md 文件!');
        }
    })
}
function generatePicsJson(dir) {
    const px = dir.split('/').pop()
    // 定义图片文件的基础 URL
    const baseURL = 'https://raw.githubusercontent.com/W126-L/Tool/main/IconSet/'+px+'/';
    const jsonFileName = px + '.json';
    const jsonData = {
        "name": "墨 & Wuang",
        "description": "此图标库图标由Wuang大偷特偷，由墨倾情制作而成，图片尺寸为" + px,
        "icons": []
    }
    fs.writeFileSync(jsonFileName, JSON.stringify(jsonData, null, 2)); 
    //获取文件夹中的所有文件
    fs.readdir(dir, (err, files) => {
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
        const outputFilePath = path.join(__dirname, jsonFileName);
        fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('写入 JSON 文件失败:', err);
            } else {
                console.log('成功生成 '+jsonFileName+' 文件!');
            }
        });
    });
}

function go(){
    const rootPath = path.join(__dirname, 'IconSet');
    const dirs = fs.readdirSync(rootPath)
    .filter(file => !file.startsWith('.'))  // 忽略以 . 开头的文件或目录
    .map(file => path.join(rootPath, file)) // 获取完整路径
    .filter(filePath => fs.statSync(filePath).isDirectory()); // 只保留目录
    dirs.forEach(dir => {
        generatePicsJson(dir)
    })
    makeMD(dirs)
}
//把IconSet下的图片移动到108px文件夹下
function picsIndir(){
    const rootPath = path.join(__dirname, 'IconSet');
    const files = fs.readdirSync(rootPath)
                    .filter(file => {
                    const filePath = path.join(rootPath, file);
                    const stat = fs.statSync(filePath); // 获取文件或目录的状态
                    return !file.startsWith('.') && stat.isFile(); // 排除隐藏文件或目录并仅返回文件
                    }).map(file => path.join(rootPath, file));
    files.forEach(file => {
        sharp(file).metadata().then(metadata => {
            if(metadata.width === 108){
                //移动到108px文件夹下
                const newPath = file.replace('IconSet', 'IconSet/108px');
                fs.rename(file, newPath, (err) => {
                    if (err) {
                        console.error('移动图片失败:', err);
                    } else {
                        console.log('图片移动成功:', newPath);
                    }
                })
            }else if(metadata.width > 108){
                console.log('图片尺寸大于108px,需要转换:', file);
                if(metadata.format != 'png'){
                    console.log('图片格式为'+metadata.format+'需要转换:', file);
                    let newPath = file.replace('IconSet', 'IconSet/108px').replace(path.extname(file),".png")
                    sharp(file).resize(108,108).png().toFile(newPath, function(err) {
                        if (err) {
                            console.error('转换图片失败:', err);
                        } else {
                            console.log('转换图片成功:', newPath);
                            console.log('删除原图:', file);
                            fs.unlink(file, (err) => {
                                if (err) {
                                    console.error('删除文件失败:', err);
                                } else {
                                    console.log('删除文件成功');
                                }
                            })
                        }
                    });
                }else{
                    sharp(file)
                        .resize(108, 108)
                        .toFile(file.replace('IconSet', 'IconSet/108px'), (err) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log('转换成功');
                                //删除原文件
                                fs.unlink(file, (err) => {
                                    if (err) {
                                        console.error('删除文件失败:', err);
                                    } else {
                                        console.log('删除文件成功');
                                    }
                                })
                            }
                        })
                }
            }else{
                fs.unlink(file, (err) => {
                    if (err) {
                        console.error('删除文件失败:', err);
                    } else {
                        console.log('图片尺寸小于108px，不符合要求,已删除');
                    }
                })
            }
        })
    })
}



function main(){
    picsIndir()
    setTimeout(()=>{
        go()
    },5000)
}
main()
