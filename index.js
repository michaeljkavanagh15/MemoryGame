var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOn = false;
var gameOver = true;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  $("h2").addClass("isDisplayed");
  $(".container").removeClass("isDisplayed");


  var randomNumber = Math.floor(Math.random() * 4);
  var chosenColor = buttonColors[randomNumber];
  gamePattern.push(chosenColor);

  var chosenButton = $("#" + chosenColor).first();
  playAudio(chosenColor);
  animatePress(chosenColor);
}

function playAudio(chosenColor) {
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}

function animatePress(chosenColor) {
  $("#" + chosenColor).addClass("pressed");
  setTimeout(function() {
    $("#" + chosenColor).removeClass("pressed");
  }, 100);
}

function startGame() {
  level = 0;
  gamePattern = [];
  gameOn = false;
  $(document).on("keydown", function(event) {
    if (!gameOn) {
      gameOn = true;
      nextSequence();
    }
  });

}

function checkAnswers(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    return true;
  } else {
    return false;
  }
}

$(".btn").on("click", function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playAudio(userChosenColor);
  animatePress(userChosenColor);

  if (event) {
    if (checkAnswers(userClickedPattern.length - 1)) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(nextSequence, 300);
      }
    } else {
      $("#level-title").text("Game Over. Press any key to restart");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 300);
      $("h2").removeClass("isDisplayed");
      $("h2").text("Achieved: Level " + level);
      $(".container").addClass("isDisplayed");

      gameOn = false;
      startGame();
    }
  }
});

startGame();
