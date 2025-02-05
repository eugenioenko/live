// Import Two.js from a CDN
import Two from "https://cdn.skypack.dev/two.js@latest";

const neonColors = [
  "#39FF14", // Neon Green
  "#FF073A", // Neon Red
  "#FDFD96", // Neon Yellow
  "#FE59C2", // Neon Pink
  "#1B03A3", // Neon Blue
  "#0FFF95", // Neon Mint
  "#FF6700", // Neon Orange
  "#F806CC", // Neon Purple
  "#3AFEFF", // Neon Cyan
  "#FFD700", // Neon Gold
];

const two = new Two({
  type: Two.Types.canvas,
  fullscreen: true,
  autostart: true,
}).appendTo(document.body);

two.renderer.domElement.style.background = "#000";

const gravity = new Two.Vector(0, 0.1);
const styles = {
  family: "proxima-nova, sans-serif",
  size: 48,
  leading: 50,
  weight: 900,
};
const maxUntilFall = 7;
let current;
let characters = [];
let isFalling = false;
let typewriter = 100;

window.addEventListener("touchstart", (e) => {
  const touches = e.touches?.[0] ||
    e.changedTouches?.[0] || { clientX: 0, clientY: 0 };

  const letter = getRandomCapitalLetter();
  playLetterSound(letter);
  add(letter, touches.clientX, touches.clientY);
});

window.addEventListener("touchmove", (e) => {
  if (!current) {
    return;
  }
  const touches = e.touches?.[0] ||
    e.changedTouches?.[0] || { clientX: 0, clientY: 0 };

  current.translation.x = touches.clientX;
  current.translation.y = touches.clientY;
});

window.addEventListener("touchend", () => {
  current = undefined;
  if (characters.length > maxUntilFall) {
    isFalling = true;
  }
});

window.addEventListener("keypress", (e) => {
  const letter = e.key.toLocaleUpperCase();
  playLetterSound(letter);
  add(letter, typewriter, two.height / 3);
  typewriter += 130;
  if (typewriter > two.width) {
    typewriter = 100;
    isFalling = true;
  }
});

two.bind("update", update);

function update() {
  if (!isFalling) {
    return;
  }
  for (let i = 0; i < characters.length; i++) {
    const text = characters[i];

    text.translation.addSelf(text.velocity);
    text.velocity.add(gravity);

    // remove text when velocity is 0 or outside screen
    if (text.translation.y > two.height) {
      two.scene.remove(text);
      two.release(text);
      characters = characters.filter((char) => char !== text);
      if (!characters.length) {
        isFalling = false;
      }
    }
  }
}

function getRandomCapitalLetter() {
  const charCode = Math.floor(Math.random() * 26) + 65;
  return String.fromCharCode(charCode);
}

function getRandomNeonColor() {
  const randomIndex = Math.floor(Math.random() * neonColors.length);
  return neonColors[randomIndex];
}

function add(msg, x, y) {
  const text = two.makeText(msg, x, y, styles);
  text.size *= 3;
  text.fill = getRandomNeonColor();
  text.velocity = new Two.Vector(0, 0);
  current = text;
  characters.push(text);
}

function playLetterSound(letter) {
  // Find the preloaded audio element by ID
  const audio = document.getElementById(letter);
  if (!audio) {
    return;
  }

  // Play the audio
  audio.play().catch((error) => {
    console.error(`Error playing sound for letter "${letter}":`, error);
  });
}
