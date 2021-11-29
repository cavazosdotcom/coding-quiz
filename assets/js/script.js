var questions = [
    {
        question: "Which of these is NOT one of the original 3 starting Pokémon?",
        choices: ["Charmander", "Piplup", "Bulbasuar", "Squirtle"],
        answer: "Piplup"
    },
    {
        question: "How many total Pokémon are there as of 2021?",
        choices: ["151", "1021", "557", "898"],
        correct: "898"
    },
    {
        question: "What is the region that the newest game: 'Pokémon Brilliant Diamond/Shining Pearl', take place?",
        choices: ["Sinnoh", "Galor", "Kanto", "Unova"],
        correct: "Sinnoh"
    },
    {
        question: "Which of these Pokémon types are SUPER effective against ALL THE OTHER types listed?",
        choices: ["dragon", "dark", "fairy", "fighting"],
        correct: "fairy"
    },
    {
        question: "Which of these Pokémon are Legendary/Mythical?",
        choices: ["Rayquaza", "Dragonite", "Charizard", "Tyranitar"],
        correct: "Rayquaza"
    },

];

var score = 0;
var questionPointer = 0;


var startQuizButton = document.querySelector(".start-button");
var timer = document.querySelector("#timer");
var questionsEl = document.querySelector("#questions");
var welcomeEl = document.querySelector("#welcome");


var timeLeft;
var timerInterval;
var buttonEl;
var answer;
var hidden;
var visible;
var state;

var userQuestion;
var userChoices;

function countdown() {
    timeLeft = 10
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = "Time: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
        }
      }, 1000);
}

function hideStart() {
    var element = document.getElementById("welcome");
    element.classList.add("hide");
}

function renderQuestion() {
    questionsEl = document.createElement("button");
    questionsEl.textContent = JSON.stringify(questions[questionPointer]);
    console.log(questionsEl);
    document.body.appendChild(questionsEl);
}

function startQuiz() {
    // welcomeEl = document.setAttribute()
    hideStart();
    countdown();
    renderQuestion();
}

function nextQuestion() {
    questionPointer++;
}

function answerQuestion(event) {
    buttonEl = event.target;
    answer = buttonEl.dataset.answer;
    console.log(answer);

    var currentQuestion = questions[questionPointer];
        if (answer === currentQuestion.correct){

        }
        nextQuestion();
}

startQuizButton.addEventListener("click", startQuiz);
questionsEl.addEventListener("click", answerQuestion );