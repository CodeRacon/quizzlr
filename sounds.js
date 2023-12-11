/** shows, if background-sound is on (playing) or not  */
let isSoundOn = false;
/** shows, if power is on or not  */
let isPowerOn = false;
let audio;

const nextButton = document.getElementById('next-btn');
const confirmButton = document.getElementById('confirm-btn');

/** Array representing the 4 numbered buttons to choose the corresponding answer. */
const allAnswerButtons = [
  document.getElementById('a1Switch'),
  document.getElementById('a2Switch'),
  document.getElementById('a3Switch'),
  document.getElementById('a4Switch'),
];

/** Toggles the power switch by changing its state between on and off. */
function togglePowerSwitch() {
  const powerSwitch = document.getElementById('power-switch');
  const soundSwitch = document.getElementById('sound-switch');
  controllIndex = 0;
  if (powerSwitch.classList.contains('power-off')) {
    switchPowerOn(powerSwitch, soundSwitch);
  } else {
    switchPowerOff(powerSwitch, soundSwitch);
  }
}

/**
 * - Changes the power switch state to 'on'
 * - Runs the switch-animation
 * - Runs the LED-Start-Animation by calling {@link lightUpLEDs}
 * - Runs {@link playPowerOnSound}
 * @param {HTMLElement} powerSwitch - The HTML element representing the power switch.
 */
function switchPowerOn(powerSwitch) {
  powerSwitch.classList.remove('power-off');
  powerSwitch.classList.add('power-on');
  playPowerOnSound();

  setTimeout(() => {
    powerSwitch.classList.remove('off-position');
    powerSwitch.classList.add('on-position');
    lightUpLEDs();
  }, 335);
  initializeLEDs();
  isPowerOn = true;
}

/**
 * - Changes the power switch AND the sound state to 'off'
 * - Runs the switch-animation
 * - turns all LEDs off by calling {@link init}
 * - Runs {@link playPowerOffSound}
 * @param {HTMLElement} powerSwitch - The HTML element representing the power switch.
 * @param {HTMLElement} soundSwitch - The HTML element representing the sound switch.
 */
function switchPowerOff(powerSwitch, soundSwitch) {
  powerSwitch.classList.remove('power-on');
  powerSwitch.classList.add('power-off');
  playPowerOffSound();
  soundSwitch.classList.remove('sound-on');
  soundSwitch.classList.add('sound-off');

  setTimeout(() => {
    powerSwitch.classList.remove('on-position');
    powerSwitch.classList.add('off-position');
    soundSwitch.classList.remove('on-position');
    soundSwitch.classList.add('off-position');
    stopBgSound();
    isPowerOn = false;
    init();
  }, 335);
}

/**
 * Toggles the sound switch by changing its state between on and off.
 * @param {HTMLElement} powerSwitch - The HTML element representing the power switch.
 * @param {HTMLElement} soundSwitch - The HTML element representing the sound switch.
 */
function toggleSoundSwitch() {
  const soundSwitch = document.getElementById('sound-switch');
  const powerSwitch = document.getElementById('power-switch');

  if (powerSwitch.classList.contains('power-on')) {
    if (soundSwitch.classList.contains('sound-off')) {
      switchSoundOn(soundSwitch);
    } else {
      switchSoundOff(soundSwitch);
    }
  }
}

/**
 * - Changes the sound switch state to 'on'
 * - Runs the switch-animation
 * - Runs {@link playBgSound}
 * @param {HTMLElement} soundSwitch - The HTML element representing the sound switch.
 */
function switchSoundOn(soundSwitch) {
  soundSwitch.classList.remove('sound-off');
  soundSwitch.classList.add('sound-on');

  setTimeout(() => {
    soundSwitch.classList.remove('off-position');
    soundSwitch.classList.add('on-position');
  }, 335);

  playBgSound();
}

/**
 * - Changes the sound switch state to 'off'
 * - Runs the switch-animation
 * - Runs {@link stopBgSound}
 * @param {HTMLElement} soundSwitch - The HTML element representing the sound switch.
 */
function switchSoundOff(soundSwitch) {
  soundSwitch.classList.remove('sound-on');
  soundSwitch.classList.add('sound-off');

  setTimeout(() => {
    soundSwitch.classList.remove('on-position');
    soundSwitch.classList.add('off-position');

    stopBgSound();
  }, 335);
}

/* set up EventListeners for certain buttons to allways make a "clicky" feedback-sound */

nextButton.addEventListener('click', playButtonSound);
confirmButton.addEventListener('click', playButtonSound);

allAnswerButtons.forEach((button) => {
  button.addEventListener('click', playAnswerButtonSound);
});

/* The following functions are playing (in one case stopping) audio files */

function playBgSound() {
  if (isPowerOn && !isSoundOn) {
    if (!audio) {
      audio = new Audio('audio/bg_loop.mp3');
      audio.loop = true;
    }
    audio.volume = 0.125;
    audio.play();
    isSoundOn = true;
  }
}

function stopBgSound() {
  if (isSoundOn && audio) {
    audio.pause();
    audio.currentTime = 0;
    isSoundOn = false;
  }
}
function playPowerOnSound() {
  let powerOnSound = new Audio('audio/thock-and-beep.mp3');
  powerOnSound.play();
}

function playPowerOffSound() {
  let powerOffSound = new Audio('audio/noisy-switch.mp3');
  powerOffSound.play();
}

function playBeepSound() {
  let beepSound = new Audio('audio/beep-beep.mp3');
  beepSound.volume = 0.25;
  beepSound.play();
}

function playOneBeepSound() {
  let onebeepSound = new Audio('audio/beep.mp3');
  onebeepSound.volume = 0.25;
  onebeepSound.play();
}

function playButtonSound() {
  let buttonSound = new Audio('audio/mech-keyboard.mp3');
  buttonSound.volume = 0.2;
  buttonSound.play();
}

function playAnswerButtonSound() {
  let answerBtnSound = new Audio('audio/light-switch.mp3');
  answerBtnSound.volume = 0.35;
  answerBtnSound.play();
}

function playSuccessSound() {
  let successSound = new Audio('audio/correct.mp3');
  successSound.volume = 1;
  successSound.play();
}

function playFailSound() {
  let failSound = new Audio('audio/fail.mp3');
  failSound.volume = 0.125;
  failSound.play();
}

function playEndSound() {
  let endSound = new Audio('audio/end-theme.mp3');
  endSound.volume = 0.5;
  endSound.play();
}
