const bird=document.getElementById('bird');
const scoreDisplay=document.getElementById('score');
const gameOverScreen=document.getElementById('game-over');
const retryButton=document.getElementById('retry-button');
const instructions=document.getElementById('instructions');
const startButton=document.getElementById('start-button');


const flapsound=document.getElementById('flap-sound');
const hitsound=document.getElementById('hit-sound');
const pointsound=document.getElementById('point-sound');
const swooshsound=document.getElementById('swoosh-sound');

let birdTop=250;
let birdLeft=50;
let gravity = 5;
let gameSpeed = 10;
let isGameOver=false;
let score=0;
let pipePassed=false;


const pipes=document.querySelectorAll('.pipe');

// initialise the game

function initializeGame(){
    instructions.style.display="none";
    swooshsound.play();
    birdTop=250;
    score=0;
    scoreDisplay.innerText=`Score: ${score}`;
    isGameOver=false;
    
    bird.style.border = "2px solid red";

    pipes.forEach(pipe => {
            pipe.style.left = (parseInt(pipe.style.left)+1600)+"px";
        });
        gameLoop();
}
// make bird jump
function jump(){
    if(!isGameOver){
        birdTop-=50;
        
    }
    flapsound.play();
}

//reset game
function resetGame(){
    gameOverScreen.style.display="none";
    initializeGame();
}




function gameOver(){
    isGameOver=true;
    gameOverScreen.style.display="block";
    hitsound.play();
    //alert("Game Over! click OK to restart.")
    //initializeGame();
    //resetPipes();
}


//game loop
function gameLoop(){
    
   if(isGameOver)
   {
    return;
   }

   birdTop+=gravity;
   bird.style.top = birdTop+"px";  
   if (birdTop<=0|| birdTop>=550)
    {
        gameOver();
    }

    pipes.forEach(pipe =>
        {
            let pipeLeft=parseInt(pipe.style.left);
            if(pipeLeft>-60){
                pipe.style.left = (pipeLeft-gameSpeed) + "px";
                //detecting the collision
            if(birdLeft+10 > pipeLeft && 
                birdLeft < pipeLeft + 150 && 
                birdTop + 70 > parseInt(pipe.style.top) &&
                birdTop+42 < parseInt(pipe.style.top)+parseInt(pipe.style.height)
                ){
                hitsound.play();
                gameOver();
            }
            
            // bird keeps moving
            if(!pipePassed&&pipeLeft+150<birdLeft)
            {
                score++;
                pointsound.play();
                scoreDisplay.innerText=`Score: ${score}`;
                pipe.pipePassed=true;
            }
            }
            else{
                pipe.style.left="800px";
                pipe.pipePassed=false;
            }
            pipe.style.border = "2px solid blue";
        }
        );
        requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", jump);
retryButton.addEventListener("click", resetGame);
startButton.addEventListener("click", initializeGame);