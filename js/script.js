let canvas = document.querySelector("#snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function setBG()
{
    context.fillStyle = "#FF0000";
    context.fillRect(0,0, 16 * box, 16 * box );
}

function createSnake()
{
    for(i = 0; i < snake.length ; i++)
    {
        context.fillStyle =  "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood()
{
    context.fillStyle = "blue"
    context.fillRect(food.x,food.y,box,box);
}

document.addEventListener('keydown', movePlayer);

function movePlayer(command)
{
    let acceptedmove = {
        ArrowUp(){
            if(direction != "down"){
                direction = "up"
            }
        },
        ArrowDown(){
            if(direction != "up"){
                direction = "down"
            }
        },
        ArrowRight(){
            if(direction != "left"){
                direction = "right"
            }
        },
        ArrowLeft()
        {
            if(direction != "right"){
                direction = "left"
            }
        }
    }
    const keyPressed = command.key
    const moveFunction = acceptedmove[keyPressed]
    if(moveFunction){
        moveFunction()
    }
    
}

function worldLimit()
{
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
}

function gameOver()
{
    for(i = 1; i < snake.length; i++)
    {
         if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
         {
            clearInterval(jogo);
            alert("Se fudeu !")
         }
    }
}

function startGame()
{
    worldLimit();
    gameOver();

    setBG();
    createSnake();
    drawFood();
    
    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y)
    {
        snake.pop();
    }else
    {
     food.x = Math.floor(Math.random() * 15 + 1) * box;
     food.y = Math.floor(Math.random() * 15 + 1) * box;
  
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(startGame,100);
