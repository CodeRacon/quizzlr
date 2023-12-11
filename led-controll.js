//

/** Node-list representing the 20 progress-LEDs. */
const allProgressLEDs = document.querySelectorAll('.progress-light');

/** Array representing the 4 LEDs next to the numbered answer-buttons. */
const allLockLEDs = [
  document.getElementById('a1LED'),
  document.getElementById('a2LED'),
  document.getElementById('a3LED'),
  document.getElementById('a4LED'),
];

/** Array representing the 4 LEDs next to the numbered answer-buttons. */
let selectedAnswer;

/** shows, whether an answer has been selected  */
let isSelected = false;

/** shows, whether an answer has been confirmed  */
let isAnswerConfirmed = false;

/** shows, whether an answer has been answered correctly  */
let isCorrect;

/** shows, whether a question has been answered in order to proceed  */
let isDone;

/** Turns EITHER all 24 LEDs off OR only the 4 answer-LEDs -based on the {@link controllIndex} value. */
function initializeLEDs() {
  if (controllIndex === 0) {
    allProgressLEDs.forEach((led) => {
      led.classList.toggle('is-off', true);
      led.classList.remove('is-idle', 'is-wrong', 'is-correct', 'pulsating');
    });

    allLockLEDs.forEach((lockLED) => {
      lockLED.classList.toggle('is-off', true);
      lockLED.classList.remove('is-idle', 'is-wrong', 'is-correct');
    });
  } else {
    allLockLEDs.forEach((lockLED) => {
      lockLED.classList.toggle('is-off', true);
      lockLED.classList.remove('is-idle', 'is-wrong', 'is-correct');
    });
  }
}

/**
 * Lights up all 24 LEDs in a orchestrated sequence.
 * It triggers associated actions based on completion:
 * - Runs {@link playBeepSound} on every lit progress-LED-row.
 * - Runs {@link blinkLEDs} after all progress-LEDs are lit.
 * - Calls {@link renderStartScreen} after short delay.
 */
function lightUpLEDs() {
  let delay = 0;
  let completedRow = 0;
  const singleLEDOnDuration = 100;

  allProgressLEDs.forEach((LED, index) => {
    setTimeout(() => {
      LED.classList.add('is-idle');

      if ((index + 1) % 5 === 0) {
        completedRow++;
        allLockLEDs[completedRow - 1].classList.add('is-idle');
        playOneBeepSound();
      }

      if (completedRow === 4) {
        setTimeout(blinkLEDs, 300);
      }
    }, delay);

    delay += singleLEDOnDuration;
  });

  setTimeout(() => {
    renderStartScreen();
  }, 3750);
}

/**
 * Runs a blinking effect on the 4 answer-LEDs by toggling their classes in a sequence:
 * - Calls {@link lockBlinkCycle} to controll the blinking effect.
 * - for loop to initiate a blink-sequence
 * - setting all 24 LEDs back to off by calling {@link initializeLEDs}
 */
function blinkLEDs() {
  const blinkDuration = 175;
  const blinkCount = 1;

  /**
   * Initiates a blink cycle for the 4 answer-LEDs .
   * @param {string} color - The color class to apply during the blink cycle.
   * @param {number} delay - The delay before starting the blink cycle.
   */
  function lockBlinkCycle(color, delay) {
    setTimeout(() => {
      allLockLEDs.forEach((LED) => {
        LED.classList.remove('is-idle', 'is-wrong', 'is-correct', 'is-off');
        LED.classList.add(color);
      });
    }, delay);
  }

  for (let i = 0; i < blinkCount; i++) {
    lockBlinkCycle('is-idle', blinkDuration * i); // yellow
    lockBlinkCycle('is-off', blinkDuration * (i + 1)); // off
    lockBlinkCycle('is-idle', blinkDuration * (i + 2)); // yellow
    lockBlinkCycle('is-off', blinkDuration * (i + 3)); // off
    lockBlinkCycle('is-idle', blinkDuration * (i + 4)); // yellow
    lockBlinkCycle('is-off', blinkDuration * (i + 5)); // off
    lockBlinkCycle('is-idle', blinkDuration * (i + 6)); // yellow

    if (i === blinkCount - 1) {
      setTimeout(() => {
        initializeLEDs();
      }, blinkDuration * (i + 7));
    }
  }
}

/**
 * Handles the selection of an answer by the user, triggering associated actions like:
 * - activating the corresponding LED via {@link activateAnswerLED}
 * - setting the state of {@link isSelected} to 'true'.
 *
 * Using an if-condition, this function is only working when {@link controllIndex} >= 1.
 * That ensures, that an answer-selection won't happen until quiz-card #1 was rendered.
 * @param {string} answer - The selected answer option.
 */
