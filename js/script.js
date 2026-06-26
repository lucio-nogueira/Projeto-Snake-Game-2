const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

const gridSize = 20;
let snake = [];
let food = {};
let dx = 1;
let dy = 0;
let score = 0;
let gameInterval;
let isGameOver = false;

    //Gerar comida
function generateFood() {
    food = {
        x: Math.floor (Math.random() * (canvas.width / gridSize)),
        y: Math.floor (Math.random() * (canvas.heigth / gridSize)),
    }
}

    //Desenha a cobrinha e a comida
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.heigth);

    ctx.fillStyle = 'red';
    ctx.fillRect (food.x * gridSize, gridSize, gridSize);

    ctx.fillStyle = 'lime';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize)
        });
}

        //Atualiza a posição 
function update() {
    if (isGameOver) { 
        return
}

    const head = { x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y){
        score++;
        scoreElement.textContent = `Pontos : ${score}`;
        generateFood();
    }
    else {
        snake.pop();
    }

    if (checkCollision()) {
        endGame();
        return;
    }
}

function checkCollision(){
    const head = snake[0];

    const hitWall = head.x < 0 || head.x >= canvas.width / gridSize || head.y >= canvas.heigth / gridSize;

    const hitSelf = snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)

    return hitWall || hitSelf
}

    //Verifica se a cobrinha colidiu com a parede ou com ela mesma
function checkCollision() {
    const head = snake[0];

    const hitWall = head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize;

    const hitSelf = snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);

    return hitWall || hitSelf;

}


    //Função para terminar o jogo
function endGame (){
    isGameOver = true;
    clearInterval (gameInterval);
    alert(`GAME OVER! Sua pontuação: ${score}`)
}

    //Loop principal do jogo
function gameLoop(){
    update();
    draw();
}


    //Função para iniciar/reiniciar o jogo
function startGame (){
    snake = [{x: 10, y: 10}];
    dx = 1; 
    dy = 0;
    score = 0;
    isGameOver = false;
    scoreElement.textContent = 'Pontos: 0'

    // Limpa qualquer intervalo anterior e inicia um novo
    if(gameInterval) {
        clearInterval(gameInterval);
    }

    generateFood()
    gameInterval = setInterval(gameLoop, 100)
}

        //Teclas : Movimentação
document.addEventListener('keydown', e => {
    switch (e.key){
        case 'Arrowup' :
            if(dy === 0) {dx = 0; dy = -1}
            break;
        case 'ArrowDonw' :
            if(dy === 0) {dx = 0; dy = 1; }
            break;
        case 'ArrowLeft' :
            if(dy === 0) {dx = -1; dy = 0}
            break;
        case 'ArrowRigth' :
            if(dy === 0) {dx = 1; dy = 0 }
            break;
    }
})

        //Recomeçar o Jogo
restartButton.addEventListener('click', startGame);

// Inicia o jogo pela primeira vez
startGame() 