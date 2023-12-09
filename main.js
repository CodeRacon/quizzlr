//
//  VARIABLES
//
const displayedIMG = document.getElementById('img-display');
const quizCardTitle = document.getElementById('quiz-card-title');
const quizCardTxt = document.getElementById('quiz-card-text');
const answerTxt1 = document.getElementById('answer-txt-1');
const answerTxt2 = document.getElementById('answer-txt-2');
const answerTxt3 = document.getElementById('answer-txt-3');
const answerTxt4 = document.getElementById('answer-txt-4');

const textElementIDs = [
  'quiz-card-title',
  'quiz-card-text',
  'answer-txt-1',
  'answer-txt-2',
  'answer-txt-3',
  'answer-txt-4',
];

let currentIndex = 0;
let controllIndex = 0;
let isStartRendered = false;

// FUNCTIONS

function init() {
  isPowerOn = false;
  isStartRendered = false;
  controllIndex = 0;
  currentIndex = 0;

  initializeLEDs();

  displayedIMG.src = 'img/off.jpeg';
  textElementIDs.forEach((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '';
    }
  });
}

function renderStartScreen() {
  isStartRendered = true;
  displayedIMG.src = startData[0].imgOnScreen;
  textElementIDs.forEach((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '';
    }
  });
  const startTexts = [
    startData[0].quizCardTitle,
    startData[0].quizCardTxt,
    startData[0].answer_1,
    startData[0].answer_2,
    startData[0].answer_3,
    startData[0].answer_4,
  ];

  animateText(startTexts);
}

function renderNextCard() {
  if (isPowerOn) {
    playButtonSound();
    if (isStartRendered) {
      renderQuizData(currentIndex);
      deactivateAnswerLED();
      isStartRendered = false;
    } else if (currentIndex < quizData.length) {
      if (quizData[currentIndex].isDone) {
        currentIndex++;
        renderQuizData(currentIndex);
        deactivateAnswerLED();
      } else {
        blinkLEDs();
        playBeepSound();
        isSelected = false;
      }
    } else if (
      controllIndex === quizData.length + 1 &&
      currentIndex === quizData.length
    ) {
      restartQuiz();
    }
  } else {
  }
}

function renderQuizData(currentIndex) {
  const quizJSON = quizData[currentIndex];
  controllIndex++;

  if (currentIndex < quizData.length) {
    displayedIMG.src = quizJSON.imgOnScreen;
    quizCardTitle.innerHTML = `Question #${currentIndex + 1}`;

    const quizTexts = [
      quizCardTitle.innerHTML,
      quizJSON.question,
      quizJSON.answer_1,
      quizJSON.answer_2,
      quizJSON.answer_3,
      quizJSON.answer_4,
    ];

    animateText(quizTexts);

    activateCurrentLED(currentIndex);
  } else if (currentIndex === quizData.length) {
    countCorrectAnswers();
    quizSummary();
  }
}

function countCorrectAnswers() {
  let correctAnswers = 0;
  for (let i = 0; i < quizData.length; i++) {
    if (quizData[i].isCorrect) {
      correctAnswers++;
    }
  }
  return correctAnswers;
}

function quizSummary() {
  const correctAnswers = countCorrectAnswers();
  const soundSwitch = document.getElementById('sound-switch');
  const lastLED = document.getElementById(quizData[19].questionLED);

  if (currentIndex === quizData.length) {
    lastLED.classList.remove('pulsating');
  }
  if (soundSwitch.classList.contains('sound-on')) {
    stopBgSound();
  } else {
  }
  playEndSound();

  textElementIDs.forEach((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '';
    }
  });

  displayedIMG.innerHTML = '';
  quizCardTitle.innerHTML = 'Quiz-Summary';
  displayedIMG.src = 'img/end.gif';

  if (correctAnswers <= 5) {
    quizCardTxt.innerHTML = /*html*/ `
      Wow! You got ${correctAnswers} ...at least you did your best. I guess. Hit >>NEXT<< to start over.
    `;
    answerTxt1.innerHTML = 'No worries. Just give it one more try.';
    answerTxt3.innerHTML = 'Or in your case: maybe ten will do!';
  }

  if (correctAnswers >= 5 && correctAnswers <= 10) {
    quizCardTxt.innerHTML = /*html*/ `
      ${correctAnswers} out of 20 is not that bad! You can do better I guess. Hit >>NEXT<< to start over.
    `;
    answerTxt1.innerHTML = 'No worries. Just give it one more try.';
    answerTxt3.innerHTML = 'You can do it!';
  }

  if (correctAnswers >= 11 && correctAnswers <= 15) {
    quizCardTxt.innerHTML = /*html*/ `
      ${correctAnswers} out of 20 is pretty good! Can you get all green? Hit >>NEXT<< to start over.
    `;
    answerTxt1.innerHTML = 'Almost there!';
    answerTxt2.innerHTML = 'Just give it one more try.';
    answerTxt4.innerHTML = 'You can do it!';
  }

  if (correctAnswers >= 16 && correctAnswers <= 19) {
    quizCardTxt.innerHTML = /*html*/ `
     Whoa! ${correctAnswers} correct answers! Go for all-green and hit >>NEXT<< to start over.
    `;
    answerTxt1.innerHTML = 'Just give it one more try.';
    answerTxt3.innerHTML = 'You can do it!!!';
  }

  if (correctAnswers === 20) {
    quizCardTitle.innerHTML = '';
    quizCardTitle.innerHTML = 'YOU DID IT! ALL-GREEN!';

    quizCardTxt.innerHTML = /*html*/ `
      20 out of 20...that is really something! <br>Very well done, mate!  
    `;
    answerTxt1.innerHTML = 'Turn the off the device when finished!';
    answerTxt3.innerHTML = 'Thanks!';
  }
}

function restartQuiz() {
  const soundSwitch = document.getElementById('sound-switch');
  if (soundSwitch.classList.contains('sound-on')) {
    playBgSound();
  } else {
  }

  currentIndex = 0;
  controllIndex = 0;
  isStartRendered = true;
  for (let i = 0; i < quizData.length; i++) {
    quizData[i].isDone = false;
    quizData[i].isAnswerConfirmed = false;
  }
  initializeLEDs();
  renderNextCard();
}

function animateText(arrayName) {
  const speed = 25;
  let delay = 0;

  arrayName.forEach((text, i) => {
    const element = document.getElementById(textElementIDs[i]);
    element.innerHTML = '';
    if (text && text !== '') {
      setTimeout(() => {
        if (element) {
          typeWriter(text, textElementIDs[i], speed);
        }
      }, delay);
      delay += text.length * speed + 50;
    }
  });
}

function typeWriter(text, elementId, speed) {
  let i = 0;
  const targetElement = document.getElementById(elementId);
  if (!targetElement || !text) return;
  function type() {
    if (!isPowerOn) {
      return;
    }
    if (i < text.length) {
      targetElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
