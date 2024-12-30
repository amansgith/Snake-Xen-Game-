let coord={x:0, y:0};
let speed=5;
let lastrepaint=0;
let snakebody=[
    {x:13,y:15}
];
let score=0;
const scoreboard=document.getElementById('score');
food = {x:6,y:5};

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastrepaint)/1000 < 1/speed){
        return;
    }
    lastrepaint=ctime;
    gameEngine();
}

function hit(snakeArr){
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x==snakeArr[0].x && snakeArr[i].y==snakeArr[0].y){
            return true;
        }

        if(snakeArr[0].x>=21 || snakeArr[0].x<=0 || snakeArr[0].y>=21 || snakeArr[0].y<=0){
            return true;
        }
    }
}

function gameEngine(){
    // part 1 is updating the snake array for its parts
    // check if the snake touches any wall or itself
    if(hit(snakebody)){
        alert("Game Over");
        coord={x:0,y:0};
        snakebody=[{x:13,y:15}];
        score=0;
        scoreboard.innerHTML=score;
    }

    // check if the snake has eaten the food
    if(snakebody[0].y===food.y && snakebody[0].x===food.x){
        score++;
        scoreboard.innerHTML=score;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscorebox.innerHTML=hiscoreval;
        }
        snakebody.unshift({x:snakebody[0].x + coord.x, y:snakebody[0].y + coord.y});
        let a=2;
        let b=21;
        // here the a+(b-a)*random helps us to get a random number between a and b
        food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
    }

    // move the snake
    for(let i=snakebody.length-2;i>=0;i--){
        snakebody[i+1]={...snakebody[i]};
    }

    snakebody[0].x+=coord.x;
    snakebody[0].y+=coord.y;
    // part 2 render the snake
    board.innerHTML="";
    snakebody.forEach((e,index)=>{
        // this will create the body of the snake
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        // during the first loop this will add the head class
        if(index==0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    })

    // render the food particle
    FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart=food.y;
    FoodElement.style.gridColumnStart=food.x;
    FoodElement.classList.add('food')
    board.appendChild(FoodElement);
}


window.requestAnimationFrame(main)

let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML=hiscoreval;
}


// handle swipe on mobile devices
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
});


function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            // Swipe right
            coord.x = 1;
            coord.y = 0;
            console.log("yayright");
        } else {
            // Swipe left
            coord.x = -1;
            coord.y = 0;
            console.log("yayleft");
        }
    } else {
        if (deltaY > 0) {
            // Swipe down
            coord.x = 0;
            coord.y = 1;
            console.log("yaydown");
        } else {
            // Swipe up
            coord.x = 0;
            coord.y = -1;
            console.log("yayup");
        }
    }
}

// handle keyboard input on desktop
window.addEventListener('keyup',(e)=>{
    coord={x:0,y:1};

    switch(e.key){
        case "ArrowUp":
            coord.x=0;
            coord.y=-1;
            console.log("yayup");
            break;
        
        case "ArrowDown":
            coord.x=0;
            coord.y=1;
            console.log("yaydown");
            break;
        
        case "ArrowLeft":
            coord.x=-1;
            coord.y=0;
            console.log("yayleft");
            break;

        case "ArrowRight":
            coord.x=1;
            coord.y=0;
            console.log("yayright");
            break;

        default:
            break;
    }
})