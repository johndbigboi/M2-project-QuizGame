/*  const easyQuestion = ("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple");
 */
const question = document.getElementById("question");
/* const answerButtonsElement = document.getElementById("answer-buttons");*/
const answerButtonsElement = Array.from(document.getElementsByClassName("choice-text"));

let randomQuestion, CurrentQuestionIndex;


let currentQuestion = {};
let questionCounter = 0;
let availableQuestion = [];


const AIM_QUESTION = 10;


/* //startGame ();*/
let questions = [];
console.log(questions);

$(function () {
    var xmlhttp = new XMLHttpRequest();
    const baseURL = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";



    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var allQuestion = JSON.parse(this.responseText);

            //console.log(allQuestion);

            questions = allQuestion.results.map(function (results) {
                //console.log(questions);
                //document.getElementById("question").innerHTML = results.question;
                const formattedQuestion = { question: results.question }
                //console.log(formattedQuestion);

                //results.incorrect_answers.push(results.correct_answer);
                const answerChoices = [...results.incorrect_answers];
                //console.log(answerChoices);

                formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
                //console.log(formattedQuestion.answer)

                answerChoices.splice(formattedQuestion.answer - 1, 0, results.correct_answer);

                answerChoices.forEach((choice, index) => {
                    formattedQuestion["choice" + (index + 1)] = choice;


                    //document.getElementById('answers-buttons').innerHTML = (`<button class="choice-text btn" >${correct_answer + "," + results.incorrect_answers}</button>`);
                })
                return formattedQuestion;
            });
        };
        startGame();
    };

    xmlhttp.open("GET", baseURL, true);
    xmlhttp.send();

});

//CONSTANT

const CORRECT_BONUS = 10;
const MAX_QUESTION = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    randomQuestion = questions.sort(() => Math.random() - 5)
    CurrentQuestionIndex = 0
    availableQuestion = [...questions];
    //console.log(availableQuestion);
    nextQuestion();

};

/* nextQuestion = () => {
    if (availableQuestion.length === 0 || questionCounter >= MAX_QUESTION) {
        //localStorage.setItem("mostRecentScore", score);
        //GO TO THE END PAGE

    }
    questionCounter++;
    const CurrentQuestionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[CurrentQuestionIndex];
    console.log(currentQuestion);
    question.innerText = currentQuestion.question;

    answerButtonsElement.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestion.splice(CurrentQuestionIndex, 1);

    acceptingAnswer = true;
}; */
function nextQuestion() { 
    showQuestion(randomQuestion[CurrentQuestionIndex])
};

function showQuestion() {
    currentQuestion = availableQuestion[CurrentQuestionIndex];
    question.innerText = currentQuestion.question;
    console.log(currentQuestion);
    answerButtonsElement.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    acceptingAnswer = true;
}

answerButtonsElement.forEach(choice => {
    // console.log(answerButtonsElement)
    choice.addEventListener("click", e => {
        console.log(e.target)
        if (!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        console.log(selectedAnswer == currentQuestion.answer);

 

        setStatusClass(document.body, selectedAnswer)


        function setStatusClass(element, selectedAnswer) {
            clearStatusClass(element)
            if (selectedAnswer == currentQuestion.answer) {
                element.classList.add('correct')
            } else {
                element.classList.add('incorrect')
            }
        }

        function clearStatusClass(element) {
            element.classList.remove('correct')
            element.classList.remove('incorrect')
        }
    });
}); 