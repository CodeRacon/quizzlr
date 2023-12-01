let audio; // Außerhalb der Funktion, um global darauf zugreifen zu können
let isSoundOn = false;
let isPowerOn = false;

function playBgSound() {
  if (isPowerOn && !isSoundOn) {
    if (!audio) {
      audio = new Audio('audio/bg_sound.wav'); // Passe die URL an deine Audio-Datei an
      audio.loop = true; // Um die MP3-Datei in einer Schleife abzuspielen
    }
    audio.play();
    isSoundOn = true;
    console.log('Sound on!');
  }
}

function stopBgSound() {
  if (isSoundOn && audio) {
    audio.pause();
    audio.currentTime = 0; // Setze die Wiedergabe auf den Anfang zurück
    isSoundOn = false;
    console.log('Sound off!');
  }
}

function toggleSoundSwitch() {
  const soundSwitch = document.getElementById('sound-switch');
  const powerSwitch = document.getElementById('power-switch');

  if (powerSwitch.classList.contains('power-on')) {
    if (soundSwitch.classList.contains('sound-off')) {
      soundSwitch.classList.remove('sound-off');
      soundSwitch.classList.add('sound-on');

      setTimeout(() => {
        soundSwitch.classList.remove('off-position');
        soundSwitch.classList.add('on-position');
      }, 335);

      playBgSound();
    } else {
      soundSwitch.classList.remove('sound-on');
      soundSwitch.classList.add('sound-off');

      setTimeout(() => {
        soundSwitch.classList.remove('on-position');
        soundSwitch.classList.add('off-position');

        stopBgSound();
      }, 335);
    }
  }
}

function togglePowerSwitch() {
  const powerSwitch = document.getElementById('power-switch');
  const soundSwitch = document.getElementById('sound-switch');
  controllIndex = 0;
  if (powerSwitch.classList.contains('power-off')) {
    powerSwitch.classList.remove('power-off');
    powerSwitch.classList.add('power-on');

    setTimeout(() => {
      powerSwitch.classList.remove('off-position');
      powerSwitch.classList.add('on-position');
      lightUpLEDs();
    }, 335);
    initializeLEDs();
    isPowerOn = true;
  } else {
    powerSwitch.classList.remove('power-on');
    powerSwitch.classList.add('power-off');

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
}
