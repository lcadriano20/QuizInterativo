const questions = [
  {
    question: "Qual é a capital do Brasil?",
    choices: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
    answer: "Brasília",
  },
  {
    question: "Qual é a capital da Argentina?",
    choices: ["Buenos Aires", "Brasília", "Lisboa", "Paris"],
    answer: "Buenos Aires",
  },
  {
    question: "Qual é a capital da França?",
    choices: ["Roma", "Madri", "Paris", "Londres"],
    answer: "Paris",
  },
  {
    question: "Qual é a capital da Espanha?",
    choices: ["Lisboa", "Madri", "Barcelona", "Valência"],
    answer: "Madri",
  },
  {
    question: "Qual é a capital da Itália?",
    choices: ["Veneza", "Milão", "Roma", "Nápoles"],
    answer: "Roma",
  },
  {
    question: "Qual é a capital do Canadá?",
    choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    answer: "Ottawa",
  },
  {
    question: "Qual é a capital dos Estados Unidos?",
    choices: ["Nova York", "Los Angeles", "Chicago", "Washington D.C."],
    answer: "Washington D.C.",
  },
  {
    question: "Qual é a capital do Reino Unido?",
    choices: ["Liverpool", "Manchester", "Edimburgo", "Londres"],
    answer: "Londres",
  },
];


const questionElement = document.getElementById("question");
const choiceElements  = Array.from(document.getElementsByClassName("choice"));
const nextButton      = document.getElementById("next");
const scoreElement    = document.getElementById("score");
const wrongElement    = document.getElementById("wrong");
const gameResult      = document.querySelector('.game-result')
const responseTime    = document.querySelector('.response-time')
let attemptsSpan      = document.querySelector('.attempts-span')
let choiceBoard       = document.querySelector('#choices-board')
let divResults        = document.querySelector('#attempts-scoreboard-results')
let controlAttempts = 0;


// CRONOMETRO 
let tempo = 0;
let cronometro;
let segundosFormato;



function formatarTempo(segundos) {
    const segundosRestantes = segundos % 60;

    let segundosFormato = `${String(segundosRestantes).padStart(1, '0')}`

    return segundosFormato
}

function timeIsOver() {
  let gameResultParagraph = document.createElement('p')
  gameResultParagraph.textContent = `Fim de Jogo! Seu tempo acabou.`
  gameResultParagraph.classList.add('negative-score')

  

  

  divResults.appendChild(gameResultParagraph)
}

function atualizarCronometro() {
    tempo++;
    responseTime.textContent = formatarTempo(tempo);
    responseTime.style.color = 'red'

    if(tempo>=30) {
      restartQuiz()
      timeIsOver()
    }

}
window.onload = function() {
  cronometro = setInterval(atualizarCronometro, 1000); 
  loadQuestion();
};


let currentQuestion = 0;
let score = 0;
let wrong = 0;
let answerChosen = false;
let gameOver = false;



function loadQuestion() {
  if (currentQuestion < questions.length) {
    const currentQuestionData = questions[currentQuestion];
    questionElement.innerText = currentQuestionData.question;
  
    const choices = shuffleArray(currentQuestionData.choices);
  
    for (let i = 0; i < choiceElements.length; i++) {
      choiceElements[i].innerText = choices[i];
    }
    answerChosen = false;
  } else {
      if(score>=4) {
        gameResult.classList.add('positive-score')
        gameOver = true;
        restartQuiz()

        setTimeout(() => {
          gameResult.style.display = 'none';
        }, 2000); 
      }
    
  }
}
function addRightAnswerToChoiceBoard(correctAnswer) {
  let pRightAnswer = document.createElement('p')
  pRightAnswer.classList.add('correct-answer-choice-board')
  pRightAnswer.textContent = correctAnswer

  choiceBoard.appendChild(pRightAnswer)
}

function addFalseAnswerToChoiceBoard(falseAnswer) {
  let pfalseAnswer = document.createElement('p')
  pfalseAnswer.classList.add('false-answer-choice-board')

  pfalseAnswer.textContent = falseAnswer
  choiceBoard.appendChild(pfalseAnswer)
}


function checkAnswer(e) {
  if (answerChosen) return;
  answerChosen = true;

  if (e.target.innerText === questions[currentQuestion].answer) {
    addRightAnswerToChoiceBoard(questions[currentQuestion].answer)
    score++; 
    scoreElement.innerText = "Pontuação: " + score;
    currentQuestion++
    loadQuestion()
    if(score>=5) {
      includePositiveResults()
      restartQuiz()
    }
  } 

  else {
    addFalseAnswerToChoiceBoard(e.target.innerText)
    wrong++;
    wrongElement.innerText = "Erros: " + wrong;
    currentQuestion++
    loadQuestion()

      if(wrong>3) {
        gameOver = true;
        includeAttempts()
        restartQuiz()
        setTimeout(() => {
          gameResult.style.display = 'none';
        }, 1500); 
        
      }
  }
}
function includePositiveResults() {


  let gameResultParagraph = document.createElement('p')
  gameResultParagraph.textContent = 'Parabéns você acertou mais de 5 perguntas!'
  gameResultParagraph.classList.add('positive-score')




}

function includeAttempts() {
  let gameResultParagraph = document.createElement('p')
  gameResultParagraph.textContent = `Fim de Jogo! Errou mais de 3`
  gameResultParagraph.classList.add('negative-score')
 
  

  divResults.appendChild(gameResultParagraph)
}

choiceElements.forEach((element) => {
  element.addEventListener("click", checkAnswer)
});

function restartQuiz() {
let rightParagraph = choiceBoard.querySelectorAll('p')

rightParagraph.forEach((paragraph)=>{
  if(paragraph.classList.contains('correct-answer-choice-board') || paragraph.classList.contains('false-answer-choice-board')){
    paragraph.remove()
  }
})
  
  controlAttempts++
  attemptsSpan.textContent = controlAttempts

        if(controlAttempts>3) {
          attemptsSpan.textContent = ''
          divResults.remove()
          
        } 
  tempo = 0;
  currentQuestion = 0;
  score = 0;
  wrong = 0;
  scoreElement.innerText = "Pontuação: 0";
  wrongElement.innerText = "Erros: 0";
  loadQuestion();
}



function shuffleArray(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

loadQuestion();