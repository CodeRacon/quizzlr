//
//
//
let currentIndex = 0;
let controllIndex = 0;
let isStartRendered = false;
//
function init() {
  isStartRendered = false;
  isPowerOn = false;
  controllIndex = 0;
  currentIndex = 0;

  const displayedIMG = document.getElementById('img-display');
  const quizCardTitle = document.getElementById('quiz-card-title');
  const quizCardTxt = document.getElementById('quiz-card-text');
  const answerTxt1 = document.getElementById('answer-txt-1');
  const answerTxt2 = document.getElementById('answer-txt-2');
  const answerTxt3 = document.getElementById('answer-txt-3');
  const answerTxt4 = document.getElementById('answer-txt-4');

  displayedIMG.src = 'img/off.jpeg';
  quizCardTxt.innerHTML = '';
  quizCardTitle.innerHTML = '';

  answerTxt1.innerHTML = '';
  answerTxt2.innerHTML = '';
  answerTxt3.innerHTML = '';
  answerTxt4.innerHTML = '';
}

function renderStartScreen() {
  isStartRendered = true;

  const displayedIMG = document.getElementById('img-display');
  const quizCardTitle = document.getElementById('quiz-card-title');
  const quizCardTxt = document.getElementById('quiz-card-text');
  const answerTxt1 = document.getElementById('answer-txt-1');
  const answerTxt2 = document.getElementById('answer-txt-2');
  const answerTxt3 = document.getElementById('answer-txt-3');
  const answerTxt4 = document.getElementById('answer-txt-4');

  displayedIMG.src = startData[0].imgOnScreen;
  quizCardTitle.innerHTML = '';
  quizCardTxt.innerHTML = '';

  answerTxt1.innerHTML = '';
  answerTxt2.innerHTML = '';
  answerTxt3.innerHTML = '';
  answerTxt4.innerHTML = '';

  const texts = [
    startData[0].quizCardTitle,
    startData[0].quizCardTxt,
    startData[0].answer_1,
    startData[0].answer_2,
    startData[0].answer_3,
    startData[0].answer_4,
  ];

  const elementIds = [
    'quiz-card-title',
    'quiz-card-text',
    'answer-txt-1',
    'answer-txt-2',
    'answer-txt-3',
    'answer-txt-4',
  ];

  const speed = 25; // Adjust the typing speed
  let delay = 0;

  texts.forEach((text, i) => {
    if (text !== '') {
      setTimeout(() => {
        const element = document.getElementById(elementIds[i]);
        if (element) {
          element.innerHTML = ''; // Clear the innerHTML before typing
          typeWriter(text, elementIds[i], speed);
        }
      }, delay);
      delay += text.length * speed + 500; // Set delay for the next animation
    }
  });
}

function renderNextCard() {
  if (isPowerOn) {
    playButtonSound();
    if (isStartRendered) {
      // controllIndex++;
      renderQuizData(currentIndex);
      deactivateAnswerLED();
      isStartRendered = false;
    } else if (currentIndex < quizData.length) {
      if (quizData[currentIndex].isDone) {
        currentIndex++;
        // controllIndex++;
        renderQuizData(currentIndex);
        deactivateAnswerLED();
      } else {
        blinkLEDs();
        playBeepSound();
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
  controllIndex++;

  const quizJSON = quizData[currentIndex];

  const displayedIMG = document.getElementById('img-display');
  const quizCardTitle = document.getElementById('quiz-card-title');
  const quizCardTxt = document.getElementById('quiz-card-text');
  const answerTxt1 = document.getElementById('answer-txt-1');
  const answerTxt2 = document.getElementById('answer-txt-2');
  const answerTxt3 = document.getElementById('answer-txt-3');
  const answerTxt4 = document.getElementById('answer-txt-4');

  if (currentIndex < quizData.length) {
    displayedIMG.src = quizJSON.imgOnScreen;
    quizCardTitle.innerHTML = `Question #${currentIndex + 1}`;

    const texts = [
      quizCardTitle.innerHTML,
      quizJSON.question,
      quizJSON.answer_1,
      quizJSON.answer_2,
      quizJSON.answer_3,
      quizJSON.answer_4,
    ];

    const elementIds = [
      'quiz-card-title',
      'quiz-card-text',
      'answer-txt-1',
      'answer-txt-2',
      'answer-txt-3',
      'answer-txt-4',
    ];

    const speed = 25;
    let delay = 0;

    texts.forEach((text, i) => {
      const element = document.getElementById(elementIds[i]);
      element.innerHTML = ''; // Clear the innerHTML before typing
      if (text && text !== '') {
        setTimeout(() => {
          if (element) {
            typeWriter(text, elementIds[i], speed);
          }
        }, delay);
        delay += text.length * speed + 50; // Set delay for the next animation
      }
    });

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
  const displayedIMG = document.getElementById('img-display');
  const quizCardTitle = document.getElementById('quiz-card-title');
  const quizCardTxt = document.getElementById('quiz-card-text');
  const answerTxt1 = document.getElementById('answer-txt-1');
  const answerTxt2 = document.getElementById('answer-txt-2');
  const answerTxt3 = document.getElementById('answer-txt-3');
  const answerTxt4 = document.getElementById('answer-txt-4');

  const correctAnswers = countCorrectAnswers();

  const lastLED = document.getElementById('q5LED');
  lastLED.classList.remove('pulsating');

  playEndSound();

  displayedIMG.innerHTML = '';
  quizCardTitle.innerHTML = '';
  quizCardTxt.innerHTML = '';
  answerTxt1.innerHTML = '';
  answerTxt2.innerHTML = '';
  answerTxt3.innerHTML = '';
  answerTxt4.innerHTML = '';

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
  currentIndex = 0;
  controllIndex = 0;
  isStartRendered = true;

  for (let i = 0; i < quizData.length; i++) {
    quizData[i].isDone = false;
    quizData[i].isAnswerConfirmed = false;
  }

  initializeLEDs();
  renderNextCard();
  stopBgSound();
}

function typeWriter(text, elementId, speed) {
  let i = 0;
  const targetElement = document.getElementById(elementId);
  if (!targetElement || !text) return;

  function type() {
    if (!isPowerOn) {
      // Abbrechen der Animation, wenn der Power-Switch auf "Off" gesetzt wird
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
