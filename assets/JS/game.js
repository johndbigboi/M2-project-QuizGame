/*  const easyQuestion = ("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple");
 */

let correctAnswer = [];
let questions = [];

var xmlhttp = new XMLHttpRequest();
const baseURL = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";


xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var allQuestion = JSON.parse(this.responseText);
        console.log(allQuestion.results);

        questions = allQuestion.results.map(function (results) {

            console.log(results.question);

            document.getElementById("question").innerHTML = results.question;

        })

        correctAnswer = allQuestion.results.map(function (results) {
            console.log(results.correct_answer);
            document.getElementsByClassName('choice-text').innerHTML = results.correct_answer;
        })
        const answerChoices = allQuestion.results.map(function (results) {
            console.log(results.incorrect_answers);
            document.getElementById('answer').innerHTML = results.incorrect_answers;
        })

    };

};


xmlhttp.open("GET", baseURL, true);
xmlhttp.send();
