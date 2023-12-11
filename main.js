//
const displayedIMG = document.getElementById('img-display');
const quizCardTitle = document.getElementById('quiz-card-title');
const quizCardTxt = document.getElementById('quiz-card-text');
const answerTxt1 = document.getElementById('answer-txt-1');
const answerTxt2 = document.getElementById('answer-txt-2');
const answerTxt3 = document.getElementById('answer-txt-3');
const answerTxt4 = document.getElementById('answer-txt-4');

/** array, containing all the IDs for HTML-Elements that include text */
const textElementIDs = [
  'quiz-card-title',
  'quiz-card-text',
  'answer-txt-1',
  'answer-txt-2',
  'answer-txt-3',
  'answer-txt-4',
];

/** represents the current index related to the quizData array */
let currentIndex = 0;

/** represents an index that comes in handy when creating certain conditions for button -and display functionalities  */
let controllIndex = 0;

/** shows, whether the start-screen has been rendered  */
let isStartRendered = false;

/**
 * Initializes the quiz-app by setting it to a clean start-state by:
 * - resetting all LEDs to an off-state using {@link initializeLEDs}
 * - setting {@link currentIndex} & {@link controllIndex} back to 0
 * - emptying the text-elements
 */
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

/**
 * Renders the start screen of the application by:
 * - accessing the startData-information to
 *    - fill the text-elements and animate it
 *      with {@link animateText}
 *    - fill the img-element
 */
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

/**
 * Due to the limitation of having only one controll-button, the rendering
 * of the next card in the quiz-flow is based on various conditions.
 * - {@link renderQuizData} - render following quiz-card
 * - {@link restartQuiz} - starts quiz over
 * This function also controls several LED states:
 * - {@link deactivateAnswerLED} - reset LEDs after revealing color-feedback
 * - {@link blinkLEDs} - short blink-cycle to give a "do else!" -feedback an
 * handles the progression of the quiz by increasing the {@link currentIndex} by one
 */
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

/**
 * This function renders the quizData-information for the current index within the quiz-flow by:
 * - accessing the quizData-information to
 *    - fill the text-elements and animate it
 *      with {@link animateText}
 *    - fill the img-element
 * also it increases the {@link controllIndex} keepm track with the also
 * increased {@link currentIndex}
 * it also controlls LED-behavior to give progress-feedback
 * with {@link activateCurrentLED} if the last quiz-card is processed and
 * answered it calles {@link countCorrectAnswers} for the {@link quizSummary}
 * ------------------------------
 * @param {number} currentIndex - The index of the quizData to render.
 */
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

/**
 * This function iterates through the quizData and counts the number of correct answers.
 * @returns {number} the total number of correct answers given.
 */
function countCorrectAnswers() {
  let correctAnswers = 0;
  for (let i = 0; i < quizData.length; i++) {
    if (quizData[i].isCorrect) {
      correctAnswers++;
    }
  }
  return correctAnswers;
}

/**
 * Displays a summary message showing the total amount of correct answers given.
 * - Depending on the actual amount, different messages are shown.
 * - If the background-music is playing, it is stopped by {@link stopBgSound}
 * - In in both cases a special "end-of-quiz-sound" is played {@link playEndSound}
 */
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

/**
 * - Resets quiz-related states like {@link currentIndex}, {@link controllIndex} and {@link isStartRendered}
 * - Resets all the progress-LEDs by calling {@link initializeLEDs}
 * - Starts quiz over by rendering the first quiz-question by calling {@link renderNextCard}
 * - By checking if the background-music is playing, it will continue playing it with the restart of the quiz
 */
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

/**
 * This function animates text by iterating to an array containing text-elements {@link arrayName},
 * simulating a typing effect on specified HTML elements by calling {@link typeWriter} for each.
 * @param {string[]} arrayName - Array containing text content to be animated.
 */
function animateText(arrayName) {
  const speed = 20;
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

/**
 * Simulates a typewriter effect by gradually displaying text.
 * This function simulates a typewriter effect by gradually displaying text in a specified HTML element.
 * @param {string} text - The text content to be displayed.
 * @param {string} elementId - The ID of the HTML element to display the text.
 * @param {number} speed - The speed of "typing" in milliseconds.
 */
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
