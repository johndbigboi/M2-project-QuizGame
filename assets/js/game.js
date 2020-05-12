/*  const easyQuestion = ("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple");
 */
const question = document.getElementById("question-box");
const answerButtonsElement = Array.from(document.getElementsByClassName("choice-text"));
const prizeText = document.getElementById('prize');
const animateTimer = document.querySelector('.info-timer');
const gamepage = document.getElementById('gamepage');
const answercount = document.getElementById("answercount");

//------------------Top Heist-------------------
//const latestScore = localStorage.getItem('latestScore');
const topScores = JSON.parse(localStorage.getItem("topScores")) || [];

var buttons = document.querySelectorAll('.btn1');

let randomQuestion;
let CurrentQuestionIndex = 0;


let CurrentMoneyIndex = 0;
let availableQuestion = [];


const AIM_QUESTION = 10;

let answer = 0;
let questions = [];

$(function () {
    var xmlhttp = new XMLHttpRequest();
    const baseURL = "https://opentdb.com/api.php?amount=13&difficulty=easy&type=multiple";



    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var allQuestion = JSON.parse(this.responseText);

            questions = allQuestion.results.map(function (results) {

                const newQuestion = {
                    question: results.question
                }

                const answerChoices = [...results.incorrect_answers];

                newQuestion.answer = Math.floor(Math.random() * 3) + 1;


                answerChoices.splice(newQuestion.answer - 1, 0, results.correct_answer);

                answerChoices.forEach((choice, index) => {
                    newQuestion["choice" + (index + 1)] = choice;
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
    '€0',
    '€100,000',
    '€500,000',
    '€1,000,000',
    '€5,000,000',
    '€10,000,000',
    '€50,000,000',
    '€100,000,000',
    '€500,000,000',
    '€1,000,000,000',
    '€2,400,000,000',
];


//Total amount of questions
const jackPot = 9;
const totalQuestion = 10;
const totalWrongAnswer = 3;
var playerName;
var timer;
var timerMusic = new Audio('assets/sounds/suspense.wav');
var gameMusic = new Audio('assets/sounds/gamesound.mp3');
var endMusic = new Audio('assets/sounds/police.wav');
var correctMusic = new Audio('assets/sounds/correct.wav');
var incorrectMusic = new Audio('assets/sounds/incorrect.mp3');
var victoryMusic = new Audio('assets/sounds/victorymusic.wav');

startGame = () => {
    answeredCorrect = 0;
    answer = 0;
    currentQuestion = 0;
    CurrentMoneyIndex = 0;
    availablePrize = [...Prize];
    randomQuestion = questions.sort(() => Math.random() - 5);
    CurrentQuestionIndex = 0;
    availableQuestion = [...questions];
    nextQuestion();
};

//------------------Show next questions-------------------
/* Function on how to get/load the next Question from the API */
function nextQuestion() {
    showQuestion(randomQuestion[CurrentQuestionIndex]);
};
//------------------Show the Questions-------------------
/* Function on how to load the next question from the API Array */
function showQuestion() {
    if (availableQuestion.length === 0 || CurrentQuestionIndex === totalQuestion) {
        stopMusic();
        endGame();
    }
    CurrentQuestionIndex++;
    if (currentQuestion = availableQuestion[CurrentQuestionIndex]) {
        question.innerHTML = `<h2>Question : ${CurrentQuestionIndex}</h2><br><h4>${currentQuestion["question"]}</h4> `;

    }
    console.log(currentQuestion);

    answerButtonsElement.forEach(choice => {

        const number = choice.dataset["number"];
        choice.innerHTML = currentQuestion["choice" + number];

    });
    timerMusic.play();
    acceptingAnswer = true;
    enableBtn();


}
//------------------ Multiple choice -------------------
/* Function on how to place the answer and show correct/incorrect choice from the API  */
answerButtonsElement.forEach(choice => {
    // console.log(answerButtonsElement)
    choice.addEventListener("click", e => {
        stopMusic();
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
                // use the classList API to add classes
                element.classList.add('correct');
                plusWin();
                correctMusic.play();

            } else {
                element.classList.add('incorrect');
                incorrectMusic.play();
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
            });
            //animateTimer.classList.remove('animated', 'bounceOutLeft');
        }, 1000);
    });
});
//------------------Total Prize Won-------------------
/* Function on how to get the Prize from  correct answers */
function plusWin() {
    CurrentMoneyIndex++;
    answeredCorrect++;
    if (answeredCorrect >= jackPot) {
        prizeText.innerHTML = `<img src="assets/images/euro.png"></img>
    Money Heist! ${currentPrize}<n/>
    <br>
    <p>LAST QUESTION!</p>`;
    }
    currentPrize = availablePrize[CurrentMoneyIndex];
    prizeText.innerHTML = `<img src="assets/images/euro.png"></img>
    Money Heist! ${currentPrize}<n/>
    <br>
    <p>${answeredCorrect} correct answer!</p>`;
    console.log(availablePrize[CurrentMoneyIndex]);
    
};
//------------------Wrong Answer-------------------
/* Function on how to get 3 wrong answer and show game over modal */
function strikeOut() {
    answer++;
    console.log(answer);
    if (answer >= totalWrongAnswer) {
        document.body.classList.remove('incorrect');
        endMusic.play();
        $('#gameOverModal').modal('show');
        $('#gamepage').hide();
        if (currentPrize != 0) {
            document.getElementById("playerScore").innerHTML = `Total Money Heist ${currentPrize}`;
        }
        saveTopScore();
    }
    answercount.innerHTML = `Strike ${ answer} out of ${totalWrongAnswer}`;
}
//------------------Start Timer-------------------
/* Function for Timed Questions */
function startTimer() {

    var count = 10;
    timer = setInterval(function () {
            console.log(count);
            const hourGlass = document.getElementById("countdown-timer");
            hourGlass.innerHTML = `<span><i class="fas fa-hourglass-half"></i></span>Timer : ${count}`;
            count--;

            if (count < 0) {
                clearInterval(timer);
                stopInterval();
                animateTimer.classList.add('animated', 'bounceOutLeft');
            }
        },
        1000);

    var stopInterval = function () {
        console.log('time is up!');
        document.getElementById("countdown-timer").innerHTML = "GOODLUCK!";
    }
}


//------------------Timed Buttons-------------------
/* Function to show disabled/hide Buttons */
function enableBtn() {
    var delay = 5;
    var buttonsTimer = setInterval(() => {
        console.log(delay);
        delay--;
        document.getElementById("countdown-timer").innerHTML = "GOODLUCK!";
        clearInterval(timer);
        if (delay < 0) {
            buttons.forEach(button => {
                button.disabled = false;
            });
            clearInterval(buttonsTimer);
            startTimer();
        } else {
            clearTimeout(delay, 1000);
        }
    }, 1000);
}

//------------------Players Name-------------------
/* Function to print the name of the Player*/
function getName() {
    playerName = document.getElementById("myText").value;
    document.getElementById("codename").innerHTML =
        `<img src="assets/images/bellaciao2.jpg"></img>
         Hola! ${playerName}
         <img src="assets/images/clown2.jpg"></img>
         `;
    $("#nameModalexit").on('click', function () {
        if (playerName.length === 0) {
            document.getElementById("noName").innerHTML = `<div style="border: 0.1rem solid #C81912; background: white;">Por favor! Tu nombre / Please! enter your codename</div>`;
        } else {
            gameMusic.pause();
            document.getElementById('nameModal').style.display = "none"
            document.getElementById('gamepage').style.display = "block";
            setTimeout(() => {
                startGame();
            }, 2000);
        }
    });
}

//------------------The End Game-------------------
/* Function for the modal to show for the bravest and wisest of them all */
function endGame() {
    victoryMusic.play();
    console.log(playerName);
    //answer++;
    if (CurrentQuestionIndex >= totalQuestion) {
        document.getElementById("playerWin").innerHTML = `Well done ${playerName}!`;
        $('#winModal').modal('show');
        $('#gamepage').hide();
        
    } 
    //else if (answer === totalWrongAnswer) {
     //   $('#gameOverModal').modal('show');
     //   $('#gamepage').hide();
     //   endMusic.play();
     //   document.getElementById("playerScoreName").innerHTML = `<h5>${playerName}!</h5>`;
        //document.getElementById("playerScore").innerHTML = `Total Money Heist ${currentPrize}`;
        //if (currentPrize != 0) {document.getElementById("playerScore").innerHTML = `Total Money Heist ${currentPrize}`;}

   // }

   // answercount.innerHTML = `Strike ${ answer} out of ${totalWrongAnswer}`;
   // saveTopScore();
}


//------------------Player Name Modal-------------------
/* class audioControl {
    constructor() {
        this.gameMusic = new Audio('assets/sounds/bensound-instinct.mp3');
        this.gameoverSound = new Audio('assets/sounds/card-flip.wav');
        this.victorySound = new Audio('assets/sounds/matchedSound.wav');
    }
    startMusic() {
        this.gameMusic = 0;
        this.gameMusic.play();
    }

    stopMusic() {
        this.gameMusic.pause();
    }

    endGameSound() {
        this.gameoverSound.play();
    }

    winnerSound() {
        this.victorySound.play();
    }

} */
function stopMusic() {
    timerMusic.pause();
    timerMusic.currentTime = 0;
}

window.onload = function () {
    gameMusic.play();
    document.getElementById('nameModal').style.display = "block";
    document.getElementById('nameModal').style.background = "url(assets/images/blur3.png) no-repeat center center fixed";
    document.getElementById('nameModal').style.backgroundSize = "cover";
    document.getElementById('gamepage').style.display = "none";
};

//------------------Best Robber Score-------------------
/* Function to save top Score*/
function saveTopScore() {
    const score = {
        name: playerName,
        money: currentPrize,
    }

    topScores.push(score);
    topScores.sort((a, b) => b.score - a.score);
    topScores.splice(10);

    localStorage.setItem("topScores", JSON.stringify(topScores));
}

const richList = document.getElementById('richList');
richList.innerHTML = topScores

    .map(score => {
        return `<li class="high-score">${score.name} - ${score.money}</li>`;
    })
    .join("");