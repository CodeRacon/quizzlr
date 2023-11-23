const texts = [
  'Erster Text, der animiert erscheinen soll.',
  'Zweiter Text, der animiert erscheinen soll.',
  'Dritter Text, der animiert erscheinen soll.',
];

function typeWriter(text, elementId, speed) {
  let i = 0;
  const targetElement = document.getElementById(elementId);
  if (!targetElement) return;

  function type() {
    if (i < text.length) {
      targetElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Schleife durchläuft die Texte und ruft typeWriter für jedes Element auf
for (let i = 0; i < texts.length; i++) {
  const speed = 100; // Geschwindigkeit für alle Texte (kann angepasst werden)
  typeWriter(texts[i], `typewriter-text-${i + 1}`, speed);
}
