//
//
//
let currentIndex = 0;

function init() {
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

// function renderStartScreen() {
//   const displayedIMG = document.getElementById('img-display');
//   const quizCardTitle = document.getElementById('quiz-card-title');
//   const quizCardTxt = document.getElementById('quiz-card-text');
//   const answerTxt1 = document.getElementById('answer-txt-1');
//   const answerTxt2 = document.getElementById('answer-txt-2');
//   const answerTxt3 = document.getElementById('answer-txt-3');
//   const answerTxt4 = document.getElementById('answer-txt-4');

//   displayedIMG.src = startData[0].imgOnScreen;
//   quizCardTitle.innerHTML = startData[0].quizCardTitle;
//   quizCardTxt.innerHTML = startData[0].quizCardTxt;

//   answerTxt1.innerHTML = startData[0].answer_1;
//   answerTxt2.innerHTML = '';
//   answerTxt3.innerHTML = '';
//   answerTxt4.innerHTML = '';
// }

// function renderQuizData(i) {
//   const quizJSON = quizData[i];

//   const displayedIMG = document.getElementById('img-display');
//   const quizCardTitle = document.getElementById('quiz-card-title');
//   const quizCardTxt = document.getElementById('quiz-card-text');
//   const answerTxt1 = document.getElementById('answer-txt-1');
//   const answerTxt2 = document.getElementById('answer-txt-2');
//   const answerTxt3 = document.getElementById('answer-txt-3');
//   const answerTxt4 = document.getElementById('answer-txt-4');

//   displayedIMG.src = quizJSON.imgOnScreen;
//   quizCardTitle.innerHTML = `Question #${i + 1}`;
//   quizCardTxt.innerHTML = quizJSON.question;

//   answerTxt1.innerHTML = quizJSON.answer_1;
//   answerTxt2.innerHTML = quizJSON.answer_2;
//   answerTxt3.innerHTML = quizJSON.answer_3;
//   answerTxt4.innerHTML = quizJSON.answer_4;
// }

function renderStartScreen() {
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
  if (currentIndex < quizData.length) {
    renderQuizData(currentIndex);
    currentIndex++;
  } else {
    console.log('Quiz finished!');
  }

  deactivateAnswerLED();
}

function typeWriter(text, elementId, speed) {
  let i = 0;
  const targetElement = document.getElementById(elementId);
  if (!targetElement || !text) return;

  function type() {
    if (i < text.length) {
      targetElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

function renderQuizData(index) {
  const quizJSON = quizData[index];

  const displayedIMG = document.getElementById('img-display');
  const quizCardTitle = document.getElementById('quiz-card-title');
  const quizCardTxt = document.getElementById('quiz-card-text');
  const answerTxt1 = document.getElementById('answer-txt-1');
  const answerTxt2 = document.getElementById('answer-txt-2');
  const answerTxt3 = document.getElementById('answer-txt-3');
  const answerTxt4 = document.getElementById('answer-txt-4');

  displayedIMG.src = quizJSON.imgOnScreen;
  quizCardTitle.innerHTML = `Question #${index + 1}`;
  // quizCardTxt.innerHTML = '';

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

  activateCurrentLED(index);
}
