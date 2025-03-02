const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const orb = document.getElementById('orb');
const menu = document.getElementById('menu');
const manaDisplay = document.getElementById('mana');
let mana = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawStars();
});

function drawStars() {
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = `rgba(217, 217, 230, ${Math.random() * 0.5 + 0.1})`;
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

let spellTrail = [];
document.addEventListener('mousemove', (e) => {
  spellTrail.push({ x: e.clientX, y: e.clientY, life: 1 });
  if (spellTrail.length > 15) spellTrail.shift();
  drawStars();
  drawRunes();
  spellTrail.forEach(point => {
    point.life -= 0.1;
    if (point.life > 0) {
      ctx.strokeStyle = `rgba(155, 89, 182, ${point.life})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(point.x - 5, point.y - 5);
      ctx.lineTo(point.x + 5, point.y + 5);
      ctx.moveTo(point.x + 5, point.y - 5);
      ctx.lineTo(point.x - 5, point.y + 5);
      ctx.stroke();
    }
  });
});

let runes = [];
const runeShapes = [
  [[0, -10], [5, 0], [0, 10], [-5, 0], [0, -10]], // Diamond
  [[-5, -10], [5, -10], [0, 10], [-5, -10]], // Triangle
  [[-8, 0], [8, 0], [0, 0], [0, -10], [0, 10]] // Cross
];

function spawnRune() {
  runes.push({
    x: Math.random() * (canvas.width - 80) + 40,
    y: Math.random() * (canvas.height - 80) + 40,
    shape: runeShapes[Math.floor(Math.random() * runeShapes.length)],
    life: 6,
    angle: 0
  });
}

function drawRunes() {
  runes.forEach((rune, index) => {
    rune.life -= 0.016;
    rune.angle += 0.02;
    if (rune.life <= 0) {
      runes.splice(index, 1);
      return;
    }
    ctx.save();
    ctx.translate(rune.x, rune.y);
    ctx.rotate(rune.angle);
    ctx.strokeStyle = `rgba(155, 89, 182, ${rune.life / 6})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    rune.shape.forEach((point, i) => {
      i === 0 ? ctx.moveTo(point[0], point[1]) : ctx.lineTo(point[0], point[1]);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  });
}

canvas.addEventListener('click', (e) => {
  runes.forEach((rune, index) => {
    const dist = Math.sqrt((e.clientX - rune.x) ** 2 + (e.clientY - rune.y) ** 2);
    if (dist < 20) {
      runes.splice(index, 1);
      mana += 5;
      manaDisplay.textContent = `Mana: ${mana}`;
    }
  });
});

orb.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  if (runes.length === 0) spawnRune();
});

setInterval(() => {
  if (Math.random() < 0.15) spawnRune();
}, 500);

drawStars();
spawnRune();
