const wordInput = document.querySelector("#word-input");
const correntWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const messageDisplay = document.querySelector("#message");

const GAME_TIME = 5; //변하지 않는 변수 선언을 할 때 대문자 _
const API_URL = "https://random-word-api.herokuapp.com/word?number=100";

let words = ["밥","찌개","탕","국","김밥","볶음밥"];
let score = 0;
let time = 0; 
let timeInterval;
let isPlaying = false;
let isReady = false;

init()

//async await 어떤 변수를 실행하고 완료가 되면 실행.(비동기 함수. callback,promise단점 보완)
async function init(){
    const res = await fetch(API_URL);
    const data = await res.json();
    words = data.filter(item=> item.length < 7 )
    isReady = true;

}
/*
function init()//초기화 세팅 시 많이 사용하는 변수 이름. 
{
    const res = fetch(API_URL).then(res => res.json()).then(data => words = data); //순차적으로 실행. promise 문법. 
} 
* */

time = GAME_TIME;

wordInput.addEventListener("input",e=>{
 
    const typedText = e.target.value;
    const correntText = correntWord.innerText;
    if(typedText.toUpperCase() === correntText.toUpperCase() && isReady) //대문자로 문자 변환
{
addScore();
setNewWord();

}
 
})

//게임종료 
function gameover(){
    isPlaying = false;
    clearInterval(timeInterval)
    timeInterval = null;
    messageDisplay.innerText = "게임이 종료되었습니다."
    score = 0;
}

//시간 카운트다운
function countDown(){
    time = time -1 ;
    timeDisplay.innerText = time; 
    if(time === 0 ){
       gameover(); 
    }

}

function setNewWord(){
time = GAME_TIME;
wordInput.value="";
messageDisplay.innerText = "게임중입니다."
const randomIndex = Math.floor( Math.random() * words.length);
correntWord.innerText = words[randomIndex];

if(!isPlaying){
    timeInterval = setInterval(countDown, 1000)
    isPlaying = true; 
}

}

function addScore(){
score = score+1; 
scoreDisplay.innerText = score;
}

/**
 * Math.ceil()무조건 올림
 * Math.round()무조건 반올림
 * Math.floor()무조건 내림
 */