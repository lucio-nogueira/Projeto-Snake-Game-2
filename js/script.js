const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

const gridSize = 20;
let snake = [];
let food = {};
let dx = 1, dy = 0;
let score = 0;
let gameInterval;
let isGameOver = false;

function generateFood() {
    food = {
        x: Math.floor (Math.random() * (canvas.width / gridSize)),
        y: Math.floor (Math.random() * (canvas.heigth / gridSize)),
    }
}

function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.heigth)

    //Desenhr Comida
    ctx.fillStyle = 'red'
    ctx.fillRect (food.x * gridSize, gridSize, gridSize)

    //Desenhar Cobra
    ctx.fillStyle = 'lime';
    snake.forEach(segmnt => {
        ctx.fillRect(segmnt.x * gridSize, SVGElement.y * gridSize, gridSize)
    });
}

function update() {
    if (isGameOver) return

    const head = { x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y){
        score++;
        scoreElement.textContent = 'Pontos : ${score}';
        generateFood()
    }
    else {
        snake.pop();
    }

    if(checkCollision){
        endGame();
    }
}

function checkCollision(){
    const head = snake[0];

    const hitWall = head.x < 0 || head.x >= canvas.width / gridSize || head.y >= canvas.heigth / gridSize;

    const hitSelf = snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)

    return hitWall || hitSelf
}

function endGame (){
    isGameOver = true;
    clearInterval (gameInterval);
    alert('GAME OVER! Sua pontuação: ${score}')
}

function gameLoop(){
    update();
    draw();
}

function startGame (){
    
}