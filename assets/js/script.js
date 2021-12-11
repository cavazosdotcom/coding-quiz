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

// creates variables that I'll be using
var timeLeft;
var timerInterval;
var hidden;
var liEl;
var buttonEl;

// variables for the question and answers 
var userQuestion;
var userChoices;

// variables setting up different values/highscores array
var score = 0;
var questionPointer = 0;
var highscores = [];

// variables for boolean values later
var win;
var lose;



// creates function to start quiz, which hides the start, starts the countdown, then renders the first question based on the index
function startQuiz() {
    hideStart();
    countdown();
    renderQuestion();
};



// timer countdown function
function countdown() {
    // sets the timer to be 50 seconds
    timeLeft = 50;
    timerInterval = setInterval(function() {
        // countdown goes down by 1 second at a time
        timeLeft--;
        // timer text is set to show Time: with the time left/selected with a template literal
        timer.textContent = `Time: ${timeLeft}`;
        // if the time runs out
        if (timeLeft <= 0) {
            // timer will show 0 so it doesn't show any negative numbers
            timer.textContent = `Time: 0`;
            // clears the timer interval
            clearInterval(timerInterval);
            // runs end quiz function when timer runs out
            endQuiz();
            console.log('Uh oh! You ran out of time... GAME OVER!');
            var gameOver = document.createElement ('h2');
            gameOver.textContent = 'Game Over!';
            questionsEl.appendChild(gameOver);
            // calls function to create restart button 
            buttonRestart();
        }; 
      }, 1000);
};



// function to hide the start screen
function hideStart() {
    hidden = document.getElementById('welcome');
    hidden.classList.add('hide');
};



// function to render each question
function renderQuestion() {
    // everytime the function is called, the html is cleared in the main part of the page to make room for new questions, etc.
    questionsEl.innerHTML = '';
    // creates an h2 and sets the shown question to be the current question of the questions array based on the questionPointer index
    userQuestion = document.createElement('h2');
    userQuestion.textContent = questions[questionPointer].question;
    questionsEl.appendChild(userQuestion);
    // adds the wrapper class to keep everything in the center
    questionsEl.classList.add('wrapper');
    // for loop to show the possible answers, runs 4 times, once for each possible answer, creates buttons and sets the value of each button
    // to be the current answer choice in choices based on the questionPointer index 
    for (var i = 0; i < questions[questionPointer].choices.length; i++) {
        userChoices = document.createElement('button');

        userChoices.classList.add('choice-buttons');

        userChoices.textContent = questions[questionPointer].choices[i];

        userChoices.setAttribute('value', questions[questionPointer].choices[i]);

        questionsEl.appendChild(userChoices);

        // every possible choice has an event listener to run the answerQuestion function, inside forloop so each button gets the event listener
        userChoices.addEventListener('click', answerQuestion);
        // if statement so if the index is on the last question, to end the quiz, otherwise run the renderQuestion function again to show the next question
        if (questionPointer === questions.length - 1){
            userChoices.addEventListener('click', endQuiz);
        } else { 
            userChoices.addEventListener('click', renderQuestion);
        };  
    };    
    console.log(questionPointer);
}; 



// function to dictate whether the user choice is correct ot false
function answerQuestion(event) {
    // console.log(questions[questionPointer].correct);
    // console.log(`event:${event.target.value}`);
    // on the event that the user clicks the target(button), the value of that is evaluated
    if (event.target.value === questions[questionPointer].correct) {
        console.log('Correct');

    } else { 
        timeLeft = timeLeft - 10    
        console.log(`Wrong! the correct answer was ${questions[questionPointer].correct}`);
    }
    questionPointer++;
};



// function that refreshes the page
function restartQuiz() {
    window.location.reload();
};



// creates the restart button, and adds event listener to refresh the page when clicked
function buttonRestart() {

    var restartButton = document.createElement ('button');

    restartButton.textContent = 'Restart';

    endEl.appendChild(restartButton);

    restartButton.addEventListener('click', restartQuiz);
};



// function to end the quiz, then evaluate if the user won 
function endQuiz() {
    // win condition, if there is time left, the user wins
    checkWin();
    // when the quiz ends the page clears so we have room for the highscore input/game over
    questionsEl.innerHTML = '';
    // if the user wins the timer is cleared, they won, then the input for user initials to track score is created
    if (win === true) {
        
        clearInterval(timerInterval);
        // sets time to show real time left in case user gets last question wrong
        timer.textContent = `Time: ${timeLeft}`;

        var winGame = document.createElement ('h2');
        var winGameP = document.createElement ('p');

        winGame.textContent = 'You Win!';
        winGameP.textContent = `You had a score of ${timeLeft} points!`;

        questionsEl.appendChild(winGame);
        questionsEl.appendChild(winGameP);
        
        userInput();
        
        buttonRestart();
    }  
};



// win condition, if there is time left, the user wins, if not then they lose
function checkWin(){
    if (timeLeft > 0) {
        win = true;
    } else {
        lose = true;
    };
};



// either retrieves the local storages highscores on page reload, or if empty makes it an empty array
highscores = JSON.parse(localStorage.getItem('highscores')) || [];

// function for the highscore input
function userInput(){


    label = document.createElement('label');
    initialsInput = document.createElement('input');
    submitButton = document.createElement('button');

    label.textContent = `Initials: `;
    submitButton.textContent = 'Submit';
    
    questionsEl.appendChild(label);
    questionsEl.appendChild(initialsInput);
    endEl.appendChild(submitButton);
    
    // on click, call back function for the submit button
    submitButton.addEventListener('click', function() {
        
        // the initials are set to what the user inputs
        var userInitials = initialsInput.value;

        // if the input isn't 2 characters, then alerts user and gives opportunity to re-input
        if (userInitials.length !== 2) {
            // console.log('No value entered');
            alert('Please input 2 initials');
            return;
            // if initials are valid, then store the initials and score in an object as key value pairs
        } else {
            userScore = {
                initials: userInitials,
                score: timeLeft
            }
        }

        // pushes the object into the highscores array
        highscores.push(userScore);

        // sets the highscores array into local storage to be retrieved later
        localStorage.setItem('highscores', JSON.stringify(highscores));

        // console.log(highscores);
        
        // when submit is clicked, take user to the highscores page
        window.location.href = './high-scores.html'
    
    })
            
};


// adds event to start the quiz when the start button is clicked
startQuizButton.addEventListener('click', startQuiz);