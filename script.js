// typewriter-effect

quizData = [
  {
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

const cardText = quizData[0].question;

function togglePowerSwitch() {
  const powerSwitch = document.getElementById('power-switch');

  if (powerSwitch.classList.contains('power-off')) {
    powerSwitch.classList.remove('power-off');
    powerSwitch.classList.add('power-on');

    // Nach 0.5s die Positionsklasse ändern
    setTimeout(() => {
      powerSwitch.classList.remove('off-position');
      powerSwitch.classList.add('on-position');
    }, 335);
  } else {
    powerSwitch.classList.remove('power-on');
    powerSwitch.classList.add('power-off');

    // Nach 0.5s die Positionsklasse ändern
    setTimeout(() => {
      powerSwitch.classList.remove('on-position');
      powerSwitch.classList.add('off-position');
    }, 335);
  }
}

function toggleSoundSwitch() {
  const soundSwitch = document.getElementById('sound-switch');

  if (soundSwitch.classList.contains('sound-off')) {
    soundSwitch.classList.remove('sound-off');
    soundSwitch.classList.add('sound-on');

    // Nach 0.5s die Positionsklasse ändern
    setTimeout(() => {
      soundSwitch.classList.remove('off-position');
      soundSwitch.classList.add('on-position');
    }, 335);
  } else {
    soundSwitch.classList.remove('sound-on');
    soundSwitch.classList.add('sound-off');

    // Nach 0.5s die Positionsklasse ändern
    setTimeout(() => {
      soundSwitch.classList.remove('on-position');
      soundSwitch.classList.add('off-position');
    }, 335);
  }
}
