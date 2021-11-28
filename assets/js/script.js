var questions = [
    {
        title: "Which of these is NOT one of the original 3 starting Pokémon?",
        choices: ["Charmander", "Piplup", "Bulbasuar", "Squirtle"],
        answer: "Piplup"
    },
    {
        title: "How many total Pokémon are there as of 2021?",
        choices: ["151", "1021", "557", "898"],
        answer: "898"
    },
    {
        title: "What is the region that the newest game: 'Pokémon Brilliant Diamond/Shining Pearl', take place?",
        choices: ["Sinnoh", "Galor", "Kanto", "Unova"],
        answer: "Sinnoh"
    },
    {
        title: "Which of these Pokémon types are SUPER effective against ALL THE OTHER types listed?",
        choices: ["dragon", "dark", "fairy", "fighting"],
        answer: "fairy"
    },
    {
        title: "Which of these Pokémon are Legendary/Mythical?",
        choices: ["Rayquaza", "Dragonite", "Charizard", "Tyranitar"],
        answer: "Rayquaza"
    },

];

var score = 0;
var questionIndex = 0;

var startQuizButton = document.querySelector(".start-button");
var timer = document.querySelector("#timer");

var timeLeft;
var timerInterval;


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

function startQuiz() {
    countdown();
}

startQuizButton.addEventListener("click", startQuiz);