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
