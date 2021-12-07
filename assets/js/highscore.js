var highscoreList = document.querySelector("#highscore-list");
var highscore;
var liEl;
var allScores = JSON.parse(localStorage.getItem("allStoredScores"));
var clear = document.querySelector("#clear");

clear.addEventListener("click", function(){
    localStorage.clear();

});


// function setScore(){

//     var lastScore = JSON.parse(localStorage.getItem("storedScore"));
//     console.log(lastScore);
//     // console.log(allScores);
//     for (var i = 0; i < 5; i++){
//         liEl = document.createElement("li");
//         liEl.textContent = lastScore[i].initials + ": " + lastScore[i].score;
//         highscoreList.appendChild(liEl);
//     };
// };
// setScore();

console.log(allScores)


    // lastScore = JSON.parse(localStorage.getItem("storedScore"))
    // console.log(allScores.initials)
// for ( var i = 0; i < allScores.length; i++ ){
//     liEl = document.createElement("li");
//     liEl.textContent = allScores[i].initials + " " + allScores[i].score;
//     highscoreList.appendChild(liEl);
// }



