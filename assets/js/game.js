/*  const easyQuestion = ("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple");
 */
const question = document.getElementById("question-box");
const answerButtonsElement = Array.from(document.getElementsByClassName("choice-text"));
const prizeText = document.getElementById('prize');
const animateTimer = document.querySelector('.info-timer');
/* const nameModal = document.getElementById('nameModal'); */
const gamepage = document.getElementById('gamepage');
const answercount = document.getElementById("answercount");
/* const codeName = document.getElementById('codeName');
console.log(codeName);*/

//------------------Top Heist-------------------
/* const topScore = localStorage.getItem('topScore');
const playerScore = document.getElementById('playerScore');
playerScore.innerHTML = topScore; */
 
var buttons = document.querySelectorAll('.btn1');

let randomQuestion;
let CurrentQuestionIndex = 0;


let CurrentMoneyIndex = 0;
//let questionCounter = 0;
let availableQuestion = [];


const AIM_QUESTION = 10;

let answer = 0;
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
                const newQuestion = {
                    question: results.question
                }
                //console.log(formattedQuestion);

                //results.incorrect_answers.push(results.correct_answer);
                const answerChoices = [...results.incorrect_answers];
                //console.log(answerChoices);

                newQuestion.answer = Math.floor(Math.random() * 3) + 1;
                //console.log(formattedQuestion.answer)

                answerChoices.splice(newQuestion.answer - 1, 0, results.correct_answer);

                answerChoices.forEach((choice, index) => {
                    newQuestion["choice" + (index + 1)] = choice;


                    //document.getElementById('answers-buttons').innerHTML = (`<button class="choice-text btn" >${correct_answer + "," + results.incorrect_answers}</button>`);
                })
                return newQuestion;
            });
        };

    };

    xmlhttp.open("GET", baseURL, true);
    xmlhttp.send();

});

//CONSTANT
//------------------MOney Prize in Array-------------------
const Prize = [
    '€1',
    '€100',
    '€500',
    '€1,000',
    '€5,000',
    '€10,000',
    '€50,000',
    '€100,000',
    '€500,000',
    '€1,000,000',
    '€5,000,000',
];
//var timerId;
//var timer = 10;

//Total amount of questions
const totalQuestion = 9;
const totalWrongAnswer = 3;

startGame = () => {
    answer = 0;
    currentQuestion = 0;
    CurrentMoneyIndex = 0;
    availablePrize = [...Prize];
    randomQuestion = questions.sort(() => Math.random() - 5);
    CurrentQuestionIndex = 0;
    availableQuestion = [...questions];
    // myFunction();
    nextQuestion();
    /* gamepage.classList.remove("hidden"); */
    /* nameModal.classList.add("hidden"); */

};
//------------------Show next questions-------------------
/* Function on how to get/load the next Question from the API */
function nextQuestion() {
    showQuestion(randomQuestion[CurrentQuestionIndex]);
};
//------------------Show the Questions-------------------
/* Function on how to load the next question from the API Array */
function showQuestion() {
    
    if (availableQuestion.length === 0 || CurrentQuestionIndex >= totalQuestion) {
    }

    CurrentQuestionIndex++;
    if (currentQuestion = availableQuestion[CurrentQuestionIndex]) {
        question.innerHTML = `<h2>Question : ${CurrentQuestionIndex}</h2><br><h4>${currentQuestion["question"]}</h4> `;
    }
    console.log(availableQuestion[CurrentQuestionIndex]);
    console.log(currentQuestion);

    answerButtonsElement.forEach(choice => {

        const number = choice.dataset["number"];
        choice.innerHTML = currentQuestion["choice" + number];

    });
    acceptingAnswer = true;

    startTimer();

}
//------------------ Multiple choice -------------------
/* Function on how to place the answer and show correct/incorrect choice from the API  */
answerButtonsElement.forEach(choice => {
    // console.log(answerButtonsElement)
    choice.addEventListener("click", e => {
        console.log(choice);
        console.log(e.target)
        if (!acceptingAnswer) return;
        buttons.disabled = !buttons.disabled;
        buttons.disabled = true;
        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        console.log(selectedAnswer == currentQuestion.answer);
        console.log(selectedAnswer);



        setStatusClass(document.body, selectedAnswer)


        function setStatusClass(element, selectedAnswer) {

            if (selectedAnswer == currentQuestion.answer) {
                clearStatusClass(element);
                console.log(element);
                // use the classList API to add classes
                element.classList.add('correct');
                plusWin();

            } else {
                element.classList.add('incorrect')
                strikeOut();
            }

        }
        // use the classList API to remove classes
        function clearStatusClass(element) {
            element.classList.remove('correct');
            element.classList.remove('incorrect');
        }
        
       

        setTimeout(function () {
        document.body.classList.remove('correct');
        document.body.classList.remove('incorrect');
        nextQuestion();
        buttons.forEach(button => {
            button.disabled = true;
             console.log(buttons);
         });
        animateTimer.classList.remove('animated', 'bounceOutLeft');
          }, 1000);



    });



});
//------------------Total Prize Won-------------------
/* Function on how to get the Prize from  correct answers */
function plusWin() {
    CurrentMoneyIndex++;
    currentPrize = availablePrize[CurrentMoneyIndex];
    prizeText.innerHTML = `<img src="/assets/Image/euro.png"></img>Money Heist! ${currentPrize}<n/> <img src="/assets/Image/redthief.png"></img>`;
    console.log(availablePrize[CurrentMoneyIndex]);
};
//------------------Wrong Answer-------------------
/* Function on how to get 3 wrong answer and show game over modal */
function strikeOut() {
    answer ++;
    console.log(answer);
        if (answer >= totalWrongAnswer) {
            $('#gameOverModal').modal('show');
            $('#gamepage').hide();
        }
    answercount.innerHTML = `Strike ${ answer} out of ${totalWrongAnswer}`;
}

