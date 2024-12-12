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
const characters = [];

const styles = {
  family: "proxima-nova, sans-serif",
  size: 72,
  leading: 50,
  weight: 900,
};

// Add events to the page
window.addEventListener(
  "keydown",
  (e) => {
    add(String.fromCharCode(e.which).toUpperCase());
  },
  false
);

window.addEventListener(
  "click",
  () => {
    add(getRandomCapitalLetter());
  },
  false
);

two.bind("update", update);

const gravity = new Two.Vector(0, 0.1);
function update() {
  for (let i = 0; i < characters.length; i++) {
    const text = characters[i];

    text.translation.addSelf(text.velocity);
    text.rotation += text.velocity.r;
    text.velocity.add(gravity);

    // remove text when velocity is 0 or outside screen
    if (text.velocity.y > 0 && text.translation.y > two.height) {
      two.scene.remove(text);
      two.release(text);
      characters.splice(i, 1);
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

function add(msg) {
  const x = (Math.random() * two.width) / 2 + two.width / 4;
  const y = two.height * 1.25;

  const text = two.makeText(msg, x, y, styles);
  text.size *= 4;
  text.fill = getRandomNeonColor();

  text.velocity = new Two.Vector();
  text.velocity.x = 4 * Math.random() - 2;
  text.velocity.y = -10 - 5 * Math.random();
  text.velocity.r = 0;

  characters.push(text);
}
