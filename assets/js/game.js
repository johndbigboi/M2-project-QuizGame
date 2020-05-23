/**
 * Global CONSTANT
 **/
const question = document.getElementById("question-box");
const prizeText = document.getElementById('prize');
const gamepage = document.getElementById('gamepage');
const answercount = document.getElementById("answercount");
const answerButtonsElement = Array.from(document.getElementsByClassName("choice-text"));
const animateTimer = document.querySelector('.info-timer');
const buttons = document.querySelectorAll('.btnchoice');
const topName = JSON.parse(localStorage.getItem("topScores")) || [];
const jackPot = 9;
const totalQuestion = 10;
const totalWrongAnswer = 3;

/**
 * Money Prize in Array
 **/
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
/**
 * Global let 
 **/

let CurrentQuestionIndex = 0;
let CurrentMoneyIndex = 0;
let answer = 0;
let questions = [];
let availableQuestion = [];
let randomQuestion;
let playerName;
let timer;
let sound = true;
let timerMusic = new Audio('assets/sounds/suspense.wav');
let gameMusic = new Audio('assets/sounds/gamesound.mp3');
let endMusic = new Audio('assets/sounds/police.wav');
let correctMusic = new Audio('assets/sounds/correct.wav');
let incorrectMusic = new Audio('assets/sounds/incorrect.mp3');
let victoryMusic = new Audio('assets/sounds/victorymusic.wav');

/**
 * function when the page loads 
 **/
$(document).ready(function () {
    gameMusic.play();
    $('#nameModal').modal('show');
    $('#gamepage').hide();

    /**
     * button toggle when click music on/off
     **/
    $('#soundButton').click(() => {
        let soundOn = sound;
        soundOn ? stopGameMusic() : startGameMusic();
    });

    function stopGameMusic() {
        sound = false;
        $('#soundButton').addClass('soundOff');
        $('#soundButton').removeClass('soundOn');
        gameMusic.pause();
    }

    function startGameMusic() {
        sound = true;
        $('#soundButton').addClass('soundOn');
        $('#soundButton').removeClass('soundOff');
        gameMusic.play();
    }

    document.getElementById("soundTimer").addEventListener("click", function () {
        console.log("stop the music");
        timerSoundOn = sound;

        timerSoundOn ? stopSound() : startSound();

        function stopSound() {
            sound = false;
            $('#soundTimer').addClass('soundOff');
            $('#soundTimer').removeClass('soundOn');
            timerMusic.pause();
        }

        function startSound() {
            sound = true;
            $('#soundTimer').addClass('soundOn');
            $('#soundTimer').removeClass('soundOff');
            timerMusic.play();
        }
    });

});
/** 
 * Function on how to stop the music 
 **/
stopMusic = () => {
    timerMusic.pause();

}

/**
 * function to get question from API source
 **/
fetch("https://opentdb.com/api.php?amount=13&difficulty=easy&type=multiple")
    .then((resp) => resp.json())
    .then((allQuestions) => {
        questions = allQuestions.results.map(function (results) {
            const newQuestion = {
                question: results.question,
            };
            const multipleAnswer = [...results.incorrect_answers];
            newQuestion.answer = Math.floor(Math.random() * 4) + 1;
            multipleAnswer.splice(newQuestion.answer - 1, 0, results.correct_answer);
            multipleAnswer.forEach((choice, index) => {
                newQuestion["choice" + (index + 1)] = choice;
            });
            return newQuestion;
        });
    })
    .catch(err => {
        console.error(err);
    });

/**
 * function for the game to start
 **/
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


/** 
 * Function on how to get and load the next Question from the API 
 **/
nextQuestion = () => {
    showQuestion(randomQuestion[CurrentQuestionIndex]);
};

/**
 *Function on how to load the next question from the API Array 
 **/
showQuestion = () => {
    if (answeredCorrect === totalQuestion) {
        console.log(answeredCorrect === totalQuestion);
        stopMusic();
        endGame();
        return;
    }
    CurrentQuestionIndex++;
    if (currentQuestion = availableQuestion[CurrentQuestionIndex]) {
        question.innerHTML = `<h2>Question : ${CurrentQuestionIndex}</h2><h2>${currentQuestion["question"]}</h2> `;

    }
    console.log(currentQuestion);

    answerButtonsElement.forEach(choice => {

        const number = choice.dataset["number"];
        choice.innerHTML = currentQuestion["choice" + number];

    });

    if (sound === false) {
        timerMusic.pause();
    } else {
        timerMusic.play();
    }
    acceptingAnswer = true;
    enableBtn();
    return;
}
/**
 *Function on how to place the answer and show correct/incorrect choice from the API 
 **/