//------------------Start Timer-------------------
/* Function for Timed Questions */
function startTimer() {
    var count = 10;
    var timer = setInterval(function () {
            console.log(count);
            const hourGlass = document.getElementById("countdown-timer");

            hourGlass.innerHTML = `<span><i class="fas fa-hourglass-half"></i></span>Timer : ${count}`;
            count--;

            if (count < 0) {

                enableBtn();
                stopInterval();
                animateTimer.classList.add('animated', 'bounceOutLeft');

            }
        },
        1000);

    var stopInterval = function () {
        console.log('time is up!');
        document.getElementById("countdown-timer").innerHTML = "GOODLUCK!";
        clearInterval(timer);
    }

}

//------------------Timed Buttons-------------------
/* Function to show disabled/hide Buttons */
function enableBtn() {
    buttons.forEach(button => {
        button.disabled = false;
        console.log(buttons);
    });
}

//------------------Players Name-------------------
/* Function to print the name of the Player*/
function getName() {
    let playerName = document.getElementById("myText").value;
    document.getElementById("codename").innerHTML = `<img src="/assets/Image/bellaciao2.jpg">Hola! ${playerName}<img src="/assets/Image/clown2.jpg">`;
    console.log(playerName);
    $("#nameModalexit").on('click', function () {
        if (playerName.length === 0) {
            document.getElementById("noName").innerHTML = `<div style="border: 0.1rem solid #C81912; background: white;">Por favor! Tu nombre / Please! enter your codename</div>`;
        } else {
            $('#nameModal').modal('hide');
            $('#gamepage').show();

            setTimeout(() => {
                startGame();
            }, 2000);
        }
    });
}

//------------------Best Robber Score-------------------
/* Function to save top Score*/
/* function topHeist() {
    if (prize >= 3) {

    }
} */
//------------------The End Game-------------------
/* Function for the modal to show for the bravest and wisest of them all */
function endGame() {
    let playerName = document.getElementById("myText").value;
    document.getElementById("playerWin").innerHTML = `${playerName} €2.4 billion`;
    console.log(playerName);
   $('#winModal').modal('show');
   $('#gamepage').hide();

}

//------------------Player Name Modal-------------------
/* Function to load Modal for Players name when the game loads*/
$(document).ready(function () {
    $('#nameModal').modal('show');
    //$('#nameModal').modal('hide');
    $('#gamepage').hide();
    //$('#gameOverModal').modal('show');
});