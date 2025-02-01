const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
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
//同步文件夹

function tongbu(){
    //同步108px和120px目录中的文件
    const folderPath108 = path.join(__dirname, 'IconSet/108px');
    const folderPath120 = path.join(__dirname, 'IconSet/120px');
    const files108 = fs.readdirSync(folderPath108).filter(file => !file.startsWith('.')).map(file => path.join(folderPath108, file));
    const files120 = fs.readdirSync(folderPath120).filter(file => !file.startsWith('.')).map(file => path.join(folderPath120, file));
    files108.forEach(file => {
        sharp(file).metadata().then(metadata => {
            if (metadata.width === 108) {
                const newPath = file.replace('108px', '120px');
                sharp(file)
                    .resize(120, 120)
                    .toFile(newPath, (err) => {
                        if (err) {
                            console.error('无法生成120px图片:', err);
                        } else {
                            console.log('120px图片生成成功:', newPath);
                        }
                    });
            }else{
                console.log('120px图片已存在:', newPath);
                //移动到120px文件夹下
                const newPath = file.replace('108px', '120px');
                fs.rename(file, newPath, (err) => {
                    if (err) {
                        console.error('无法移动图片:', err);
                    } else {
                        console.log('图片移动成功:', newPath);
                    }
                })
            }
        })
    });
    files120.forEach(file => {
        sharp(file).metadata().then(metadata => {
            if (metadata.width === 120) {
                const newPath = file.replace('120px', '108px');
                sharp(file)
                    .resize(108, 108)
                    .toFile(newPath, (err) => {
                        if (err) {
                            console.error('无法生成108px图片:', err);
                        } else {
                            console.log('108px图片生成成功:', newPath);
                        }
                    });
            }else{
                //移动到108px文件夹下
                const newPath = file.replace('120px', '108px');
                fs.rename(file, newPath, (err) => {
                    if (err) {
                        console.error('无法移动图片:', err);
                    } else {
                        console.log('图片移动成功:', newPath);
                    }
                })
            }
        })
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
}
//把IconSet下的图片移动到108px和120px文件夹下
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
            if (metadata.width === 120) {
                //移动到120px文件夹下
                const newPath = file.replace('IconSet', 'IconSet/120px');
                fs.rename(file, newPath, (err) => {
                    if (err) {
                        console.error('无法移动图片:', err);
                    } else {
                        console.log('图片移动成功:', newPath);
                    }
                })
            }else if(metadata.width === 108){
                //移动到108px文件夹下
                const newPath = file.replace('IconSet', 'IconSet/108px');
                fs.rename(file, newPath, (err) => {
                    if (err) {
                        console.error('移动图片失败:', err);
                    } else {
                        console.log('图片移动成功:', newPath);
                    }
                })
            }else if(metadata.width > 120){
                console.log('图片尺寸大于120px,需要转换:', file);
                if(metadata.format != 'png'){
                    console.log('图片格式为'+metadata.format+'需要转换:', file);
                    let newPath = file.replace('IconSet', 'IconSet/120px').replace(path.extname(file),".png")
                    sharp(file).resize(120).png().toFile(newPath, function(err) {
                        if (err) {
                            console.error('转换图片失败:', err);
                        } else {
                            console.log('转换图片成功:', newPath);
                        }
                    });
                    newPath = file.replace('IconSet', 'IconSet/108px').replace(path.extname(file),".png")
                    sharp(file).resize(108).png().toFile(newPath, function(err) {
                        if (err) {
                            console.error('转换图片失败:', err);
                        } else {
                            console.log('转换图片成功:', newPath);
                            //删除原图
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
                    //转换尺寸120px保存到120px文件夹下
                    sharp(file)
                        .resize(120, 120)
                        .toFile(file.replace('IconSet', 'IconSet/120px'), (err) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log('转换成功');
                            }
                        })
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
                        console.log('图片尺寸小于120px，不符合要求,已删除');
                    }
                })
            }
        })
    })
}
function main(){
    picsIndir()
    tongbu()
    go()
}
main()
