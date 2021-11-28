# What starting data does my application need to run

- Questions and Answers
    
    - Array list for our questions

    - Each question will be an object
        ```
        {
            question: "Commonly used data types DO NOT include:",
            answers: [
                "string",
                "boolean",
                "alert",
                "number"
            ],
            correct: "alert"
        }
        ```
- Timer / Score    

# What kinds of actions does my application need to do?

var interval;

- start the game
function startGame() {......}

    - hide welcome
    function hideWelcome () {....}

    - display the next question
    function displayNextQuestion () {......}

    - start the countdown timer
    function startTimer () {
        interval = setInterval(function() {
            ...
            clearInterval(interval);

        }, 1000);
    }
- validate the users choice

    - IF the choice is wrong, we need to subtract time from the timer

- display the answer result

- display the next question
    function displayNextQuestion () {....}

- end the game

    - stop the timer (clearInterval)

    - 

# Pseudocode

- select everything

    - start, end, timer, questions, correct, 