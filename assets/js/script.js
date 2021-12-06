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
        choices: ["Dragon", "Dark", "Fairy", "Fighting"],
        correct: "Fairy"
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
// var visible;
// var state;

var userQuestion;
var userChoices;
// var userChoice = [];
// var ulCreate;

var score = 0;
var questionPointer = 0;
var win = false;
var lose = false;

function countdown() {
    timeLeft = 30;
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            timer.textContent = `Time: 0`;
            clearInterval(timerInterval);
            loseQuiz();
        } 
      }, 1000);
}

function hideStart() {
    hidden = document.getElementById("welcome");
    hidden.classList.add("hide");
}

function renderQuestion() {
    questionsEl.innerHTML = '';
    userQuestion = document.createElement('h2');
    userQuestion.textContent = questions[questionPointer].question;
    questionsEl.appendChild(userQuestion);
    questionsEl.classList.add('wrapper');
    for (var i = 0; i < questions[questionPointer].choices.length; i++) {
        userChoices = document.createElement('button');
        userChoices.classList.add('choice-buttons');
        userChoices.textContent = questions[questionPointer].choices[i];
        userChoices.setAttribute('value', questions[questionPointer].choices[i]);
        questionsEl.appendChild(userChoices);
        userChoices.addEventListener("click", answerQuestion);
        if (questionPointer === questions.length - 1){
            userChoices.addEventListener("click", winQuiz);
        } else { 
            userChoices.addEventListener("click", renderQuestion);
        }
    };  
}; 


function startQuiz() {
    hideStart();
    countdown();
    renderQuestion();
};

function answerQuestion(event) {
    console.log(questions[questionPointer].correct);
    console.log(`event:${event.target.value}`);
    if (event.target.value === questions[questionPointer].correct) {
        console.log("Correct");

    } else { 
        timeLeft = timeLeft - 10    
        console.log("Wrong");
    }
    questionPointer++;
};

function restartQuiz() {
    questionsEl.innerHTML = '';
    questionPointer = 0;
    hidden = document.getElementById("welcome");
    hidden.classList.remove("hide");
};

function buttonRestart() {
    var restartButton = document.createElement ('button');
    restartButton.textContent = "Restart";
    questionsEl.appendChild(restartButton);
    restartButton.addEventListener("click", restartQuiz);
};

function loseQuiz() {
    lose = true;
    questionsEl.innerHTML = '';
    console.log("Uh oh! You ran out of time... GAME OVER!");
    var gameOver = document.createElement ('h2');
    gameOver.textContent = "Game Over!";
    questionsEl.appendChild(gameOver);
    buttonRestart();
};

function winQuiz() {
    win = true;
    clearInterval(timerInterval);
    questionsEl.innerHTML = '';
    var winGame = document.createElement ('h2');
    winGame.textContent = "You Win!";
    questionsEl.appendChild(winGame);
    score = timeLeft;
    console.log(score);
};


// function endGame() {
//     if (win === true) {
//         questionsEl.innerHTML = '';
//         console.log("Congrats! You win!");
//     } else if (lose === true) {
//         lose = false;
//         questionsEl.innerHTML = '';
//         console.log("Uh oh! You ran out of time... GAME OVER!");
//         var restart = document.createElement ('h2')
//         restart.textContent = "Game Over!"
//         var restartButton = document.createElement ('button');
//         restartButton.textContent = "Restart";
//         questionsEl.appendChild(restart);
//         questionsEl.appendChild(restartButton);
//         restartButton.addEventListener("click", restartGame);
//     };
    
// }

startQuizButton.addEventListener("click", startQuiz);
// questionsEl.addEventListener("click", answerQuestion);

// TODO:
// Fix end of game so last button loses game if it makes time go under 0