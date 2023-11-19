welcomeScreen = [
  {
    greetingTxt: 'hello there!',
    ctaTxt: 'press **next** to start quizzing. good luck, pal!',
  },
];

quizData = [
  {
    questionLedID: 'q1LED',
    question: 'The Beatles on a usual tuesday. Which song do we "see" here?',
    answers: [
      'Now and Then',
      'Norwegian Wood',
      'Strawberry Fields',
      'Lovely Rita',
    ],
    rightOne: '2',
  },
];

// const cardText = quizData[0].question;

function togglePowerSwitch() {
  const powerSwitch = document.getElementById('power-switch');

  if (powerSwitch.classList.contains('power-off')) {
    powerSwitch.classList.remove('power-off');
    powerSwitch.classList.add('power-on');

    // Nach 0.5s die Positionsklasse ändern
    setTimeout(() => {
      powerSwitch.classList.remove('off-position');
      powerSwitch.classList.add('on-position');
      lightUpLEDs();
    }, 335);
    initializeLEDs();
    toggleSoundSwitch();
  } else {
    powerSwitch.classList.remove('power-on');
    powerSwitch.classList.add('power-off');

    // Nach 0.5s die Positionsklasse ändern
    setTimeout(() => {
      powerSwitch.classList.remove('on-position');
      powerSwitch.classList.add('off-position');
    }, 335);
    toggleSoundSwitch();
  }
}

// function toggleSoundSwitch() {
//   const soundSwitch = document.getElementById('sound-switch');

//   if (soundSwitch.classList.contains('sound-off')) {
//     soundSwitch.classList.remove('sound-off');
//     soundSwitch.classList.add('sound-on');

//     // Nach 0.5s die Positionsklasse ändern
//     setTimeout(() => {
//       soundSwitch.classList.remove('off-position');
//       soundSwitch.classList.add('on-position');
//     }, 335);
//   } else {
//     soundSwitch.classList.remove('sound-on');
//     soundSwitch.classList.add('sound-off');

//     // Nach 0.5s die Positionsklasse ändern
//     setTimeout(() => {
//       soundSwitch.classList.remove('on-position');
//       soundSwitch.classList.add('off-position');
//     }, 335);
//   }
// }

let audio; // Außerhalb der Funktion, um global darauf zugreifen zu können
let isSoundOn = false;

function playSound() {
  if (!isSoundOn) {
    if (!audio) {
      audio = new Audio('audio/bg_loop.mp3'); // Passe die URL an deine Audio-Datei an
      audio.loop = true; // Um die MP3-Datei in einer Schleife abzuspielen
    }
    audio.play();
    isSoundOn = true;
  }
  console.log('Sound on!');
}

function stopSound() {
  if (isSoundOn && audio) {
    audio.pause();
    audio.currentTime = 0; // Setze die Wiedergabe auf den Anfang zurück
    isSoundOn = false;
  }
}

function toggleSoundSwitch() {
  const soundSwitch = document.getElementById('sound-switch');

  if (soundSwitch.classList.contains('sound-off')) {
    // Führe Aktionen aus, wenn der Sound ausgeschaltet ist
    soundSwitch.classList.remove('sound-off');
    soundSwitch.classList.add('sound-on');

    // Nach 0.5s die Positionsklasse ändern
    setTimeout(() => {
      soundSwitch.classList.remove('off-position');
      soundSwitch.classList.add('on-position');
    }, 335);

    // Spiele den Sound ab
    playSound();
  } else {
    // Führe Aktionen aus, wenn der Sound eingeschaltet ist
    soundSwitch.classList.remove('sound-on');
    soundSwitch.classList.add('sound-off');

    // Nach 0.5s die Positionsklasse ändern
    setTimeout(() => {
      soundSwitch.classList.remove('on-position');
      soundSwitch.classList.add('off-position');

      // Stoppe den Sound
      stopSound();
    }, 335);
  }
}
