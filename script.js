// String decoder (Base64)
function decode(str) {
  return atob(str);
}

// The following variables below are all the sound variables and mute/unmute functions 
let backgroundMusic = new Audio();
let portalEnterSound = new Audio();
let portalExitSound = new Audio();

backgroundMusic.src = "sounds/bg-music.mp3";
portalEnterSound.src = "sounds/warp-entrance.mp3";
portalExitSound.src = "sounds/warp-exit.mp3";
let backgroundMusicStatus = 0;
let backgroundMusicInterval;

function playBackgroundMusic() {
    backgroundMusic.play();
    if (backgroundMusicStatus == 1) {
        backgroundMusic.volume = 0;
    } else {
        backgroundMusic.volume = 1;
    }
}

function muteBackgroundMusic() {
    const muteBtnImg = document.getElementById("mute-btn-img");
    if (backgroundMusicStatus == 0) {
        muteBtnImg.setAttribute("src", "assets/HEADER/mute.png");
        backgroundMusic.volume = 0;
        backgroundMusicStatus++;
    } else {
        muteBtnImg.setAttribute("src", "assets/HEADER/unmute.png");
        backgroundMusic.volume = 1;
        backgroundMusicStatus--;
    }
}

document.getElementById("mute-header-btn").addEventListener("click", muteBackgroundMusic);
//END HERE


// The following lines of codes are for the start animation (click to start)
document.addEventListener('click', () => {
    const portal = document.getElementById('portal');
    const burst = document.getElementById('portal-burst');

    void burst.offsetWidth;
    
    burst.classList.add('expand');
    portal.classList.add('show');

    setTimeout(() => {
        portalEnterSound.play();
        document.getElementById('start-title').style.opacity = '0';
        document.getElementById('start-header').style.opacity = '0';
        document.getElementById('bottom-ct').style.bottom = '-80px';
        document.getElementById('top-ct').style.top = '-80px';
    }, 0);

    setTimeout(() => {
        portal.classList.add('zoom');
    }, 600);

    setTimeout(() => {
        portalExitSound.play();
        document.getElementById('background-img').style.opacity = '0';
        document.getElementById('bottom-ct').style.bottom = '-480px';
        document.getElementById('top-ct').style.top = '-480px';
        portal.classList.add('shrink');
    }, 1900);

    setTimeout(() => {
        document.getElementById('background-img').style.opacity = '0';
    }, 2600);

    setTimeout(() => {
        hideStartScreen();
        changeDisplay();
        burst.classList.remove('expand');
        portal.classList.remove('show', 'zoom', 'shrink');
    }, 2600);
}, { once: true });
//END HERE


// The following lines of codes include all of the functions and variables needed for you to transition from the start screen to the game board
let startScreenTimer;

function hideStartScreen() {
    document.getElementById("start-screen").style.display = "none";
    playBackgroundMusic();
    backgroundMusicInterval = setInterval(playBackgroundMusic, 120000);
    clearInterval(startScreenTimer);
}
//END HERE


// The following lines of codes hides all the header and gameboard elements, and shows the end message
function endGame(){
    const portal = document.getElementById('portal2');
    
    portal.classList.add('show');

    document.getElementById("game-board").style.display = "none";
    document.getElementById("header").style.display = "none";
    clearInterval(backgroundMusicInterval);
    backgroundMusic.volume = 0;

    if (scoreCounter >= 7){
        document.getElementById("pass-end-screen").style.display = "flex";

        const scrambled = "QmFuYW5h";
        const secretCode = atob(scrambled);

        const secretMessage = document.getElementById("secret-message");
        if (secretMessage) {
            secretMessage.innerHTML = "SECRET MESSAGE: <b>" 
                + secretCode + "</b>.";
        }

    } else {
        document.getElementById("fail-end-screen").style.display = "flex";
    }
}

// FAIL SCREEN PORTAL RESET
document.addEventListener("DOMContentLoaded", () => {
    const resetPortal = document.getElementById("portal-reset");
    if (resetPortal) {
        resetPortal.addEventListener("click", () => {
            location.reload();
        });
    }
});
// END HERE


// QUESTION BANK
let questionBank = [
    [
        "MODULE 2",
        "This module showed you the different services Benilde has to offer!",
        decode("RkFURQ==")
    ],
    [
        "MODULE 3",
        "This module is about understanding the different learning modalities in Benilde.",
        decode("UklGVEdBVEU=")
    ],
    [
        "MODULE 4",
        "This module was design for you to learn about Benildean Websites!",
        decode("UEFTU0lPTkFURQ==")
    ],
    [
        "MODULE 5",
        "This module familiarizes you with the Benilde grading system!",
        decode("UVVBTlRVTQ==")
    ],
    [
        "MODULE 6",
        "This module goes through the standards of conduct expect from Benildean Students!",
        decode("T01OSUJVUw==")
    ],
    [
        "MODULE 7",
        "This module discusses the different student organizations in campus!",
        decode("UkVBTElUSUVT")
    ],
    [
        "INTERAKTIV",
        "what is the INTERAKTIV Site Password!?",
        decode("QUNST1NTRElNRU5TSU9OUw==")
    ]
];


// DOM ELEMENTS
const submitBtn = document.getElementById("submit-btn");
const inputBox = document.getElementById("input-box");
const promptText = document.getElementById("prompt-text");
const promptQuestion = document.getElementById("prompt-question");

// GAME STATE
let roundIndex = 0;
let scoreCounter = 0;


function startGame(){
    hideStartScreen();
    promptText.innerHTML = questionBank[roundIndex][0];
    promptQuestion.innerHTML = questionBank[roundIndex][1];
}

function checkAnswer(){
    var inputValue = inputBox.value;

    if (inputValue.toUpperCase() == questionBank[roundIndex][2]){
        roundIndex++;
        scoreCounter++;

        if (roundIndex >= questionBank.length) {
            endGame();
        } else {
            promptText.innerHTML = questionBank[roundIndex][0];
            promptQuestion.innerHTML = questionBank[roundIndex][1];
            inputBox.value = "";
        }
    } else {
        alert("PLEASE TRY AGAIN! Your answer is incorrect.");
    }
}


//BUTTONS AND EVENT LISTENERS
submitBtn.addEventListener("click", checkAnswer);

document.addEventListener('keypress', function (e){
    if (e.key === 'Enter') {
        checkAnswer();
    }
});