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
  const singleLEDOnDuration = 150;

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
  }, 4500);
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

// function activateCurrentLED(index) {
//   const currentQuestion = quizData[index];
//   const questionLED = currentQuestion.questionLED;

//   // Deaktiviere alle LEDs zuerst
//   const allLEDs = document.querySelectorAll('.progress-light');
//   allLEDs.forEach((led) => {
//     led.classList.remove('pulsating'); // Hier die Klasse für das Pulsieren entfernen
//   });

//   // Aktiviere die LED für die aktuelle Frage
//   const currentLED = document.getElementById(questionLED);
//   if (currentLED) {
//     currentLED.classList.add('pulsating'); // Hier die Klasse für das Pulsieren hinzufügen
//   }
// }

function activateCurrentLED(index) {
  const allLEDs = document.querySelectorAll('.progress-light');

  allLEDs.forEach((led) => {
    led.classList.remove('is-off');
    led.classList.remove('is-on');
    led.classList.remove('is-idle');
    led.classList.remove('pulsating');
  });

  const currentLED = document.getElementById(`q${index + 1}LED`);
  currentLED.classList.add('is-idle');
  currentLED.classList.add('pulsating');
}

//
let selectedAnswer;
//
function selectAnswer(answer) {
  console.log('selectedAnswer:', answer);
  selectedAnswer = answer;

  activateAnswerLED(answer);
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
}

function confirmAnswer(selectedAnswer) {
  const currentQuestion = quizData[currentIndex - 1]; // Aktuelle Frage aus quizData
  const correctAnswer = currentQuestion.right_answer; // Richtige Antwort-Index

  let isCorrect = false; // Variable, um zu speichern, ob die Frage richtig beantwortet wurde

  // Überprüfe, ob die ausgewählte Antwort mit der richtigen Antwort übereinstimmt
  if (selectedAnswer === correctAnswer) {
    isCorrect = true; // Wenn richtig, setze den Wert auf true
    turnLEDGreen();
    turnLEDRed();
  } else {
    turnLEDGreen();
    turnLEDRed();
  }

  // Speichere die Information, ob die Frage richtig oder falsch beantwortet wurde
  quizData[currentIndex - 1].isCorrect = isCorrect;
}

function turnLEDRed() {
  allLockLEDs.forEach((led, index) => {
    const currentQuestion = quizData[currentIndex - 1];
    const correctAnswer = currentQuestion.right_answer;

    if (index !== correctAnswer) {
      led.classList.remove('is-idle');
      led.classList.remove('is-off');
      led.classList.add('is-wrong');
    }
  });
}

function turnLEDGreen() {
  const currentQuestion = quizData[currentIndex - 1];
  const correctAnswer = currentQuestion.right_answer;

  const correctLED = document.getElementById(`a${correctAnswer + 1}LED`);
  correctLED.classList.remove('is-wrong');
  correctLED.classList.add('is-correct');
}
// function to show the stored isCorrect - value within the progress-panel and leave it in this color
