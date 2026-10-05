(() => {
  'use strict';
  const words = [
    ['愿你所盼，皆有回响。','May what you hope for find its answer.'],
    ['愿好消息，正在向你走来。','May good news find its way to you.'],
    ['愿你与在乎的人，平安顺心。','May you and those you love find peace and ease.'],
    ['愿日子有盼头，心里有暖意。','May your days hold hope and your heart hold warmth.'],
    ['愿每一份认真，都被温柔回应。','May your efforts be met with kindness.']
  ];
  let number = null, wish = 0, rolling = false, timer = null;
  const shared = new URLSearchParams(location.search).get('number');
  if (/^\d{4}$/.test(shared || '')) number = shared;
  const sharedWish = new URLSearchParams(location.search).get('wish');
  if(number && /^[0-4]$/.test(sharedWish || '')) wish=Number(sharedWish);
  const zh = () => document.documentElement.lang.startsWith('zh');
  const text = (a,b) => zh() ? a : b;
  const random = max => {const data=new Uint32Array(1);const limit=Math.floor(4294967296/max)*max;do{crypto.getRandomValues(data);}while(data[0]>=limit);return data[0]%max;};
  const baseURL = () => {const u=new URL(location.href);u.search='';u.hash='';return u;};
  const shareURL = () => {const u=baseURL();if(number){u.searchParams.set('number',number);u.searchParams.set('wish',wish);}return u.href;};
  const message = () => [text('财神送福 🧧','A little good fortune 🧧'),number?text('我的四位好彩头：','My four lucky digits: ')+number:'',text(...words[wish]),text('来领取你的祝福。','Reveal a little good fortune of your own.'),shareURL()].filter(Boolean).join('\n');
  const find = id => document.getElementById(id);
  function paint(){
    document.querySelectorAll('.fortune-digits span').forEach((el,i)=>el.textContent=number?number[i]:'—');
    find('fortune-wish').textContent=number?text(...words[wish]):text('心怀美好，让祝福在这一刻发生。','A moment for good wishes. A little joy to share.');
    find('fortune-generate').textContent=number?text('再领一份好彩头','Reveal another little blessing'):text('领取财神祝福','Reveal my good fortune');
    find('fortune-copy').disabled=!number;
    find('fortune-whatsapp').href='https://wa.me/?text='+encodeURIComponent(message());
    find('fortune-facebook').href='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(shareURL());
  }
  async function copy(value){try{await navigator.clipboard.writeText(value);return true;}catch{return false;}}
  function reveal(){
    if(rolling)return;rolling=true;const chosen=String(random(10000)).padStart(4,'0');const chosenWish=random(words.length);const button=find('fortune-generate');button.disabled=true;find('fortune-card').classList.remove('is-revealed');find('fortune-card').classList.add('is-rolling');find('fortune-share-status').textContent='';
    const done=()=>{clearInterval(timer);timer=null;number=chosen;wish=chosenWish;rolling=false;paint();button.disabled=false;find('fortune-card').classList.remove('is-rolling');find('fortune-card').classList.add('is-revealed');find('fortune-announcement').textContent=text('你的四位好彩头是 ','Your four lucky digits are ')+number+'. '+text(...words[wish]);try{history.replaceState(null,'',shareURL());}catch{}};
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){done();return;}
    let ticks=0;timer=setInterval(()=>{document.querySelectorAll('.fortune-digits span').forEach(el=>el.textContent=random(10));if(++ticks>=12)done();},75);
  }
  function init(){
    if(!find('fortune-generate'))return;
    if(timer){clearInterval(timer);timer=null;rolling=false;}
    paint();
    find('fortune-generate').addEventListener('click',reveal);
    find('fortune-copy').addEventListener('click',async()=>{if(number)find('fortune-share-status').textContent=await copy(number)?text('号码已复制，把好心意分享出去吧。','Digits copied. Pass a little good wish along.'):text('请手动复制号码：','Please copy the digits: ')+number;});
    find('fortune-facebook').addEventListener('click',()=>{if(number){void copy(message()).then(ok=>{find('fortune-share-status').textContent=ok?text('号码与祝福已复制，可在 Facebook 贴文中粘贴。','Your digits and wish are copied. Paste them into your Facebook post.'):text('可将号码与祝福复制至 Facebook 贴文。','Copy your digits and wish into your Facebook post.');});}});
  }
  window.HolaFortune={init};
  init();
})();
