let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let boardBound = board.getBoundingClientRect();
let x=true;
let y=true;
let leftPlayerlives = 3;
let rightPlayerlives = 3;
    
document.addEventListener("keydown", function(e){
    if(e.key == 'w'){
        movePaddle(leftPaddle,-window.innerHeight*0.05)
    }
    else if(e.key == 's'){
        movePaddle(leftPaddle,window.innerHeight*0.05)
    }
    else if(e.key == 'ArrowUp'){
        movePaddle(rightPaddle,-window.innerHeight*0.05)
    }
    else if(e.key == 'ArrowDown'){
        movePaddle(rightPaddle,window.innerHeight*0.05)
    }
})

function setColor(index){
    let allIcons = document.querySelectorAll(".fa.fa-heart");
    allIcons[index].style.color = "#666699";
}

function movePaddle(cPaddle, change){
    let cPaddleBound = cPaddle.getBoundingClientRect();
    if(cPaddleBound.top+change >= boardBound.top && cPaddleBound.bottom+change <= boardBound.bottom){
        cPaddle.style.top = cPaddleBound.top + change + "px";
    }
}

function moveball(){
    let ballcord = ball.getBoundingClientRect();
    let ballTop = ballcord.top;
    let ballLeft = ballcord.left;
    let ballRight = ballcord.right;
    let ballBottom = ballcord.bottom;

    let hasTouchedLeft = ballLeft < boardBound.left;
    let hasTouchedRight = ballRight > boardBound.right;
    if(hasTouchedLeft || hasTouchedRight){
        if(hasTouchedLeft){
            leftPlayerlives--;
            setColor(leftPlayerlives);
            if(leftPlayerlives == 0){
                alert("Game Over. Player 🅱 won.");
                document.location.reload();
            }else{
                return resetGame();
            }
        }else{
            rightPlayerlives--;
            setColor(3+rightPlayerlives);
            if(rightPlayerlives == 0){
                alert("Game Over. Player 🅰 won.");
                document.location.reload();
            }else{
                return resetGame();
            }
        }
    }

    function resetGame(){
        ball.style.top = window.innerHeight * 0.45 + "px"; 
        ball.style.left = window.innerWidth * 0.45 + "px"; 
        var counter = 6;
        console.log("Your game is about to start in ");
        let Countdown = setInterval(function(){
        console.log(counter-1);
        counter--;
        if(counter === 0) {
            clearInterval(Countdown);
            requestAnimationFrame(moveball);
        }
    }, 1000);     
    }

    if(ballTop <= boardBound.top || ballBottom >= boardBound.bottom){
        y = !y;
    }
    let leftPaddleBound = leftPaddle.getBoundingClientRect(); 
    let rightPaddleBound = rightPaddle.getBoundingClientRect(); 
    if(ballLeft <= leftPaddleBound.right && ballRight >= leftPaddleBound.left
        && ballTop+20 >= leftPaddleBound.top && ballBottom-20 <= leftPaddleBound.bottom){
        x = !x;
    }
    if(ballLeft <= rightPaddleBound.right && ballRight >= rightPaddleBound.left
        && ballTop+20 >= rightPaddleBound.top && ballBottom-20 <= rightPaddleBound.bottom){
        x = !x;
    }

    ball.style.top = y==true? ballTop + 8 + "px": ballTop - 8 + "px";
    ball.style.left = x==true? ballLeft + 8 + "px": ballLeft - 8 + "px";
    requestAnimationFrame(moveball);
}
requestAnimationFrame(moveball);