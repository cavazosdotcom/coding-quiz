var highscoreList = document.querySelector("#highscore-list");
var liEl;
var clear = document.querySelector("#clear");


clear.addEventListener("click", function(){
    localStorage.clear();
    window.location.reload();
});




function setScores() {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    
    
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });
    
    console.log(highscores);
    for (let i=0; i<highscores.length && i<5 ; i++){
        liEl = document.createElement('li');
        liEl.textContent = `${highscores[i].initials} - ${highscores[i].score}`;
        highscoreList.appendChild(liEl);
    };
};

setScores();



