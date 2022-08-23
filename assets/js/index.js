// Selects element by class
var timeEl = document.querySelector("#Timer-Display");
var startScreen = document.querySelector("#Start-Screen");
var startButton = document.querySelector("#Start-Button");
var questionDiv = document.querySelector("#Question-Div");
var questionTitle = document.querySelector("#Question-Title");
var questionChoices = document.querySelector("#Question-Choices");
var endScreen = document.querySelector("#end-screen");
var secondsLeft = 60;
var questionIndex = 0;
var timerInterval;

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
    }

]
function startQuiz() {
  // Sets interval in variable
  timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
    }

  }, 1000);
  startScreen.setAttribute("class", "hide")
  questionDiv.removeAttribute("class")
    // Display questions function here
    showQuestions()
}
function showQuestions(){
    var displayQuestion = quizQuestions[questionIndex]
    questionTitle.textContent = displayQuestion.title
    questionChoices.innerHTML = ""
    displayQuestion.choices.forEach(function (choice){
        var newButton = document.createElement("button")
        newButton.setAttribute("value", choice)
        newButton.textContent = choice
        newButton.onclick = checkAnswer
        questionChoices.append(newButton)
    })
}
function checkAnswer() {
    if (this.value===quizQuestions[questionIndex].answer){
        console.log("Correct!")
    }else{
        secondsLeft = secondsLeft-10
        timeEl.textContent = secondsLeft
        console.log("Incorrect")
    }
    questionIndex++
    if(questionIndex===quizQuestions.length){
        console.log("Quiz is over!")
        endQuiz()
        //call quiz end function here
    }else{
        showQuestions()
    }

}
function endQuiz() {
    questionDiv.setAttribute("class", "hide")
    endScreen.removeAttribute("class")
}
startButton.onclick = startQuiz
