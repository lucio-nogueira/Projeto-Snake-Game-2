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
        ctx.fillRect(segmnt.x * gridSize, gridSize)
    })
}