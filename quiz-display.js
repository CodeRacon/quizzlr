//
//
//

function init() {
  const displayedIMG = document.getElementById('img-display');
  const quizCardTitle = document.getElementById('quiz-card-title');
  const quizCardTxt = document.getElementById('quiz-card-text');
  const answerTxt1 = document.getElementById('answer-txt-1');
  const answerTxt2 = document.getElementById('answer-txt-2');
  const answerTxt3 = document.getElementById('answer-txt-3');
  const answerTxt4 = document.getElementById('answer-txt-4');

  displayedIMG.src = 'img/off.jpeg';
  quizCardTxt.innerHTML = '&nbsp;';
  quizCardTitle.innerHTML = '&nbsp;';

  answerTxt1.innerHTML = '&nbsp;';
  answerTxt2.innerHTML = '&nbsp;';
  answerTxt3.innerHTML = '&nbsp;';
  answerTxt4.innerHTML = '&nbsp;';
}

function renderStartScreen() {
  const displayedIMG = document.getElementById('img-display');
  const quizCardTitle = document.getElementById('quiz-card-title');
  const quizCardTxt = document.getElementById('quiz-card-text');
  const answerTxt1 = document.getElementById('answer-txt-1');
  const answerTxt2 = document.getElementById('answer-txt-2');
  const answerTxt3 = document.getElementById('answer-txt-3');
  const answerTxt4 = document.getElementById('answer-txt-4');

  displayedIMG.src = startData[0].imgOnScreen;
  quizCardTitle.innerHTML = startData[0].quizCardTitle;
  quizCardTxt.innerHTML = startData[0].quizCardTxt;

  answerTxt1.innerHTML = startData[0].answer_1;
  answerTxt2.innerHTML = '';
  answerTxt3.innerHTML = '';
  answerTxt4.innerHTML = '';
}

function renderQuizScreens() {}
