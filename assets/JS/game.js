/*  const easyQuestion = ("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple");
 */
//const question = document.getElementById("question");
/* const answerButtonsElement = document.getElementById("answer-buttons");*/
const answerButtonsElement = Array.from(document.getElementsByClassName("choice-text"));
console.log(answerButtonsElement);

let getNewquestion, CurrentQuestionIndex


let currentQuestion = {};
let questionCounter = 0;
let availableQuestion = [];
let questions = [];



//var xmlhttp = new XMLHttpRequest();
const baseURL = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";



//xmlhttp.onreadystatechange = function () {
// if (this.readyState == 4 && this.status == 200) {
//   var allQuestion = JSON.parse(this.responseText);
//  console.log(allQuestion.results);

// questions = allQuestion.results.map(function (results) {
//   console.log(results.question);
//   document.getElementById("question").innerHTML = results.question;



//results.incorrect_answers.push(results.correct_answer);
//   const answerChoices = [...results.incorrect_answers];
//   allQuestion = Math.floor(Math.random() * 3) + 1;
//  answerChoices.splice(
//      question - 1,
//      0,
//      results.correct_answer
//  );

//results.incorrect_answers.forEach(function (answers) {
// answerChoices.forEach((correct_answer, index) => {
//    results.question["correct_answer" + (index + 1)] = correct_answer;
//     answerButtonsElement.innerText = answerChoices;
//  document.getElementById('answers-buttons').innerHTML = answerChoices;
//});
//console.log(`choices: ${answerButtonsElement}`)

/*  document.createElement('button').innerHTML = (`Hi my name is ${answerChoices}`);*/
//  answerButtonsElement 
/* document.getElementById('answers-buttons').innerHTML = (`<button class="choice-text btn" >"${answerChoices}"</button>`); */
/* document.getElementsByClassName('btn').innerHTML = (`Hi my name is ${answers}`); */



//console.log(`choices: ${answers}`)

//     });
/* results.incorrect_answers.forEach(function (question, answerChoices) {
    console.log(`Hi my name is ${question} I'm number ${answerChoices + 1} in the loop`)
    document.createElement('BUTTON');
    document.getElementById('answer').innerHTML = (` ${question}`);
    }) */

/* console.log(results.correct_answer);
console.log(results.incorrect_answers);
document.getElementsByClassName('choice-text').innerHTML = results.correct_answer;
document.getElementById('answer').innerHTML = results.incorrect_answers; */




//   };

//};

//xmlhttp.open("GET", baseURL, true);
//xmlhttp.send();


//const AIM_QUESTION = 10;

//function startGame() {
//   questionCounter = 0;
//   allQuestion = [];
//  console.log(allQuestion);



//}

//startGame ();

/* function setNextQuestion() {
    if (availableQuestion.length === 0 || questionCounter >= AIM_QUESTION) {
        return window.location.assign("/end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    answerButtonsElement.forEach(choice => {
        const number = choice.dataset['number'];
        answerButtonsElement.innerText = allQuestion['choice' + number];
    });
} */

$(function (questions) {
    var xmlhttp = new XMLHttpRequest();
    const baseURL = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";



    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var allQuestion = JSON.parse(this.responseText);
            console.log(allQuestion.results);

            allQuestion.results.map(function (results) {
                console.log(results.question);
                document.getElementById("question").innerHTML = results.question;
                const formattedQuestion = { question: allQuestion.question }


                const answerChoices = [...results.incorrect_answers, results.correct_answer];
                console.log(answerChoices);

                formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
                answerChoices.splice(
                    formattedQuestion.answer - 1,
                    0,
                    formattedQuestion.answer);
                //correct_answer = results.correct_answer
                answerChoices.forEach((correct_answer, index) => {
                    formattedQuestion["correct_answer" + (index + 1)] = correct_answer;
                    answerButtonsElement.forEach(choice => {
                        const number = choice.dataset["number"];
                        choice.innerText = answerChoices[number];
                    });
                    document.getElementById('answers-buttons').innerHTML = (`<button class="choice-text btn" >${correct_answer + "," + results.incorrect_answers}</button>`);
                })
                return formattedQuestion;
            });
        };
    };

    xmlhttp.open("GET", baseURL, true);
    xmlhttp.send();

});