answerButtonsElement.forEach(answerButtons => {
    answerButtons.addEventListener("click", e => {
        stopMusic();
        if (!acceptingAnswer) return;
        buttons.disabled = !buttons.disabled;
        buttons.disabled = true;
        acceptingAnswer = false;
        const chosenAnswer = e.target;
        const finalAnswer = chosenAnswer.dataset["number"];


        setStatusClass(document.body, finalAnswer)

        function setStatusClass(htmlElement, finalAnswer) {

            if (finalAnswer == currentQuestion.answer) {
                clearStatusClass(htmlElement);
                // use the classList API to add classes
                // the viewport is at least 900 pixels wide
                if (matchMedia("(max-width: 767px)").matches) {
                     htmlElement.classList.add('correct');
                   $('.correct').css("height", "153vh");
                    chosenAnswer.classList.add('correctanswer');
                } else {
                htmlElement.classList.add('correct');
                chosenAnswer.classList.add('correctanswer');
                }
                plusWin();
                correctMusic.play();
            } else {
                if (matchMedia("(max-width: 767px)").matches) {
                    htmlElement.classList.add('incorrect');
                    $('.incorrect').css("height", "153vh");
                    chosenAnswer.classList.add('incorrectanswer');
                } else {
                htmlElement.classList.add('incorrect');
                chosenAnswer.classList.add('incorrectanswer');
                }
                incorrectMusic.play();
                strikeOut();

            }
            return;

        }
        // use the classList API to remove classes
        function clearStatusClass(htmlElement) {
            htmlElement.classList.remove('correct');
            htmlElement.classList.remove('incorrect');
        }

        setTimeout(function () {
            document.body.classList.remove('correct');
            document.body.classList.remove('incorrect');
            chosenAnswer.classList.remove('correctanswer');
            chosenAnswer.classList.remove('incorrectanswer');
            if (matchMedia("(max-width: 767px)").matches) {
                 $('body').css("height", "120vh");
            }
            nextQuestion();
            buttons.forEach(button => {
                button.disabled = true;
            });
            //animateTimer.classList.remove('animated', 'bounceOutLeft');
        }, 1000);
    });
});

/** 
 * Function on how to get the Prize from  correct answers 
 **/
plusWin = () => {
    CurrentMoneyIndex++;
    answeredCorrect++;
    currentPrize = availablePrize[CurrentMoneyIndex];
    if (answeredCorrect >= jackPot) {
        prizeText.innerHTML = `
    Money Heist! ${currentPrize}<n/>
    <br>
    <p class="info-prize-jackpot">THE LAST QUESTION!</p>`;
    } else {
        prizeText.innerHTML =
            `
         Money Heist! ${currentPrize}<n/>
        <br>
        <p> <span class="info-prize-correct">
        ${answeredCorrect}</span>
        correct answer!</p>`;
    }

};

/** 
 * Function on how to get 3 wrong answer and show game over modal
 **/
strikeOut = () => {
    answer++;
    console.log(answer);
    if (answer >= totalWrongAnswer) {
        document.body.classList.remove('incorrect');
        endMusic.play();
        $('#gameOverModal').modal('show');
        $('#gamepage').hide();
        stopMusic();
        if (currentPrize != 0) {
            document.getElementById("playerScore").innerHTML = `Total Money Heist ${currentPrize}`;
        }
        saveTopScore();
    }

    answercount.innerHTML = `Strike <span class="info-strike">${answer}</span> out of <span class="info-strike">${totalWrongAnswer}</span>!`;
}

/** 
 * Function for Timed Questions 
 **/
startTimer = () => {

    var count = 15;
    timer = setInterval(function () {
            console.log(count);
            const hourGlass = document.getElementById("countdown-timer");
            hourGlass.innerHTML = `<span><i class="fas fa-hourglass-half"></i></span>Timer : ${count}`;
            count--;

            if (count < 0) {
                clearInterval(timer);
                endMusic.play();
                stopInterval();
                strikeOut();
                setTimeout(function () {
                    nextQuestion();
                    buttons.forEach(button => {
                        button.disabled = true;
                    });
                    //animateTimer.classList.remove('animated', 'bounceOutLeft');
                }, 8000);
                animateTimer.classList.add('animated', 'flip');
            }
        },
        1000);

    var stopInterval = function () {
        console.log('time is up!');
        document.getElementById("countdown-timer").innerHTML = "time is up!";
    }
}

/**
 *  Function to show disabled/hide Buttons 
 **/
enableBtn = () => {
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
            //startTimer();
        } else {
            clearTimeout(delay, 1000);
        }
    }, 1000);
}

/** 
 * Function to print the name of the Player in the Gamepage
 **/
document.getElementById("nameModalexit").addEventListener("click", function () {
    playerName = document.getElementById("myText").value;
    if (playerName.length === 0) {
        document.getElementById("noName").innerHTML = `<div style="border: 0.1rem solid #C81912; background: white;">Por favor! Tu nombre / Please! enter your codename</div>`;
    } else {
        gameMusic.pause();
        $('#nameModal').modal('hide');
        $('#gamepage').show();
        setTimeout(() => {
            startGame();
        }, 2000);
    }

    document.getElementById("codename").innerHTML =
        `<img src="assets/images/codename1.png"></img>
         Hola! ${playerName}
         <img src="assets/images/codename1.png"></img>
         `;
});

/** 
 * Function for the modal to show for the bravest and wisest of them all 
 **/
endGame = () => {
    victoryMusic.play();
    console.log(playerName);
    //answer++;
    if (CurrentQuestionIndex >= totalQuestion) {
        stopMusic();
        document.getElementById("playerWin").innerHTML = `Well done ${playerName}!`;
        $('#winModal').modal('show');
        $('#gamepage').hide();
        saveTopScore();
    }

}

/** 
 * Function to save top Score
 **/
saveTopScore = () => {
    const score = {
        name: playerName,
        money: currentPrize,
    }

    topScores.push(score);
    topScores.sort((a, b) => b.score - a.score);
    topScores.splice(10);

    localStorage.setItem("topScores", JSON.stringify(topScores));
}

document.getElementById("richList").innerHTML = topName.map(score => {
        return `<li>${score.name} - ${score.money}</li>`;
    })
    .join("");




//------------------Player Name Modal-------------------

/*window.onload = function () {
    gameMusic.play();
    document.getElementById('nameModal').style.display = "block";
    document.getElementById('nameModal').style.background = "url(assets/images/blur3.png) no-repeat center center fixed";
    document.getElementById('nameModal').style.backgroundSize = "cover";
    document.getElementById('gamepage').style.display = "none";
};*/