/*　あと欲しいもの
 *　フォントメモ
 *　htmlのhead内で読み込めばOKらしい。ctx.fontで指定。
 *　https://fonts.google.com/specimen/Kaisei+HarunoUmi
 *　https://fonts.google.com/specimen/Kosugi+Maru
 *　https://fonts.google.com/specimen/Zen+Kurenaido
 *　https://fonts.google.com/specimen/Sawarabi+Gothic?subset=japanese
 */

const textMax = 555;

//DOM読み込み
document.addEventListener("DOMContentLoaded", () =>{

    // キャンバスの設定
  const canvas = document.getElementById("cancanvas");
  const ctx    = canvas.getContext("2d");
  const img    = new Image();
  img.crossOrigin = "anonymous";

  const location = {  //テキストの描画位置
    nameX: 306,
    nameY: 65,
    costX: 53,
    costY: 71,
    skillX: 55,
    skillY: 605,
    textX: 57,
    textY: 630,
    categoryX: 55,
    categoryY: 552,
    statX: 475,
    statY: 764
  };

  let textColor = "#000000";
  let textColorLine = "#000000";
  let grad = ctx.createLinearGradient(50,0,150,0);
  let labelText = new Array;
  let affterText = "";
  let imageScale = 0.5;
  document.getElementById("scaleValue").innerHTML = imageScale;



  // 描画・更新
  const redraw = () => {
    ctx.clearRect(0, 0, canvas.width , canvas.height);

    ctx.drawImage(img, -position.moveX , -position.moveY , canvas.width / imageScale, canvas.height / imageScale, 0, 0, canvas.width, canvas.height);

    if(frameId.value != -1)
      ctx.drawImage(frame[frameId.value], 0 , 0 , 572 , 800 );

    // テキスト反映処理
    // もっと綺麗な処理ができそうというのは分かる（分かってない）

    // コスト
    ctx.font = "50px Kaisei HarunoUmi";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(inputCost.value , location.costX , location.costY);

    // ステータス
    ctx.font = "32px Kaisei Opti";
    ctx.fillText(inputShot.value , location.statX , location.statY);



    // 名前
    ctx.font = "32px Kaisei Opti";
    ctx.textAlign = "center";
    ctx.strokeStyle= textColorLine;
    ctx.lineWidth= 4;
    ctx.strokeText(inputName.value , location.nameX , location.nameY , 438);
    ctx.fillStyle= textColor;
    ctx.fillText(inputName.value , location.nameX , location.nameY , 438);

    // スキル名
    ctx.font = "24px Kaisei Opti";
    ctx.textAlign = "left";
    ctx.strokeStyle = grad;
    ctx.lineWidth= 6;
    ctx.strokeText(inputCode.value , location.skillX , location.skillY );
    ctx.fillStyle= "#FFbbbb";
    ctx.fillText(inputCode.value , location.skillX , location.skillY);

    // テキスト
    for(i=0; i<affterText.length; i++){   //改行処理
      ctx.font = "16px Noto Sans";
      ctx.textAlign = "left";

      ctx.strokeStyle= textColorLine;
      ctx.lineWidth= 3;
      ctx.strokeText(affterText[i], location.textX , location.textY + i*20);

      ctx.fillStyle= textColor;
      ctx.fillText(affterText[i], location.textX , location.textY + i*20);
    }

    // カテゴリ
    ctx.font = "20px Kaisei Opti";
    ctx.textAlign = "left";
    ctx.fillStyle = textColor;
    ctx.lineWidth= 4;
    ctx.strokeStyle = textColorLine
    if(labelText.value != undefined){
      ctx.strokeText(labelText.value , location.categoryX , location.categoryY);
      ctx.fillText(labelText.value , location.categoryX , location.categoryY);
      if(inputCtg.value != ""){
        console.log( ctx.measureText(labelText.value));
        ctx.strokeText("#"+inputCtg.value , location.categoryX + ctx.measureText(labelText.value).width +10 , location.categoryY);
        ctx.fillText("#"+inputCtg.value , location.categoryX + ctx.measureText(labelText.value).width +10 , location.categoryY);
      }
    }
  };




  // --- 入力処理
  // 名前
  let inputName = document.getElementById("inputName");
  inputName.addEventListener("input" , function(evt){
    redraw();
  })

  // コスト
  let inputCost = document.getElementById("inputCost");
  inputCost.addEventListener("input" , function(evt){
    redraw();
  })

  // 追加カテゴリ
  let inputCtg = document.getElementById("inputSubCtg");
  inputCtg.addEventListener("input" , function(evt){
    redraw();
  })

  // スキル名
  let inputCode = document.getElementById("inputCode");
  inputCode.addEventListener("input" , function(evt){
    console.log(inputCode.value.length);

    grad = ctx.createLinearGradient(50,0,inputCode.value.length*50,0);
    grad.addColorStop(0,"#dd3333");
    grad.addColorStop(1,"#ff6666");

    redraw();
  })

  // 効果
  let inputText = document.getElementById("inputText");
  inputText.addEventListener("input" , function(evt){
    affterText = textSplit(inputText.value);
    redraw();
  })

  // ステータス
  let inputShot = document.getElementById("inputShot");
  inputShot.addEventListener("input" , function(evt){
    redraw();
  })



  // 倍率
  let getScale = document.getElementById("imageScale");
  getScale.addEventListener("input" , function(evt){
    imageScale = getScale.value / 100;
    document.getElementById("scaleValue").innerHTML = getScale.value / 100;
    redraw();
  })

  // フレーム描画・変更
  const frameList = [
    "img/frame_1.png",
    "img/frame_2.png",
    "img/frame_3.png",
    "img/frame_4.png",
    "img/frame_5.png",
    "img/frame_6.png",
    "img/frame_7.png",
    "img/frame_8.png",
    "img/frame_9.png",
    "img/frame_10.png"
  ];

  const frame = new Array();
  for(let i = 0 ; i < frameList.length ; i++){
    frm = new Image();
    frm.src = frameList[i];
    frame.push(frm);
  }
  const frameId = document.getElementById("frame");

  frameId.addEventListener("change" , function(){
    console.log(frameId.value);

    if(frameId.value %2 == 0){
      textColor = "#000000";
      textColorLine = "#ffffff";
    }else{
      textColor = "#ffffff";
      textColorLine = "#000000";
    }

    redraw();
  });


  //画像の読み込み処理
  const selFile = document.getElementById("selectFile");
  selFile.addEventListener("change" , function(evt){
    const file   = evt.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);

    reader.onload = function(){
      const dataUrl = reader.result;
      img.src = dataUrl;
    }
  })
  img.onload = () => {
    console.log("読み込み成功");
    redraw();
  };
  img.onerror = () => {
    console.log("読み込み失敗");
  };


  // 移動処理
  let isDragging = false;
  let position = {
    startX: 0,
    startY: 0,
    moveX : 0,
    moveY : 0,
    endX  : 0,
    endY  : 0
  };
  canvas.addEventListener("mousedown" , event => {
    isDragging = true;
    position.startX = event.clientX;
    position.startY = event.clientY;
  });
  canvas.addEventListener("mousemove" , event => {
    if(isDragging){
      position.moveX = (event.clientX - position.startX) / imageScale + position.endX;
      position.moveY = (event.clientY - position.startY) / imageScale + position.endY;
      redraw();
    }
  });
  canvas.addEventListener("mouseup" , event =>{
    isDragging = false;
    position.endX = position.moveX;
    position.endY = position.moveY;
  });






  // ダウンロードボタン
  // どうやらサーバー上じゃなければ動作しないらしい。
  document.getElementById("download").onclick = (evt) => {
    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "image.png";
    link.click();
  }





  //リストボックス変更処理
  let mainList = document.getElementById("mainLabel");
  let subList  = document.getElementById("subLabel");

  // typeでフィルターを行う
  const addList = [
    { type:"K" , name:"#FAガール"},
    { type:"K" , name:"#メガミデバイス"},
    { type:"K" , name:"#創彩少女庭園"},
    { type:"K" , name:"#アルカナディア"},
    { type:"K" , name:"#ヘキサギア"},
    { type:"K" , name:"#メガロマリア"},
    { type:"B" , name:"#30MS"},
    { type:"B" , name:"#MS少女"},
    { type:"B" , name:"#Figure-rise Standard"},
    { type:"other" , name:"#チトセリウム"},
    { type:"other" , name:"#ダークアドヴェント"},
    { type:"other" , name:"#デスクトップアーミー"},
    { type:"other" , name:"#PLAMAX"},
    { type:"other" , name:"#MODEROID"},
    { type:"other" , name:"#VFガール"},
    { type:"other" , name:"#ガレージキット"},
    { type:"other" , name:"#フルスクラッチ"},
    { type:"other" , name:"#Unknown"}

  ];
  const listIndex = ["K","B","other"];  // html側と紐づけするための配列

  mainList.addEventListener("change" , function(){
    let filterResult = addList.filter(row => row.type === listIndex[mainList.selectedIndex-1]);
    subList.length = 0;

    for(let i=0 ; i<filterResult.length; i++){
      subList.options[i] = new Option(filterResult[i].name);
    }
  });

  subList.addEventListener("change" , function(){
    labelText.value = subList[subList.selectedIndex].value;
    subLabelSize = ctx.measureText(labelText.value).width + 10;
    console.log(labelText.value);
    redraw();
  });
});


// 改行コード挿入用
function textSplit(text){
  const canvas = document.getElementById("cancanvas");
  const ctx    = canvas.getContext("2d");
  let outText = "";
  let size = 0;

  for(let i=0; i<text.length; i++){
    let c = text.substr(i, 1);
    size += ctx.measureText(c).width;
    outText += c;
    if(size > textMax){
      outText += "\n";
      size = 0;
    }
  }
  outText = outText.split("\n");

  return outText;

}
