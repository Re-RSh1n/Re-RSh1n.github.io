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

  let imageScale = 0.5;
  document.getElementById("scaleValue").innerHTML = imageScale;

  const location = {  //テキストの描画位置
    nameX: 298,
    nameY: 62,
    costX: 47,
    costY: 71,
    skillX: 55,
    skillY: 610,
    textX: 57,
    textY: 630,
    categoryX: 55,
    categoryY: 538,
    shotX: 468,
    shotY: 770,
    infightX: 500,
    infightY: 720
  };

  let labelText = new Array;
  let affterText = ""

  // 描画・更新
  const redraw = () => {
    ctx.clearRect(0, 0, canvas.width , canvas.height);
    //ctx.drawImage(img , position.moveX , position.moveY);

    ctx.drawImage(img, -position.moveX , -position.moveY , canvas.width / imageScale, canvas.height / imageScale, 0, 0, canvas.width, canvas.height);

    if(frameId.value != -1)
      ctx.drawImage(frame[frameId.value], 0 , 0 , 572 , 800 );

    // 名前
    ctx.font = "32px Kaisei Opti";
    ctx.fillStyle= "#000000";
    ctx.textAlign = "center";
    ctx.fillText(inputName.value , location.nameX , location.nameY , 390);

    // コスト
    ctx.font = "54px Kaisei HarunoUmi";
    ctx.fillStyle= "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(inputCost.value , location.costX , location.costY);
    ctx.textAlign = "left";
    //ctx.strokeStyle= "#ffff00";
    //ctx.strokeText(inputCost.value , location.costX , location.costY);

    // スキル名
    ctx.font = "24px Kaisei Opti";
    ctx.textAlign = "left";
    ctx.fillStyle= "#ff2244";
    ctx.fillText(inputCode.value , location.skillX , location.skillY);

    // ステータス
    ctx.font = "32px Kaisei Opti";
    ctx.textAlign = "center";
    ctx.fillStyle= "#ffffff";
    ctx.fillText(inputShot.value , location.shotX , location.shotY);

    // テキスト
    for(i=0; i<affterText.length; i++){   //改行処理
      ctx.font = "16px Kaisei Opti";
      ctx.textAlign = "left";
      ctx.fillStyle= "#000000";
      ctx.fillText(affterText[i], location.textX , location.textY + i*20);
    }

    // カテゴリ
    ctx.font = "20px Kaisei Opti";
    ctx.font.bold();
    ctx.textAlign = "left";
    ctx.fillStyle= "#000000";
    if(labelText.value != undefined)
      ctx.fillText(labelText.value , location.categoryX , location.categoryY);

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

  // スキル名
  let inputCode = document.getElementById("inputCode");
  inputCode.addEventListener("input" , function(evt){
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
    "frame_X.png",
    "frame_Y.png"
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



  //リストボックスのみなさん

  const choises = [
    { value: 0 , name: "ぱたーんA"},
    { value: 1 , name: "ぱたーんB"},
    { value: 2 , name: "ぱたーんC"},
  ]
  const choisesSub1 = [
    { value: 0 , name: "#FAガール"},
    { value: 1 , name: "#メガミデバイス"},
    { value: 2 , name: "#創彩少女庭園"},
    { value: 3 , name: "#アルカナディア"},
    { value: 4 , name: "#ヘキサギア"},

  ]
  const choisesSub2 = [
    { value: 0 , name: "#30MS"},
    { value: 1 , name: "#MS少女"},
    { value: 2 , name: "#Figure-rise Standard"},

  ]
  const choisesSub3 = [
    { value: 0 , name: "#チトセリウム"},
    { value: 1 , name: "#ダークアドヴェント"},
    { value: 2 , name: "#ギルティプリンセス"},
    { value: 3 , name: "#デスクトップアーミー"},

    { value: 91 , name: "#ガレージキット"},
    { value: 99 , name: "#Unknown"},

  ]

  //リストボックス変更処理
  let mainList = document.getElementById("mainLabel");
  let subList  = document.getElementById("subLabel");

  mainList.addEventListener("change" , function(){
    subList.options.length = 0;

    //ここの処理の仕方やだ
    if(mainList.options[mainList.selectedIndex].value ==0){
      for(let i = 0; i < choisesSub1.length; i++){
        subList.options[i] = new Option(choisesSub1[i].name);
      }
    }else if(mainList.options[mainList.selectedIndex].value ==1){
      for(let i = 0; i < choisesSub2.length; i++){
        subList.options[i] = new Option(choisesSub2[i].name);
      }
    }else if(mainList.options[mainList.selectedIndex].value ==2){
      for(let i = 0; i < choisesSub3.length; i++){
        subList.options[i] = new Option(choisesSub3[i].name);
      }
    }else{
        subList.options[0] = null;
        labelText.value = null;
        redraw();
    }
  });

  subList.addEventListener("change" , function(){
    labelText.value = subList[subList.selectedIndex].value;
    console.log(labelText.value);
    redraw();
  })
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
      outText += "n";
      size = 0;
    }
  }
  outText = outText.split("n");

  return outText;

}
