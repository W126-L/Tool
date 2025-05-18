var body = $response.body;
var replacements = [
  { regex: /广告合作[\s\S]*?(<\/p>)/g, replaceWith: '$1' },  // 删除多余内容
  { regex: /<a class="" href="https:\/\/[^"]+" target="_blank" data-str="[^"]*">[^<]+<\/a>/g, replaceWith: '<!--  -->' },  // 删除特定广告链接按钮
  { regex: /<a target="_blank" href="http[s]?:\/\/[^"]+" data-str="[^"]*">[\s\S]*?<\/a>/g, replaceWith: '<!--  -->' },  // 删除所有广告图标按钮
  { regex: /<div class="float-app">[\s\S]*?(<!--  -->)/g, replaceWith: '' },  // 删除底部横幅广告
  { regex: /<h3 class="mt-4">猜你喜欢<\/h3>[\s\S]*?(<div class="mt-5 text-center">)/g, replaceWith: '$1' },  //删除“猜你喜欢”
  { regex: /<div id="popup">[\s\S]*?(<div class="header">)/g, replaceWith: '$1' }, 
  { regex: /<div id="launch">[\s\S]{0,500}(<\/div>)/g, replaceWith: '' },  // 删除开屏广告
  { regex: /(<!--\s*-->)(\s*\1)+/g, replaceWith: '$1' },  // 删除多余的注释
  { regex: /<div class="col-6 item">[\s\S]{0,10}?(<a[^>]*?target="_blank"[^>]*?>[\s\S]{0,300}<\/a>)\s*<\/div>/g, replaceWith: '' }  // 删除插图广告
];

replacements.forEach(({ regex, replaceWith }) => {
  body = body.replace(regex, replaceWith);
});

$done({ body });
