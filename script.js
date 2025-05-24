const mario  = document.querySelector('.mario');
const pipe = document.querySelector('.pipe'); 
const scoreDisplay = document.getElementById('score');

let score = 0;
let scoreInterval;

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {

        mario.classList.remove('jump');

    }, 500);
}

const startScore = () => {
    scoreInterval = setInterval(() => {
        score++;
        scoreDisplay.textContent = `Pontuação: ${score}`;
    }, 100);
};

const loop = setInterval(() => {

    console.log('loop'); 

    const pipePosition =  pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');


    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
         
        mario.src = './img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
        clearInterval(scoreInterval);
        alert('Game Over! Pontuação final: ' + score);
        
        }
}, 10);
 
document.addEventListener('keydown',jump);  

window.onload = startScore;
