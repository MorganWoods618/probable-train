// Selects element by class
var timeEl = document.querySelector("#Timer-Display");
var startScreen = document.querySelector("#Start-Screen");
var startButton = document.querySelector("#Start-Button");
var retryButton = document.querySelector("#Retry-Button");
var saveButton = document.querySelector("#save-button");
var questionDiv = document.querySelector("#Question-Div");
var questionTitle = document.querySelector("#Question-Title");
var questionChoices = document.querySelector("#Question-Choices");
var endScreen = document.querySelector("#end-screen");
var answerReply = document.querySelector("#Answer-Reply");
var secondsLeft = 60;
var questionIndex = 0;
var timerInterval;

var yourScore = document.querySelector("#your-score");

var quizQuestions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Inside which HTML element do we put javascript?",
        choices: ["script", "scripting", "javascript", "js"],
        answer: "script"
    },
    {
        title: "JavaScript is a ___ -side programming language.",
        choices: ["client", "server", "both", "none"],
        answer: "both"
    },
    {
        title: "Which are the correct if statements to execute certain code if “x” is equal to 2?        ",
        choices: ["if(x 2)", "if(x = 2)", "if(x == 2)", "if(x != 2 )"],
        answer: "if(x == 2)"
    }
]
function startQuiz() {
    // Sets interval in variable
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left till time's up.";


    }, 1000);
    startScreen.setAttribute("class", "hide")
    questionDiv.removeAttribute("class")
    // Display questions function here
    showQuestions()
}
function showQuestions() {
    var displayQuestion = quizQuestions[questionIndex]
    questionTitle.textContent = displayQuestion.title
    questionChoices.innerHTML = ""
    displayQuestion.choices.forEach(function (choice) {
        var newButton = document.createElement("button")
        newButton.setAttribute("value", choice)
        newButton.textContent = choice
        newButton.onclick = checkAnswer
        questionChoices.append(newButton)
    })
}
function checkAnswer() {
    if (secondsLeft <=0){
        alert("Out of time!");
        endQuiz()
    }
    if (this.value === quizQuestions[questionIndex].answer) {
        answerReply.textContent = ("You got this!")
    } else {
        secondsLeft = secondsLeft - 10
        timeEl.textContent = secondsLeft
        answerReply.textContent = ("You can do better!")
    }
    questionIndex++
    if (questionIndex === quizQuestions.length) {
        endQuiz()
        //call quiz end function here
    } else {
        showQuestions()
    }

}
function endQuiz() {
    questionDiv.setAttribute("class", "hide")
    endScreen.removeAttribute("class")
    yourScore.removeAttribute("hide")
    if(secondsLeft >= 0) {
        yourScore.textContent = ("Your score ") + secondsLeft;
    }
    saveButton.onclick = saveScore()
    function saveScore() {
        localStorage.setItem(secondsLeft, "Score");
    }
}


//Save to local storage

function retryQuiz() {
    location.reload()
}

startButton.onclick = startQuiz
retryButton.onclick = retryQuiz
