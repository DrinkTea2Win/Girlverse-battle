/* GIRLVERSE deep reskin: original game engine and UI remain the base. */
(function(){
"use strict";
const GV=window.GIRLVERSE=window.GIRLVERSE||{version:"2.0-deep-reskin"};
const PROMO=new Set(["Пельмешка","DrinkTea2Win"]);
try{Object.values(codeList||{}).forEach(c=>{if(c&&c.type==="card"&&c.tpl)PROMO.add(c.tpl)})}catch(_){}
const nameMap=new Map(),usedNames=new Set();
const P=["Люми","Амет","Эли","Сел","Роз","Виол","Нова","Фэй","Крист","Мира","Саф","Аур","Лун","Ирис","Эст","Кира","Зефир","Мел","Тиар","Астра","Рин","Флора","Сия","Вель","Ним","Лея","Кора","Эйра","Магн","Руби","Соль","Яра","Офел","Лили","Ария","Ная","Кэсс","Элора","Вега"];
const S=["эль","ия","ара","ис","ея","ора","ина","айя","ира","ена","али","етта","уна","иса","ория","ана","еста","ми","рия","елла","аэль","исса","ора","ена","аль","ейя"];
function fairyName(i){
 let n=i;
 for(let g=0;g<5000;g++,n++){
  const x="Фея "+P[n%P.length]+S[Math.floor(n/P.length)%S.length]+(Math.floor(n/(P.length*S.length))?" "+(Math.floor(n/(P.length*S.length))+1):"");
  if(!usedNames.has(x)&&!PROMO.has(x)){usedNames.add(x);return x}
 }
 return "Фея Girlverse "+i
}
try{
 Object.keys(customCardTemplates||{}).forEach(r=>{
  (customCardTemplates[r]||[]).forEach(t=>{
   if(!t||PROMO.has(t.name))return;
   if(!t.originalName){t.originalName=t.name;nameMap.set(t.originalName,fairyName(usedNames.size));}
   t.name=nameMap.get(t.originalName)||t.name;
   if(typeof t.damage==="number")t.damage=Math.max(1,Math.floor(t.damage*.1));
   if(typeof t.hp==="number")t.hp=Math.max(1,Math.floor(t.hp*.1));
   t.universe="Girlverse";
   t.desc="Магическая героиня Girlverse. "+(t.ability&&t.ability.desc||"Уникальная способность сохраняет исходную механику.");
  })
 })
}catch(_){}
function migrateCards(){
 if(typeof myCards==="undefined"||!Array.isArray(myCards))return;
 myCards.forEach(c=>{
  if(!c||PROMO.has(c.name))return;
  if(!c.originalName&&nameMap.has(c.name))c.originalName=c.name;
  if(c.originalName&&nameMap.has(c.originalName))c.name=nameMap.get(c.originalName);
  if(c.originalName&&c.originalName!=="Пельмешка"&&c.originalName!=="DrinkTea2Win"&&!c.gvScaled){
   if(typeof c.damage==="number")c.damage=Math.max(1,Math.floor(c.damage*.1));
   if(typeof c.hp==="number")c.hp=Math.max(1,Math.floor(c.hp*.1));
   c.universe="Girlverse";
   c.gvScaled=true;
  }
 })
}
const bossMap=new Map(),BP=["Леди","Императрица","Королева","Хранительница","Владычица","Архифея","Звёздная Стражница","Кристальная Ведьма","Лунная Магистр","Розовая Хранительница","Астральная Фея","Повелительница Сияния"],BC=["Розового Неба","Хрустальной Луны","Сахарного Хаоса","Звёздного Сада","Лунных Врат","Алого Сияния","Сладкой Бури","Вечной Искры","Фиолетовой Кометы","Небесных Цветов","Солнечного Кристалла","Магической Туманности"];
try{
 let bi=0;
 Object.keys(bossTemplates||{}).forEach(k=>{
  const b=bossTemplates[k];if(!b)return;
  const old=b.name,newName=BP[bi%BP.length]+" "+BC[Math.floor(bi/BP.length)%BC.length];bi++;
  bossMap.set(old,newName);b.originalName=old;b.name=newName;
  if(typeof b.hpMult==="number")b.hpMult*=.01;
  if(typeof b.dmgMult==="number")b.dmgMult*=.01;
  b.dialogue="Ты добралась до моей арены. Покажи силу своей магии!";
  if(b.spareReward&&nameMap.has(b.spareReward))b.spareReward=nameMap.get(b.spareReward);
 })
}catch(_){}
try{
 if(Array.isArray(enemyNames)){
  enemyNames.splice(0,enemyNames.length,"Сахарная Тень","Розовый Гремлин","Конфетная Ведьмочка","Кекс-Призрак","Леденцовый Страж","Мармеладный Гоблин","Карамельный Маг","Зефирный Дух","Кристальная Фея","Шоколадная Тень","Вишнёвая Хранительница","Искристая Слизь")
 }
}catch(_){}
try{
 const wn=["Розовый Сад","Сахарная Пустошь","Сломанная Луна","Галактика Фей","Империя Кристаллов","Замороженное Королевство","Тёмный Цветочный Рифт","Небесный Дворец","Бездна Сладких Теней","Предел Магии","Космический Зефир","Финальная Звёздная Грань","Возвращение Феи"];
 worlds.forEach((w,i)=>{w.name=wn[i]||("Girlverse Мир "+(i+1));w.color=["#ff8bd8","#ff5da2","#d98cff","#ffb6e8","#c78cff","#9bdcff","#c59cff","#ffd1f2","#b86cff","#ff77bb","#f3a4ff","#ff4fa3","#ffd0e8"][i%13]})
}catch(_){}
const sweets={
raw_meat:["Сливочный рулет","🍥","Мягкий рулет. Восстанавливает HP, но оставляет сладкий яд."],
cooked_meat:["Торт с глазурью","🍰","Большой сладкий десерт. Восстанавливает HP, снижает голод и добавляет сладкую ярость."],
mushroom:["Кекс с начинкой","🧁","Волшебный кекс с исходным шансом полезного или опасного эффекта."],
honey:["Карамельный сироп","🍯","Сладкий сироп с постепенным восстановлением HP."],
pepper:["Кислая конфета","🍬","Ускоряет сердечко, сохраняя исходный риск потери HP."],
egg:["Шоколадное яйцо","🍫","Шоколадное яйцо со случайной наградой."],
bread:["Пончик","🍩","Сладкий пончик."],apple:["Розовый леденец","🍭","Сладость."],orange:["Мармеладная долька","🍊","Мармелад."],
banana:["Банановый маффин","🧁","Маффин."],cherry:["Вишнёвый макарон","🍒","Макарон."],lemon:["Лимонный мармелад","🍋","Кислый мармелад."],
grapes:["Виноградные желейки","🍇","Желейки."],watermelon:["Арбузные леденцы","🍉","Леденцы."],mango:["Манговый десерт","🥭","Десерт."],
pineapple:["Ананасовый торт","🍍","Торт."],coin:["Звёздная конфетка","🪙","Коллекционная конфетка."],bone:["Сахарная косточка","🍭","Сахарный трофей."]
};
try{Object.keys(sweets).forEach(id=>{if(ITEMS[id]){ITEMS[id].name=sweets[id][0];ITEMS[id].icon=sweets[id][1];ITEMS[id].desc=sweets[id][2]}})}catch(_){}

try{
 const oldPassive=window.getPassiveModifiers;
 if(typeof oldPassive==="function"&&!GV.passiveWrapped){
  window.getPassiveModifiers=function(){const m=oldPassive();if(typeof obesityPoints==="number"&&obesityPoints>=20){m.dmgMult*=3;m.gvRage=true}return m};
  GV.passiveWrapped=true
 }
 window.getObesityStageName=function(){if(typeof obesityPoints!=="number"||obesityPoints<20)return null;if(obesityPoints<40)return"Сладкая ярость I";if(obesityPoints<60)return"Сладкая ярость II";return"Сладкая ярость III"}
}catch(_){}
function markNewCard(c){if(!c)return c;const rev=new Map();nameMap.forEach((v,k)=>rev.set(v,k));if(!c.originalName&&!PROMO.has(c.name)&&rev.has(c.name))c.originalName=rev.get(c.name);return c}
function patchCardCreation(){
 try{
  if(typeof window.createCardFromTemplate==="function"&&!GV.cardTemplateWrapped){const old=window.createCardFromTemplate;window.createCardFromTemplate=function(tm,r){return markNewCard(old.apply(this,arguments))};GV.cardTemplateWrapped=true}
  if(typeof window.createCard==="function"&&!GV.cardWrapped){const old=window.createCard;window.createCard=function(){return markNewCard(old.apply(this,arguments))};GV.cardWrapped=true}
 }catch(_){}
}
function patchUpgrades(){try{if(typeof upgrades!=="undefined"&&upgrades.abilityPower){upgrades.abilityPower.reqLevel=5;upgrades.abilityPower.name="✨ Супер-шанс"}}catch(_){}}
try{
 if(typeof window.getMainCard==="function"&&!GV.mainCardWrapped){
  const old=window.getMainCard;
  window.getMainCard=function(){const c=old();if(!c||!c.originalName)return c;return new Proxy(c,{get:(t,p)=>p==="name"?t.originalName:t[p],set:(t,p,v)=>{t[p]=v;return true}})};
  GV.mainCardWrapped=true
 }
}catch(_){}
try{
 if(typeof window.checkEvolutionQuests==="function"&&!GV.evoWrapped){
  const old=window.checkEvolutionQuests;
  window.checkEvolutionQuests=function(){const a=typeof myCards!=="undefined"&&Array.isArray(myCards)?myCards:[],snap=a.map(c=>c&&c.name);a.forEach(c=>{if(c&&c.originalName)c.name=c.originalName});try{return old.apply(this,arguments)}finally{a.forEach((c,i)=>{if(c)c.name=snap[i]})}};
  GV.evoWrapped=true
 }
}catch(_){}
function addTheme(){
 if(document.getElementById("girlverseDeepTheme"))return;
 const st=document.createElement("style");st.id="girlverseDeepTheme";
 st.textContent=[
 "body{background:radial-gradient(circle at 10% 0%,rgba(255,139,216,.24),transparent 35%),radial-gradient(circle at 90% 10%,rgba(216,140,255,.18),transparent 30%),#100611!important;color:#fff4fc!important}",
 ".app,.card,.shop-item,.enemy-card,.book-item,.card-item,.pass-tier{border-color:rgba(255,139,216,.24)!important}",
 ".card,.shop-item,.enemy-card,.book-item,.card-item{background:linear-gradient(180deg,rgba(55,18,64,.95),rgba(25,8,31,.97))!important}",
 ".btn-primary,.click-area,.tab-btn.active,.sub-tab-btn.active{background:linear-gradient(135deg,#ff8bd8,#ff4fa3)!important;border-color:#ffb5e6!important;color:#260b2c!important}",
 ".card-title{border-left-color:#ff8bd8!important}.points,.upgrade-price,.shop-price,.mode-label{color:#ff9cdd!important}",
 ".level-bar,.exp-bar,.fatigue-progress{background:linear-gradient(90deg,#ff8bd8,#ff4fa3)!important}",
 "#arenaOverlay{background:radial-gradient(circle,#32113b,#08030a)!important}#arenaCanvas{border-color:#ff8bd8!important;box-shadow:0 0 30px rgba(255,139,216,.25)}"
 ].join("");
 document.head.appendChild(st)
}
function renameVisibleText(){
 const root=document.body;if(!root)return;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),a=[];while(w.nextNode())a.push(w.currentNode);
 a.forEach(n=>{let s=n.nodeValue;if(!s||!s.trim())return;
  s=s.replace(/Multiverse Staple/gi,"GIRLVERSE BATTLE").replace(/МУЛЬТИВЕРС ПАСС/gi,"GIRLVERSE PASS").replace(/Мультиверс/gi,"Girlverse").replace(/Перерождение/gi,"Трансформация").replace(/перерождение/gi,"трансформация").replace(/Ребиртх/gi,"Трансформация").replace(/ребиртх/gi,"трансформация").replace(/Ребёрн/gi,"Трансформация").replace(/Реберн/gi,"Трансформация").replace(/Ожирение/gi,"Сладкая ярость").replace(/ожирение/gi,"сладкая ярость");
  nameMap.forEach((v,k)=>{if(k&&k!==v)s=s.split(k).join(v)});bossMap.forEach((v,k)=>{if(k&&k!==v)s=s.split(k).join(v)});
  if(s!==n.nodeValue)n.nodeValue=s
 });
 const t=document.querySelector("title");if(t)t.textContent="GIRLVERSE BATTLE";
 const b=document.getElementById("doRebirthBtn");if(b)b.innerHTML="✨ Совершить трансформацию!"
}
function addFairyMarkers(){
 document.querySelectorAll(".card-item,.book-item").forEach(el=>{
  if(el.querySelector(".gv-fairy"))return;
  const x=document.createElement("span");x.className="gv-fairy";x.textContent="🧚‍♀️";x.style.cssText="position:absolute;right:7px;top:7px;font-size:18px;filter:drop-shadow(0 0 7px #ff8bd8);";
  if(getComputedStyle(el).position==="static")el.style.position="relative";el.appendChild(x)
 })
}
function addAutoBattle(){
 if(document.getElementById("girlverseAutoBattle"))return;
 const host=document.getElementById("fightSubTab"),click=document.getElementById("clickArea");if(!host||!click)return;
 const box=document.createElement("div");box.id="girlverseAutoBattle";box.style.cssText="margin:10px 0;padding:12px;border:1px solid rgba(255,139,216,.45);border-radius:14px;background:rgba(255,139,216,.08);text-align:center;";
 box.innerHTML='<div style="font-weight:900;color:#ff9cdd">⚡ АВТО-БОЙ GIRLVERSE</div><div id="gvAutoStatus" style="font-size:11px;color:#bbb;margin:5px 0">10 минут после наградной рекламы</div><button id="gvAutoBtn" class="btn btn-primary" style="width:100%;padding:11px">📺 Получить 10 минут авто-боя</button>';
 click.parentNode.insertBefore(box,click.nextSibling);
 document.getElementById("gvAutoBtn").onclick=function(){
  if(window.AndroidAPI&&typeof AndroidAPI.showRewardedAd==="function"){
   if(typeof AndroidAPI.isRewardedAdLoaded==="function"&&!AndroidAPI.isRewardedAdLoaded()){document.getElementById("gvAutoStatus").textContent="Реклама пока не готова.";return}
   AndroidAPI.showRewardedAd("girlverseReward")
  }else document.getElementById("gvAutoStatus").textContent="Наградная реклама доступна в Android-версии."
 }
}
let autoTimer=null,rewardHandledAt=0;
function startAuto(){
 const until=Date.now()+600000;localStorage.setItem("girlverse_auto_until",String(until));
 if(typeof afkTeam!=="undefined"&&typeof team!=="undefined"&&team.length&&!afkTeam.length){afkTeam=team.slice(0,6);if(typeof renderAfkTeam==="function")renderAfkTeam()}
 if(typeof startAfk==="function"&&typeof afkTeam!=="undefined"&&afkTeam.length)startAfk();
 const status=document.getElementById("gvAutoStatus");if(status)status.textContent="⚡ Авто-бой активен ещё 10:00";
 if(autoTimer)clearInterval(autoTimer);
 autoTimer=setInterval(function(){
  const left=Math.max(0,until-Date.now()),sec=Math.ceil(left/1000),el=document.getElementById("gvAutoStatus");
  if(el)el.textContent=left>0?"⚡ Авто-бой активен ещё "+Math.floor(sec/60)+":"+String(sec%60).padStart(2,"0"):"Авто-бой завершён";
  if(left<=0){clearInterval(autoTimer);autoTimer=null;if(typeof stopAfk==="function")stopAfk();localStorage.removeItem("girlverse_auto_until")}
 },1000)
}
window.girlverseReward=function(){if(Date.now()-rewardHandledAt<1000)return;rewardHandledAt=Date.now();startAuto()};
window.onGirlverseReward=window.girlverseReward;
window.addEventListener("rewardEarned",window.girlverseReward);
function boot(){addTheme();migrateCards();patchCardCreation();patchUpgrades();renameVisibleText();addAutoBattle();addFairyMarkers();try{if(typeof renderMyCards==="function")renderMyCards()}catch(_){}try{if(typeof renderInventory==="function")renderInventory()}catch(_){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
setInterval(function(){patchCardCreation();patchUpgrades();renameVisibleText();addAutoBattle();addFairyMarkers()},1200);
GV.nameMap=nameMap;GV.bossMap=bossMap;GV.promoCharacters=Array.from(PROMO);
})();