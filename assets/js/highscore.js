// creates variables to select id's from the html
var highscoreList = document.querySelector("#highscore-list");
var clear = document.querySelector("#clear");
var liEl;

// when the clear button is clicked, the storage is cleared and the page is refreshed
clear.addEventListener("click", function(){
    localStorage.clear();
    window.location.reload();
});


// function to get the scores from local storage to be displayed in order on the highscore.html page
function setScores() {

    // parses the highscores object's strings into data or an empty array if there is no data
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    
    // function to sort the scores in order from highest to lowest
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });
    
    console.log(highscores);

    // forloop that creats list elements inside the ordered list, and puts the local storages data onto the page
    // the loop only iterates 5 times so the list only has the top 5 scores
    for (let i=0; i<highscores.length && i<5 ; i++){
        liEl = document.createElement('li');
        liEl.textContent = `${highscores[i].initials} - ${highscores[i].score}`;
        highscoreList.appendChild(liEl);
    };
};

// calls the set scores function
setScores();



