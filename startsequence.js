// // LEDs
const allProgressLEDs = document.querySelectorAll('.progress-light');
const allLockLEDs = [
  document.getElementById('a1LED'),
  document.getElementById('a2LED'),
  document.getElementById('a3LED'),
  document.getElementById('a4LED'),
];

// Animation-Settings
const totalAnimationDuration = 5250;
const blinkCycles = 3;
const blinkDelay = 0;

function initializeLEDs() {
  const allProgressLEDs = document.querySelectorAll('.progress-light');
  const allLockLEDs = [
    document.getElementById('a1LED'),
    document.getElementById('a2LED'),
    document.getElementById('a3LED'),
    document.getElementById('a4LED'),
  ];

  allProgressLEDs.forEach((led) => {
    led.classList.toggle('is-off', true);
    led.classList.remove('is-idle', 'is-wrong', 'is-correct');
  });

  allLockLEDs.forEach((lockLED) => {
    lockLED.classList.toggle('is-off', true);
    lockLED.classList.remove('is-idle', 'is-wrong', 'is-correct');
  });
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
  }, 3500);
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
  if (controllIndex >= 1) {
    console.log('selectedAnswer:', answer);
    selectedAnswer = answer;
    isSelected = true;
    activateAnswerLED(answer);
  } else {
  }
}

function confirmAnswer(selectedAnswer) {
  if (controllIndex >= 1) {
    if (isSelected) {
      const currentQuestion = quizData[currentIndex]; // Aktuelle Frage aus quizData
      const correctAnswer = currentQuestion.right_answer; // Richtige Antwort-Index

      let isCorrect = false; // Variable, um zu speichern, ob die Frage richtig beantwortet wurde

      // Überprüfe, ob die ausgewählte Antwort mit der richtigen Antwort übereinstimmt
      if (selectedAnswer === correctAnswer) {
        isCorrect = true; // Wenn richtig, setze den Wert auf true
      } else {
        isCorrect = false;
      }
      turnLEDOn();
      // Speichere die Information, ob die Frage richtig oder falsch beantwortet wurde
      quizData[currentIndex].isCorrect = isCorrect;
      quizData[currentIndex].isDone = true; // Markiere die Frage als beantwortet
      colourCurrentLED();
    } else {
      blinkLEDs(); // Funktion, um die LEDs blinken zu lassen, wenn keine Antwort ausgewählt wurde
    }
  } else {
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
      led.classList.add('is-correct');
    }
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

  allLEDs.forEach((led) => {
    led.classList.remove('is-off');
    led.classList.remove('is-idle');
    led.classList.remove('pulsating');
  });

  const currentQuestion = quizData[currentIndex];
  const currentLED = document.getElementById(currentQuestion.questionLED);

  currentLED.classList.add('is-idle');
  currentLED.classList.add('pulsating');
}

function colourCurrentLED() {
  const currentQuestion = quizData[currentIndex];
  const isCorrect = currentQuestion.isCorrect;
  const currentLED = document.getElementById(currentQuestion.questionLED);

  if (isCorrect === true) {
    currentLED.classList.remove('is-idle', 'pulsating');
    currentLED.classList.add('is-correct', 'pulsating');
  } else {
    currentLED.classList.remove('is-idle', 'pulsating');
    currentLED.classList.add('is-wrong', 'pulsating');
  }
}

// function colourCurrentLED() {
//   const currentQuestion = quizData[currentIndex];
//   const isCorrect = currentQuestion.isCorrect;

//   const currentLED = document.getElementById(currentQuestion.questionLED);

//   currentLED.classList.remove('is-idle', 'is-wrong', 'is-correct', 'pulsating');

//   if (isCorrect) {
//     currentLED.classList.add('is-correct', 'pulsating');
//   } else {
//     currentLED.classList.add('is-wrong', 'pulsating');
//   }
// }
