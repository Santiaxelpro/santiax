const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const DOTS = 80;
const dots = [];
const DOT_RADIUS = 3;
const DOT_COLOR = "#fff";
const DOT_REPEL_DIST = 100;
const DOT_REPEL_FORCE = 0.13;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

for (let i = 0; i < DOTS; i++) {
  dots.push({
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    vx: randomBetween(-0.3, 0.3),
    vy: randomBetween(-0.3, 0.3)
  });
}

let mouse = { x: -1000, y: -1000 };

canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
canvas.addEventListener('mouseleave', () => {
  mouse.x = -1000;
  mouse.y = -1000;
});

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let dot of dots) {
    // Repel from mouse
    let dx = dot.x - mouse.x;
    let dy = dot.y - mouse.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < DOT_REPEL_DIST) {
      let angle = Math.atan2(dy, dx);
      let force = (DOT_REPEL_DIST - dist) * DOT_REPEL_FORCE;
      dot.vx += Math.cos(angle) * force;
      dot.vy += Math.sin(angle) * force;
    }

    // Move dot
    dot.x += dot.vx;
    dot.y += dot.vy;

    // Slow down velocity
    dot.vx *= 0.95;
    dot.vy *= 0.95;

    // Bounce on edges
    if (dot.x < DOT_RADIUS || dot.x > width - DOT_RADIUS) dot.vx *= -1;
    if (dot.y < DOT_RADIUS || dot.y > height - DOT_RADIUS) dot.vy *= -1;

    // Draw dot
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = DOT_COLOR;
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  requestAnimationFrame(animate);
}

animate();