const gameBoard = document.getElementById('gameBoard');
const stepsCounter = document.getElementById('steps');
const timeCounter = document.getElementById('time');
const difficultyButton = document.getElementById('difficulty');
const restartButton = document.getElementById('restartButton');
const rulesButton = document.getElementById('rulesButton');
const rulesModal = document.getElementById('rulesModal');
const closeButton = document.getElementsByClassName('close')[0];

let boardSize = 5; // A 5x5 grid
let steps = 0;
let gameTime = 0;
let gameTimer;
let difficulty = 'Easy'; // Initial difficulty level
let gameStarted = false;

function initGame() {
    clearInterval(gameTimer);
    gameTime = 0;
    gameStarted = false;
    steps = 0;
    stepsCounter.innerText = steps;
    timeCounter.innerText = gameTime;
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    for (let i = 0; i < boardSize * boardSize; i++) {
        const light = document.createElement('div');
        light.classList.add('light');
        if (Math.random() < 0.5) {
            light.classList.add('on'); 
        }
        light.addEventListener('click', () => {
            if (!gameStarted) {
                startGame();
            }
            toggleLights(i);
        });
        gameBoard.appendChild(light);
    }
}

function startGame() {
    gameStarted = true;
    gameTimer = setInterval(() => {
        gameTime++;
        timeCounter.innerText = gameTime;
    }, 1000);
}

function toggleLights(index) {
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;
    const indicesToToggle = [
        index,
        index - 1, 
        index + 1, 
        index - boardSize, 
        index + boardSize 
    ];

    indicesToToggle.forEach((i) => {
        if (i >= 0 && i < boardSize * boardSize) {
            const rowOfI = Math.floor(i / boardSize);
            const colOfI = i % boardSize;
            if (Math.abs(row - rowOfI) <= 1 && Math.abs(col - colOfI) <= 1) {
                gameBoard.children[i].classList.toggle('on');
            }
        }
    });

    steps++;
    stepsCounter.innerText = steps;
    checkWin();
}

function checkWin() {
    const isWin = Array.from(gameBoard.children).every(light => !light.classList.contains('on'));
    if (isWin) {
        clearInterval(gameTimer);
        alert(`Congratulations, you've won! Time: ${gameTime} seconds, Steps: ${steps}`);
        initGame(); 
    }
}

function toggleDifficulty() {
    if (difficulty === 'Easy') {
        boardSize = 7; // Increase difficulty
        difficulty = 'Hard';
    } else {
        boardSize = 5; // Decrease difficulty
        difficulty = 'Easy';
    }
    difficultyButton.innerText = `Difficulty: ${difficulty}`;
    initGame();
}

function showRules() {
    rulesModal.style.display = 'block';
    rulesModal.style.color = 'black'; 
}

closeButton.onclick = function() {
    rulesModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == rulesModal) {
        rulesModal.style.display = 'none';
    }
}

restartButton.addEventListener('click', initGame);
difficultyButton.addEventListener('click', toggleDifficulty);
rulesButton.addEventListener('click', showRules);


initGame();
