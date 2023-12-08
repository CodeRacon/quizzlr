// // LEDs
const allProgressLEDs = document.querySelectorAll('.progress-light');
const allLockLEDs = [
  document.getElementById('a1LED'),
  document.getElementById('a2LED'),
  document.getElementById('a3LED'),
  document.getElementById('a4LED'),
];

function initializeLEDs() {
  const allProgressLEDs = document.querySelectorAll('.progress-light');
  const allLockLEDs = [
    document.getElementById('a1LED'),
    document.getElementById('a2LED'),
    document.getElementById('a3LED'),
    document.getElementById('a4LED'),
  ];
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

function lightUpLEDs() {
  let delay = 0;
  let completedRow = 0; // Variable zur Verfolgung der abgeschlossenen Reihen
  const singleLEDOnDuration = 100;

  allProgressLEDs.forEach((LED, index) => {
    setTimeout(() => {
      LED.classList.add('is-idle'); // Einschalten der LED

      // Wenn eine vollständige Reihe aufleuchtet, aktiviere die entsprechende Lock-LED
      if ((index + 1) % 5 === 0) {
        completedRow++;
        allLockLEDs[completedRow - 1].classList.add('is-idle');
        playOneBeepSound();
      }

      // Wenn alle Reihen komplett sind, starte den Blink-Teil der Animation
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

function blinkLEDs() {
  const lockLEDs = document.querySelectorAll('.lock-light');
  const blinkDuration = 175;
  const blinkCount = 1;

  function lockBlinkCycle(color, delay) {
    setTimeout(() => {
      lockLEDs.forEach((LED) => {
        LED.classList.remove('is-idle', 'is-wrong', 'is-correct', 'is-off');
        LED.classList.add(color);
      });
    }, delay);
  }

  for (let i = 0; i < blinkCount; i++) {
    lockBlinkCycle('is-idle', blinkDuration * i); // Gelb
    lockBlinkCycle('is-off', blinkDuration * (i + 1)); // Aus
    lockBlinkCycle('is-idle', blinkDuration * (i + 2)); // Gelb
    lockBlinkCycle('is-off', blinkDuration * (i + 3)); // Aus
    lockBlinkCycle('is-idle', blinkDuration * (i + 4)); // Gelb
    lockBlinkCycle('is-off', blinkDuration * (i + 5)); // Aus
    lockBlinkCycle('is-idle', blinkDuration * (i + 6)); // Gelb

    if (i === blinkCount - 1) {
      setTimeout(() => {
        initializeLEDs();
      }, blinkDuration * (i + 7));
    }
  }
}

//
let selectedAnswer;
let isSelected = false;
//
function selectAnswer(answer) {
  playAnswerButtonSound();
  if (controllIndex >= 1) {
    selectedAnswer = answer;
    isSelected = true;
    activateAnswerLED(answer);
  } else {
  }
}

let isAnswerConfirmed = false;

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

        currentQuestion.isAnswerConfirmed = true; // Setze den Bestätigungsstatus auf true
      } else {
        playBeepSound();
        blinkLEDs();
      }
    } else {
      // Behandeln des Falls, wenn die Antwort bereits bestätigt wurde
    }
  } else {
    // Behandeln des Falls, wenn der Index nicht erfüllt ist
  }
}

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

function turnLockLEDsOff() {
  allLockLEDs.forEach((lockLED) => {
    lockLED.classList.toggle('is-off', true);
    lockLED.classList.remove('is-idle', 'is-wrong', 'is-correct');
  });
}

function activateAnswerLED(answer) {
  const currentAnswerLED = document.getElementById(`a${answer + 1}LED`);

  allLockLEDs.forEach((led) => {
    led.classList.remove('is-off');
    led.classList.remove('is-idle');
  });

  currentAnswerLED.classList.add('is-idle');
}

function deactivateAnswerLED() {
  allLockLEDs.forEach((led) => {
    led.classList.remove('is-idle');
    led.classList.remove('is-wrong');
    led.classList.remove('is-correct');
    led.classList.add('is-off');
  });
  isSelected = false;
}

function activateCurrentLED(currentIndex) {
  const allLEDs = document.querySelectorAll('.progress-light');
  const currentQuestion = quizData[currentIndex];
  const currentLED = document.getElementById(currentQuestion.questionLED);

  allLEDs.forEach((led) => {
    led.classList.remove('is-off');
    led.classList.remove('is-idle');
    led.classList.remove('pulsating');
  });

  currentLED.classList.add('is-idle');
  currentLED.classList.add('pulsating');
}

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
