"use strict";
let n = "";
let nBefore = "";

window.addEventListener("DOMContentLoaded", function() {
    $("header").textillate({
        loop: false, 
        minDisplayTime: 2000,   
        initialDelay: 2000,     
        autoStart: true,        
        in: {                   
            effect: "fadeInLeftBig",   
            delayScale: 1.5,            
            delay: 50,                  
            sync: false,                
            shuffle: true               
        }
    });

    // おみくじボタン(id="btn1") ボヤァと表示させる
    ScrollReveal().reveal("#btn1", { duration: 9000 });

    // ウェルカムメッセージの表示
    setTimeout(function() {
        let popMessage = "いらっしゃい！おみくじ引いてって！";
        window.alert(popMessage);
    }, 5000); // ここを修正、時間は文字列ではなく数値として渡す

}, false);

const btn1 = document.getElementById("btn1");
const omikujiTextImage = document.getElementById("omikujiTextImage");
let soundEndflag = "0"; // 変数の初期化

btn1.addEventListener("click", function() {
    // sound control
    if (soundEndflag === "1") {
        soundControl("end", "");
    }

    btn1.style.transition = "1s"; // fukada-add
    const resultText = [
        "img/daikichi.png",
        "img/chukichi.png",
        "img/syokichi.png",
        "img/suekichi.png",
        "img/daikyo.png"
    ];
    const resultMaxSpeed = [10, 10, 8, 5, 5];
    const resultMaxSize = [30, 30, 30, 40, 30];
    const resultImage = [
        "img/star.png",
        "img/sakura_hanabira.png",
        "img/water1.png",
        "img/redLeaves4.png",
        "img/snowflakes.png"
    ];
    const resultSound = [
        "sound/omikuji_sound1.mp3",
        "sound/omikuji_sound2.mp3",
        "sound/omikuji_sound3.mp3",
        "sound/omikuji_sound4.mp3",
        "sound/omikuji_sound5.mp3"
    ];

    //let n = Math.floor(Math.random() * resultText.length);
    while(n == nBefore){
        n = Math.floor(Math.random() * resultText.length);
    }
    omikujiTextImage.src = resultText[n];
    omikujiTextImage.classList.add("omikujiPaper");
    omikujiTextImage.addEventListener("animationend", function() {
        omikujiTextImage.classList.remove("omikujiPaper");
    }, false);

    // sound control
    w_sound = resultSound[n];
    soundControl("start", w_sound);
    soundEndflag = "1";

    // snowfall stop
    $(document).snowfall("clear");

    // jQueryのsnowfall
    $(document).snowfall({
        maxSpeed: resultMaxSpeed[n],   // 最大速度
        minSpeed: 1,                   // 最小速度
        maxSize: resultMaxSize[n],     // 最大サイズ
        minSize: 1,                    // 最小サイズ
        image: resultImage[n]
    });
}, false);

// sound control
let w_sound;
let music;

function soundControl(status, w_sound) {
    if (status === "start") {
        music = new Audio(w_sound);
        music.currentTime = 0;
        music.play();
    } else if (status === "end") {
        music.pause();
        music.currentTime = 0;
    }
}
