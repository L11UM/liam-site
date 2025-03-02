const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const orb = document.getElementById('orb');
const menu = document.getElementById('menu');
const audio = document.getElementById('bg-sound');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawStars(); // Redraw stars on resize
});

// Handle window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawStars(); // Redraw stars on resize
});

// Starry background
function drawStars() {
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 100; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    ctx.fillStyle = `rgba(217, 217, 230, ${Math.random() * 0.5 + 0.1})`;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Cursor trail
let trail = [];
document.addEventListener('mousemove', (e) => {
  trail.push({ x: e.clientX, y: e.clientY, life: 1 });
  if (trail.length > 20) trail.shift();
  
  drawStars();
  trail.forEach((point, i) => {
    point.life -= 0.05;
    if (point.life > 0) {
      ctx.fillStyle = `rgba(177, 156, 217, ${point.life})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  });
});

// Orb click to show menu
orb.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  audio.play();
});

// Start
drawStars();
audio.volume = 0.2; // Keep it subtle
