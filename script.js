const mario  = document.querySelector('.mario');
const pipe = document.querySelector('.pipe'); 
const scoreDisplay = document.getElementById('score');

let score = 0;
let scoreInterval;
let isGameOver = false;
let pipeSpeed = 1.5;

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

function gameOver(pipePosition, marioPosition) {
    isGameOver = true;

    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './img/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    clearInterval(scoreInterval);

    document.getElementById('finalScore').textContent = `Pontuação: ${score}`;

    document.getElementById('gameOverModal').style.display = 'flex';

    setTimeout(restartGame, 2000);      
}

function restartGame() {
    
    score = 0;
    scoreDisplay.textContent = 'Pontuação: 0';
    
    mario.src = './img/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0';
    mario.style.bottom = '0';

    pipe.style.animation = `pipe-animation ${pipeSpeed}s infinite linear`;

    
    document.getElementById('gameOverModal').style.display = 'none';

    startScore();
    startSpeedIncrease();
    startCollisionCheck();
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80 && !isGameOver) {
        gameOver(pipePosition, marioPosition);
    }
}, 10);

document.addEventListener('keydown', jump);

window.onload = startScore;
