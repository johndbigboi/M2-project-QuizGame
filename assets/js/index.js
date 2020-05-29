/*jshint esversion: 6 */
const topName = JSON.parse(localStorage.getItem("topScores")) || [];
const gameMusic = new Audio('assets/sounds/gamesound.mp3');


document.getElementById("topScoreButton").addEventListener("click", function () {
    document.getElementById("richList").innerHTML = topName.map(score => {
            return `<li>${score.name} - ${score.money}</li>`;
        })
        .join("");
});

function dontShow() {
    const checked = localStorage.getItem("checkBoxLocal");

    if (checked === "undefined") {
        $("#start-info-modal").modal("hide");
        $("#start-info-modal").css("display", "none");
    } else if ($(window).width() < 1025) {
        $("#start-info-modal").modal("hide");
       gameMusic.play();
    } else {
         $("#start-info-modal").modal("show");
    }
      
}

 $(document).ready(function () {
             
     dontShow();
    $("#start-info-modal").on("hidden.bs.modal", function () {
        let checkedBox = document.getElementById("soundIconModal").checked; 
        localStorage.setItem("checkBoxLocal", checkedBox);
        gameMusic.play();

    }); 
});
