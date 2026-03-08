// Informacja w konsoli
console.log("Strona KEMTOX została załadowana!");

// Fade-in sekcji po intro
window.addEventListener("load", () => {
    const elements = document.querySelectorAll(".fade-in");

    elements.forEach((el, i) => {
        el.style.animationDelay = `${3 + i * 0.25}s`;
    });
});

// ====== ANIMACJA TŁA (NEONOWE KSZTAŁTY) ======

function spawnShape() {
    const container = document.getElementById("shape-container");
    if (!container) return;

    const shape = document.createElement("div");
    shape.classList.add("shape");

    // losowy rozmiar
    const size = Math.random() * 12 + 6;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;

    // losowa pozycja
    shape.style.left = `${Math.random() * 100}%`;
    shape.style.top = `${Math.random() * 100}%`;

    // losowy kształt
    const type = Math.floor(Math.random() * 3);
    if (type === 1) shape.style.borderRadius = "0";
    if (type === 2) shape.style.borderRadius = "20%";

    container.appendChild(shape);

    // usuń po animacji
    setTimeout(() => shape.remove(), 2600);
}

// generuj kształty co 200–500 ms
function spawnLoop() {
    spawnShape();
    setTimeout(spawnLoop, Math.random() * 80 + 40);
}

spawnLoop();

// ====== NOWE MENU (ANIMACJA FALI) ======

const centerBtn = document.getElementById("center-btn");
const menuIcons = document.querySelector(".menu-icons");

if (centerBtn && menuIcons) {
    centerBtn.addEventListener("click", () => {
        menuIcons.classList.toggle("show");
    });
}

// ====== POKAZANIE MENU PO INTRO ======

setTimeout(() => {
    const menu = document.getElementById("center-menu");
    if (!menu) return;

    menu.style.opacity = "1";
    menu.style.pointerEvents = "auto";
}, 3200);

// ====== GALERIA ======
gsap.registerPlugin(Draggable);

const container = document.querySelector(".cards");
const cards = () => gsap.utils.toArray(".cards li");

let STEP = window.innerWidth < 600 ? 120 : 180;
const ROT = 10;
const SCALE = 0.085;
const DEPTH = 140;

function updateCards() {
  const list = cards();
  const center = Math.floor(list.length / 2);

  list.forEach((card, i) => {
    const offset = i - center;
    const abs = Math.abs(offset);

    card.classList.toggle("active", abs === 0);

    gsap.to(card, {
      x: offset * STEP,
      rotateY: -offset * ROT,
      scale: Math.max(1 - abs * SCALE, 0.6),
      z: -(abs * DEPTH),
      opacity: abs === 0 ? 1 : Math.max(1 - abs * 0.15, 0.25),
      duration: 0.55,
      ease: "power3.out"
    });
  });
}

function next() {
  const list = cards();
  container.appendChild(list[0]);
  updateCards();
}

function prev() {
  const list = cards();
  container.insertBefore(list[list.length - 1], list[0]);
  updateCards();
}

function goTo(index) {
  const list = cards();
  const center = Math.floor(list.length / 2);

  while (index !== center) {
    if (index > center) next();
    else prev();
    index = cards().indexOf(cards()[center]);
  }
}

document.querySelector(".next").addEventListener("click", next);
document.querySelector(".prev").addEventListener("click", prev);

let startX = null;

Draggable.create(".cards", {
  type: "x",
  onPress() {
    startX = this.x;
  },
  onDrag() {
    const dx = this.x - startX;

    if (dx > 60) {
      prev();
      startX = this.x;
    }
    if (dx < -60) {
      next();
      startX = this.x;
    }
  },
  onRelease() {
    gsap.to(this.target, { x: 0, duration: 0.3 });
  }
});

cards().forEach((card, i) => {
  card.addEventListener("click", () => {
    const list = cards();
    const index = list.indexOf(card);
    goTo(index);
  });
});

updateCards();

window.addEventListener("resize", () => {
  STEP = window.innerWidth < 600 ? 120 : 180;
  updateCards();
});