function selectAnswer(answer) {
  if (controllIndex >= 1) {
    selectedAnswer = answer;
    isSelected = true;
    activateAnswerLED(answer);
  } else {
  }
}

/**
 * Confirms the selected answer for the current question, checks its correctness, and performs associated actions:
 * - Checks if the {@link controllIndex} allows answer confirmation.
 * - Checks if any of the currently given answers has not been confirmed.
 * If certain contitions are met:
 * - Calls {@link turnLEDOn} to light up the corresponding answer-LED associated with the selected answer.
 * - Sets the correctness status for the question using {@link isCorrect}
 * - Marks the question as completed using {@link isDone}
 * - Calls {@link colourCurrentLED} to indicate wether currentQuestion was answered correctly.
 *
 * To give the user a simple, visual "do else!" feedback, {@link playBeepSound} & {@link blinkLEDs} is called,
 * if no answer was selected bofore hitting 'CONFIRM'.
 * @param {string} selectedAnswer - The answer selected by the user.
 */
function confirmAnswer(selectedAnswer) {
  if (controllIndex >= 1) {
    const currentQuestion = quizData[currentIndex];

    if (!currentQuestion.isAnswerConfirmed) {
      if (isSelected) {
        const correctAnswer = currentQuestion.right_answer;
        let isCorrect = false;

        if (selectedAnswer === correctAnswer) {
          isCorrect = true;
          playSuccessSound();
        } else {
          isCorrect = false;
          playFailSound();
        }
        turnLEDOn();
        currentQuestion.isCorrect = isCorrect;
        currentQuestion.isDone = true;
        colourCurrentLED();

        currentQuestion.isAnswerConfirmed = true;
      } else {
        playBeepSound();
        blinkLEDs();
      }
    } else {
    }
  } else {
  }
}

/** Turns the answer-LED associated with the correct answer of the current question as correct (green) and marks all the others as incorrect (red). */
function turnLEDOn() {
  allLockLEDs.forEach((led, index) => {
    const currentQuestion = quizData[currentIndex];
    const correctAnswer = currentQuestion.right_answer;

    if (index !== correctAnswer) {
      led.classList.remove('is-idle');
      led.classList.remove('is-off');
      led.classList.add('is-wrong');
    } else {
      led.classList.remove('is-idle');
      led.classList.remove('is-off');
      led.classList.add('is-correct');
    }
  });
}

/**
 * This function activates the LED associated with the selected answer and removes idle status (yellow) from all other LEDs.
 * @param {number} answer - The selected answer index.
 */
function activateAnswerLED(answer) {
  const currentAnswerLED = document.getElementById(`a${answer + 1}LED`);

  allLockLEDs.forEach((led) => {
    led.classList.remove('is-off');
    led.classList.remove('is-idle');
  });

  currentAnswerLED.classList.add('is-idle');
}

/**
 * This function deactivates all answer-LEDs by setting them to the off state.
 * it also resets the {@link isSelected} - state to 'false' for the next quiz-card.
 */
function deactivateAnswerLED() {
  allLockLEDs.forEach((led) => {
    led.classList.remove('is-idle');
    led.classList.remove('is-wrong');
    led.classList.remove('is-correct');
    led.classList.add('is-off');
  });
  isSelected = false;
}

/**
 * Activates the one LED associated with the current question and removes idle status from all other progress LEDs.
 * It also adds a pusing-animation by adding the class _'pulsing'_ to visually indicate the current quiz-card and overall progress.
 * @param {number} currentIndex - The index of the current question.
 */
function activateCurrentLED(currentIndex) {
  const currentQuestion = quizData[currentIndex];
  const currentLED = document.getElementById(currentQuestion.questionLED);

  allProgressLEDs.forEach((led) => {
    led.classList.remove('is-off');
    led.classList.remove('is-idle');
    led.classList.remove('pulsating');
  });

  currentLED.classList.add('is-idle');
  currentLED.classList.add('pulsating');
}

/**
 * Based on the correctness of the choosen answer for the current question,
 * it applies a specific color to the corresponding progress-LED.
 */
function colourCurrentLED() {
  const currentQuestion = quizData[currentIndex];
  const isCorrect = currentQuestion.isCorrect;
  const currentLED = document.getElementById(currentQuestion.questionLED);

  if (isCorrect === true) {
    currentLED.classList.remove('is-idle');
    currentLED.classList.add('is-correct');
  } else {
    currentLED.classList.remove('is-idle');
    currentLED.classList.add('is-wrong');
  }
}
