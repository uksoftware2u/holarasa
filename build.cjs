const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=__dirname;
const output=path.join(root,'dist');
const source=fs.readFileSync(path.join(root,'app.js'),'utf8');
const template=fs.readFileSync(path.join(root,'shell.html'),'utf8');
const routes={
  index:['HOLA RASA · 把祝福，做成一份好礼','红龟粿的祝福寓意、五种口味、满月礼盒与企业客制设计。'],
  products:['产品与口味 · HOLA RASA','探索原味、咸味、花生、伯爵茶与抹茶红龟粿，查看真实馅料特写。'],
  gifts:['满月礼盒 · HOLA RASA','探索木纹与摇篮满月礼盒，以红龟粿分享迎接新生命的喜悦。'],
  customization:['企业客制 · HOLA RASA','依据企业需求讨论红龟粿的客制形状与设计，为活动与赠礼传递品牌心意。'],
  order:['产品订购 · HOLA RASA','选择产品、口味和数量，整理配送资料，通过 WhatsApp 发送订购需求。'],
  booking:['预约 · HOLA RASA','提前预约满月礼盒、宴会糕点与批量订购，由商家确认日期与安排。'],
  inquiry:['联系与咨询 · HOLA RASA','咨询产品、口味、企业客制设计及冷链配送。'],
  about:['关于我们 · HOLA RASA','一份红龟粿，一份祝福。认识 HOLA RASA 的品牌故事。']
};
fs.mkdirSync(output,{recursive:true});
for(const [route,meta] of Object.entries(routes)){
  const context={window:{__HOLA_PRERENDER__:true},document:{},localStorage:{getItem:()=>null},location:{pathname:'/'+route+'.html'},URLSearchParams,Intl,Date};
  vm.runInNewContext(source,context,{timeout:3000});
  if(!context.window.__HOLA_HTML__?.includes('<main'))throw new Error('Failed to render '+route);
  const html=template.replace('<div id="app"></div>',`<div id="app">${context.window.__HOLA_HTML__}</div>`).replace(/<title>.*?<\/title>/,`<title>${meta[0]}</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${meta[1]}">`);
  fs.writeFileSync(path.join(root,route+'.html'),html);
  fs.writeFileSync(path.join(output,route+'.html'),html);
}
for(const file of ['app.js','styles.css'])fs.copyFileSync(path.join(root,file),path.join(output,file));
fs.mkdirSync(path.join(output,'assets'),{recursive:true});
const assets=['favicon.svg','logo.jpg','hero.jpg','original.jpg','savory.jpg','peanut.jpg','earl-grey.jpg','matcha.jpg','gift-1.jpg','gift-2.jpg',...Array.from({length:6},(_,i)=>'product-'+(i+1)+'.jpg')];
for(const file of assets)fs.copyFileSync(path.join(root,'assets',file),path.join(output,'assets',file));
fs.writeFileSync(path.join(output,'robots.txt'),'User-agent: *\nAllow: /\n');
for(const file of Object.keys(routes)){
  const html=fs.readFileSync(path.join(output,file+'.html'),'utf8');
  for(const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/g)){
    const ref=match[1];if(!/^(https?:|data:|tel:|mailto:)/.test(ref)&&!fs.existsSync(path.join(output,ref)))throw new Error('Missing reference '+ref+' in '+file);
  }
}
console.log('Built and checked 8 pages, local assets and internal links. Output: '+output);
