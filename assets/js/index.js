const topName = JSON.parse(localStorage.getItem("topScores")) || [];

document.getElementById("topScoreButton").addEventListener("click", function () {
    document.getElementById("richList").innerHTML = topName.map(score => {
            return `<li>${score.name} - ${score.money}</li>`;
        })
        .join("");
});
