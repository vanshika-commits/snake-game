
const ROWS = 18;
const COLS = 18;
const board = document.querySelector(".board");
const cells = [];
let snake = [0];       
let direction = 1;     
let foodIndex;


for (let i = 0; i < ROWS * COLS; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    board.appendChild(div);
    cells.push(div);
}


function drawSnake() {
    
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("head");
    }
   
    for (let i = 0; i < snake.length; i++) {
        cells[snake[i]].classList.add("head");
    }
}


function generateFood() {
    while (true) {
        const randomIndex = Math.floor(Math.random() * ROWS * COLS);
        if (!snake.includes(randomIndex)) {
            foodIndex = randomIndex;
            break;
        }
    }
    
    cells.forEach(cell => cell.classList.remove("food"));
    
    cells[foodIndex].classList.add("food");
}


generateFood();


document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (key === "ArrowUp" && direction !== COLS) direction = -COLS;
    else if (key === "ArrowDown" && direction !== -COLS) direction = COLS;
    else if (key === "ArrowLeft" && direction !== 1) direction = -1;
    else if (key === "ArrowRight" && direction !== -1) direction = 1;
});


function moveSnake() {
    const currentHead = snake[snake.length - 1];
    const newHead = currentHead + direction;

    const hitWall = (
        newHead < 0 ||
        newHead >= ROWS * COLS ||
        (direction === 1 && newHead % COLS === 0) || 
        (direction === -1 && newHead % COLS === COLS - 1) 
    );

    const hitSelf = snake.includes(newHead);

    if (hitWall || hitSelf) {
        const score =snake.length;
        alert("Game Over!"+"your maximum score was"+" " +score );
        clearInterval(gameInterval);
        return;
    }

    
    if (newHead === foodIndex) {
        snake.push(newHead);   
        generateFood();        
    } else {
        snake.push(newHead);    
        snake.shift();        
    }

    drawSnake();
}


const gameInterval = setInterval(moveSnake, 200);





