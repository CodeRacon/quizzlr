let isSoundOn = false;
let isPowerOn = false;
let audio;

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

function switchSoundOn(soundSwitch) {
  soundSwitch.classList.remove('sound-off');
  soundSwitch.classList.add('sound-on');

  setTimeout(() => {
    soundSwitch.classList.remove('off-position');
    soundSwitch.classList.add('on-position');
  }, 335);

  playBgSound();
}

function switchSoundOff(soundSwitch) {
  soundSwitch.classList.remove('sound-on');
  soundSwitch.classList.add('sound-off');

  setTimeout(() => {
    soundSwitch.classList.remove('on-position');
    soundSwitch.classList.add('off-position');

    stopBgSound();
  }, 335);
}

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

function playBgSound() {
  if (isPowerOn && !isSoundOn) {
    if (!audio) {
      audio = new Audio('audio/bg_loop.mp3'); // Passe die URL an deine Audio-Datei an
      audio.loop = true; // Um die MP3-Datei in einer Schleife abzuspielen
    }
    audio.volume = 0.2; // Setze die Lautstärke auf 0.5
    audio.play();
    isSoundOn = true;
  }
}

function stopBgSound() {
  if (isSoundOn && audio) {
    audio.pause();
    audio.currentTime = 0; // Setze die Wiedergabe auf den Anfang zurück
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

const nextButton = document.getElementById('next-btn');
const confirmButton = document.getElementById('confirm-btn');

nextButton.addEventListener('click', playButtonSound);
confirmButton.addEventListener('click', playButtonSound);

const allAnswerButtons = [
  document.getElementById('a1Switch'),
  document.getElementById('a2Switch'),
  document.getElementById('a3Switch'),
  document.getElementById('a4Switch'),
];

allAnswerButtons.forEach((button) => {
  button.addEventListener('click', playAnswerButtonSound);
});
