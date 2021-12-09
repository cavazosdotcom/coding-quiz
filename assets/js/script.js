// TODO: Fix so highscore page can go back after clearing the local storage
// Add single user score to show underneath highscores
// Fix submit score button so it only happens once, so user can't submit same score infinite times
// Add text showing user their score at end, and after score submit thank them
// Clear time interval when endQuiz is called
// Have restart button refresh page instead of just hiding and reshowing, OR reset timeInterval when restarted
// Put submit and restart buttons underneath the initials input box


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
// var highscoreList = document.querySelector("#highscore-list");


var timeLeft;
var timerInterval;
var buttonEl;
var answer;
var hidden;
var highscores = [];
var liEl;
// var visible;
// var state;

var userQuestion;
var userChoices;
var allScores;
// var userChoice = [];
// var ulCreate;

var score = 0;
var questionPointer = 0;
var win;
var lose;

function countdown() {
    timeLeft = 100;
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            timer.textContent = `Time: 0`;
            clearInterval(timerInterval);
            endQuiz();
        }; 
      }, 1000);
}

function hideStart() {
    hidden = document.getElementById("welcome");
    hidden.classList.add("hide");
};

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
            userChoices.addEventListener("click", endQuiz);
        } else { 
            userChoices.addEventListener("click", renderQuestion);
        };  
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
    // restartButton.classList.add("restart-button");
    restartButton.textContent = "Restart";
    questionsEl.appendChild(restartButton);
    restartButton.addEventListener("click", restartQuiz);
};


// TODO: On endquiz, clear the time interval
function endQuiz() {
    checkWin();
    questionsEl.innerHTML = '';
    if (lose === true) {
        lose = false;
        console.log("Uh oh! You ran out of time... GAME OVER!");
        var gameOver = document.createElement ('h2');
        gameOver.textContent = "Game Over!";
        questionsEl.appendChild(gameOver);
        buttonRestart();
    } else if (win === true) {
        win = false;
        clearInterval(timerInterval);
        var winGame = document.createElement ('h2');
        winGame.textContent = "You Win!";
        questionsEl.appendChild(winGame);
        // score = timeLeft;
        // console.log(score);
        userInput();
        buttonRestart();
        // setWin();
    }
}

function checkWin(){
    if (timeLeft > 0) {
        win = true;
    } else {
        lose = true;
    };
};

// TODO: add text showing user their score at end, and after score submit thank them

// TODO: make it so submit oinly happens once for score
highscores = JSON.parse(localStorage.getItem('highscores')) || [];

function userInput(){


    label = document.createElement('label');
    initialsInput = document.createElement('input');
    
    // label.classList.add("block");
    // initialsInput.classList.add("block");

    label.textContent = `Initials: `;
    
    questionsEl.appendChild(label);
    questionsEl.appendChild(initialsInput);

    submitButton = document.createElement('button');
    // submitButton.setAttribute('id', "disable-button")
    submitButton.textContent = "Submit";
    questionsEl.appendChild(submitButton);
    
    submitButton.addEventListener("click", function() {
        
        var userInitials = initialsInput.value;

        
        if (userInitials.length !== 2) {
            console.log('No value entered');
            alert("Please input 2 initials");
            return;
        } else {
            userScore = {
                initials: userInitials,
                score: timeLeft
            }
        }

        highscores.push(userScore);

        localStorage.setItem("highscores", JSON.stringify(highscores));

        console.log(highscores);
         
    
    })
            
};


function setWin(){
    localStorage.setItem("storedScore", timeLeft);
};

startQuizButton.addEventListener("click", startQuiz);