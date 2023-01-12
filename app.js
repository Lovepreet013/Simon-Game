var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"]
var level = 0;
var started = false;

$(document).keypress(function (e) { 
    if(!started){
        $("h1").text("level " + level);
        nextSequence();
        started = true;
    }   
});

$(".btn").on("click",function(){
    var userChosenColor = this.getAttribute("id");
    // console.log(userChosenColor);

    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    var len = userClickedPattern.length -1;
    checkAnswers(len);
})


function nextSequence(){
    level++;

    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    // console.log(randomChosenColor);

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}


function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");

    setTimeout(() => {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswers(currentLevel){
    // console.log(gamePattern[currentLevel])

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        // console.log("SUCCESS");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }else{
        // console.log("FAILURE");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 500);

        playSound("wrong");
        $("h1").text("Game Over, Press Any Key To Restart")

        startOver();
    }
    

}

function startOver(){
    level= 0;
    gamePattern = [];
    started = false;
    userClickedPattern = []
}