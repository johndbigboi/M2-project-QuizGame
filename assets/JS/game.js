/*  const easyQuestion = ("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple");
 */
const question = document.getElementById("question");
/* const answerChoices = Array.from(document.getElementById("choice-text"));
 */
let getNewquestion, CurrentQuestionIndex



let questionCounter = 0;
let availableQuestion = [];
let questions = [];
let answerChoices = [];
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


            allQuestion.results.map(function (results) {
                results.incorrect_answers.push(results.correct_answer);
                results.incorrect_answers.forEach(function (question) {
                    answerChoices = document.createElement('button');
                    
                    console.log(`Hi my name is ${question}`)
                })
            /* console.log(results.correct_answer);
            console.log(results.incorrect_answers);
            document.getElementsByClassName('choice-text').innerHTML = results.correct_answer;
            document.getElementById('answer').innerHTML = results.incorrect_answers; */
            
        })

    };

};


xmlhttp.open("GET", baseURL, true);
xmlhttp.send();

const AIM_QUESTION = 10;

function startGame() {
    questionCounter = 0;
    getNewquestion = questions.sort(() => Math.random() - .5)
    CurrentQuestionIndex = 0
    availableQuestion = [...questions];
    console.log(availableQuestion);

    setNextQuestion()
   
}

function setNextQuestion () {
    if (availableQuestion.length === 0 || questionCounter >= AIM_QUESTION) {
        return window.location.assign("/end.html");
    }
        questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    
}

function selectAnswer() {

}
