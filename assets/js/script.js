var questions = [
    {
        question: "Which of these is NOT one of the original 3 starting Pokémon?",
        choices: ["Charmander", "Piplup", "Bulbasuar", "Squirtle"],
        correct: "Piplup"
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



var startQuizButton = document.querySelector(".start-button");
var timer = document.querySelector("#timer");
var questionsEl = document.querySelector("#question-div");
var questionsUl = document.querySelector("question-ul");
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
var userChoice = [];
var ulCreate;

var score = 0;
var questionPointer = 0;

function countdown() {
    timeLeft = 10
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = `Time: ${timeLeft}`;
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
    questionsEl.innerHTML = '';
    userQuestion = document.createElement('h2');
    userQuestion.textContent = questions[questionPointer].question;
    questionsEl.appendChild(userQuestion);
    for (var i = 0; i < questions[questionPointer].choices.length; i++) {
        userChoices = document.createElement('button');
        userChoices.textContent = questions[questionPointer].choices[i];
        userChoices.setAttribute('value', questions[questionPointer].choices[i]);
        questionsEl.appendChild(userChoices);
        userChoices.addEventListener("click", answerQuestion);
        userChoices.addEventListener("click", renderQuestion);
    }
    // nextQuestion();    
} 


function startQuiz() {
    // welcomeEl = document.setAttribute()
    hideStart();
    countdown();
    renderQuestion();
}

function answerQuestion(event) {
    // console.log(userQuestion);
    // console.log(userChoices);
    // console.log(event.target.value)
    console.log(questions[questionPointer].correct);
    console.log(`event:${event.target.value}`);
    if (event.target.value === questions[questionPointer].correct) {
        console.log("Correct");
    } else { 
        console.log("Wrong");    
    }
    questionPointer++;
}
startQuizButton.addEventListener("click", startQuiz);
// questionsEl.addEventListener("click", answerQuestion);