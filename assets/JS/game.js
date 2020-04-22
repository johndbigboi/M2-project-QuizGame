/*  const easyQuestion = ("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple");
 */
const question = document.getElementById("question-box");
/* const answerButtonsElement = document.getElementById("answer-buttons");*/
const answerButtonsElement = Array.from(document.getElementsByClassName("choice-text"));
const prizeText = document.getElementById('prize');

let randomQuestion; 
let CurrentQuestionIndex = 0;


let CurrentMoneyIndex = 0;
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
                const newQuestion = { question: results.question }
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
        startGame();
    };

    xmlhttp.open("GET", baseURL, true);
    xmlhttp.send();

});

//CONSTANT

 const  Prize = [
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


const totalQuestion = 11;

startGame = () => {
    
    currentQuestion = 0;
    CurrentMoneyIndex = 0;
    availablePrize = [...Prize];
    randomQuestion = questions.sort(() => Math.random() - 5);
    CurrentQuestionIndex = 0;
    availableQuestion = [...questions];
    console.log(availableQuestion);
    nextQuestion();
    

};

function nextQuestion() { 
    showQuestion(randomQuestion[CurrentQuestionIndex]);
};

function showQuestion() {
    CurrentQuestionIndex++;
    if (currentQuestion = availableQuestion[CurrentQuestionIndex]) {
        question.innerHTML = `Question : ${currentQuestion["question"]}`;
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
            
            if (selectedAnswer == currentQuestion.answer) {
                clearStatusClass(element);
                // use the classList API to add classes
                element.classList.add('correct');   
                plusWin();
                
            } else {
                element.classList.add('incorrect')   
                
            } 
            
        }
        // use the classList API to remove classes
        function clearStatusClass(element) {
            element.classList.remove('correct')
            element.classList.remove('incorrect')
        }
        
        
        setTimeout(function(){ 
            document.body.classList.remove('correct');
            document.body.classList.remove('incorrect');
            nextQuestion();
            
        }, 1000);
    
       
    });
    

        
}); 

function plusWin() {
    CurrentMoneyIndex ++;
    currentPrize = availablePrize[CurrentMoneyIndex];
    prizeText.innerText = `Money won! ${currentPrize}`;
    console.log(availablePrize[CurrentMoneyIndex]);
};

//------------------Start Timer-------------------


/* function startTimer() {
    timerId = setInterval(decrement, 1000);
}

function decrement() {
    timer--;
    
    if(count === 0) {
    stopInterval()
    }, 1000);
    $("#countdown-timer").html(`<span>
                    <i class="fas fa-hourglass-half"></i></span>Timer: ${timer}`);

} */
function startTimer() {
var count = 15;
var timer = setInterval(function() {
  console.log(count);
  $("#countdown-timer").html(`<span>
                    <i class="fas fa-hourglass-half"></i></span>Timer: ${count}`);
  count--;
  if(count === 0) {
    stopInterval()
  }
}, 1000);

var stopInterval = function() {
  console.log('time is up!');
  clearInterval(timer);
}
                    
}



 $(document).ready(function () {
    /* $(".choice-text").click(function () {
        $("li").eq(3 & 2).css("background-color", "red");

    }); 
     $("#menu").on('click', 'li', function () {
         $(this).parent().find('li').css("background-color", "");
         $(this).css("background-color", "blue");
     }); */
     $("#add_li").click(function () {
         $("#menu").prepend("<li>1000</li>"),
         $("li").eq().remove();
     }) 
    
});

