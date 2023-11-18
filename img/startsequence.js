// LEDs
const allProgressLEDs = document.querySelectorAll('.process-light');
const allLockLEDs = [
  document.getElementById('a1LED'),
  document.getElementById('a2LED'),
  document.getElementById('a3LED'),
  document.getElementById('a4LED'),
];

// Animation-Settings
const totalAnimationDuration = 5250;
const singleLEDOnDuration = 150;
const blinkCycles = 3;
const blinkDelay = 750;
