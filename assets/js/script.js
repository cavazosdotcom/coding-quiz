// Created the questions array full of objects, each object containing the question, the choices for that question, and the correct answer
var questions = [
    {
        question: 'Which of these is NOT one of the original 3 starting Pokémon?',
        choices: ['Charmander', 'Piplup', 'Bulbasuar', 'Squirtle'],
        correct: 'Piplup'
    },
    {
        question: 'How many total Pokémon are there as of 2021?',
        choices: ['151', '1021', '557', '898'],
        correct: '898'
    },
    {
        question: 'What is the region that the newest game: "Pokémon Brilliant Diamond/Shining Pearl", take place?',
        choices: ['Sinnoh', 'Galor', 'Kanto', 'Unova'],
        correct: 'Sinnoh'
    },
    {
        question: 'Which of these Pokémon types are SUPER effective against ALL THE OTHER types listed?',
        choices: ['Dragon', 'Dark', 'Fairy', 'Fighting'],
        correct: 'Fairy'
    },
    {
        question: 'Which of these Pokémon are Legendary/Mythical?',
        choices: ['Rayquaza', 'Dragonite', 'Charizard', 'Tyranitar'],
        correct: 'Rayquaza'
    },
];


// Creating variables that select different parts of the HTML to dynamically change the page with
var startQuizButton = document.querySelector('.start-button');
var timer = document.querySelector('#timer');
var questionsEl = document.querySelector('#question-div');
var questionsUl = document.querySelector('question-ul');
var welcomeEl = document.querySelector('#welcome');
var endEl = document.querySelector('#end-div');

var timeLeft;
var timerInterval;
var hidden;
var liEl;
var buttonEl;

var userQuestion;
var userChoices;

var score = 0;
var questionPointer = 0;
var highscores = [];

var win;
var lose;



function countdown() {
    timeLeft = 50;
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            timer.textContent = `Time: 0`;
            clearInterval(timerInterval);
            endQuiz();
            console.log('Uh oh! You ran out of time... GAME OVER!');
            var gameOver = document.createElement ('h2');
            gameOver.textContent = 'Game Over!';
            questionsEl.appendChild(gameOver);
            buttonRestart();
        }; 
      }, 1000);
};



function hideStart() {
    hidden = document.getElementById('welcome');
    hidden.classList.add('hide');
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
        userChoices.addEventListener('click', answerQuestion);
        if (questionPointer === questions.length - 1){
            userChoices.addEventListener('click', endQuiz);
        } else { 
            userChoices.addEventListener('click', renderQuestion);
        };  
    };    
    console.log(questionPointer);
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
        console.log('Correct');

    } else { 
        timeLeft = timeLeft - 10    
        console.log(`Wrong! the correct answer was ${questions[questionPointer].correct}`);
    }
    questionPointer++;
};



function restartQuiz() {
    window.location.reload();
};



function buttonRestart() {
    var restartButton = document.createElement ('button');
    restartButton.textContent = 'Restart';
    endEl.appendChild(restartButton);
    restartButton.addEventListener('click', restartQuiz);
};



// TODO: On endquiz, clear the time interval
function endQuiz() {
    checkWin();
    questionsEl.innerHTML = '';
    if (win === true) {
        // win = false;
        clearInterval(timerInterval);
        timer.textContent = `Time: ${timeLeft}`;
        var winGame = document.createElement ('h2');
        var winGameP = document.createElement ('p');
        winGame.textContent = 'You Win!';
        winGameP.textContent = `You had a score of ${timeLeft} points!`;
        questionsEl.appendChild(winGame);
        questionsEl.appendChild(winGameP);
        // score = timeLeft;
        // console.log(score);
        userInput();
        // setWin();
        buttonRestart();
    }  
};



function checkWin(){
    if (timeLeft > 0) {
        win = true;
    } else {
        lose = true;
    };
};



// TODO: add text showing user their score at end, and after score submit thank them

// TODO: make it so submit only happens once for score
highscores = JSON.parse(localStorage.getItem('highscores')) || [];

function userInput(){


    label = document.createElement('label');
    initialsInput = document.createElement('input');
    
    // label.classList.add('block');
    // initialsInput.classList.add('block');

    label.textContent = `Initials: `;
    
    questionsEl.appendChild(label);
    questionsEl.appendChild(initialsInput);

    submitButton = document.createElement('button');
    // submitButton.setAttribute('id', 'disable-button')
    submitButton.textContent = 'Submit';
    endEl.appendChild(submitButton);
    
    submitButton.addEventListener('click', function() {
        
        var userInitials = initialsInput.value;

        
        if (userInitials.length !== 2) {
            console.log('No value entered');
            alert('Please input 2 initials');
            return;
        } else {
            userScore = {
                initials: userInitials,
                score: timeLeft
            }
        }

        highscores.push(userScore);

        localStorage.setItem('highscores', JSON.stringify(highscores));

        console.log(highscores);
        
        window.location.href = './high-scores.html'
    
    })
            
};


function setWin(){
    localStorage.setItem('storedScore', timeLeft);
};

startQuizButton.addEventListener('click', startQuiz);