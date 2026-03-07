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





// ====== GALERIA  ======
gsap.registerPlugin(Draggable);

const cards = gsap.utils.toArray(".cards li");
let active = 0;
const n = cards.length;

// responsywny STEP
let STEP = window.innerWidth < 600 ? 120 : 180;

const ROT = 10;
const SCALE = 0.085;
const DEPTH = 140; // mocniejsze wysunięcie środka

function updateCards() {
  cards.forEach((card, i) => {
    let offset = i - active;

    if (offset > n / 2) offset -= n;
    if (offset < -n / 2) offset += n;

    const abs = Math.abs(offset);

    gsap.to(card, {
      x: offset * STEP,
      rotateY: -offset * ROT,
      scale: Math.max(1 - abs * SCALE, 0.6),
      z: -(abs * DEPTH),
      opacity: abs === 0 ? 1 : Math.max(1 - abs * 0.15, 0.25),
      duration: 0.65,
      ease: "power2.out"
    });
  });
}

document.querySelector(".next").addEventListener("click", () => {
  active = (active + 1) % n;
  updateCards();
});

document.querySelector(".prev").addEventListener("click", () => {
  active = (active - 1 + n) % n;
  updateCards();
});

let startX = null;

Draggable.create(".cards", {
  type: "x",
  onPress() {
    startX = this.x;
  },
  onDrag() {
    const dx = this.x - startX;

    if (dx > 60) {
      active = (active - 1 + n) % n;
      updateCards();
      startX = this.x;
    }
    if (dx < -60) {
      active = (active + 1) % n;
      updateCards();
      startX = this.x;
    }
  },
  onRelease() {
    gsap.to(this.target, { x: 0, duration: 0.3 });
  }
});

updateCards();

window.addEventListener("resize", () => {
  STEP = window.innerWidth < 600 ? 120 : 180;
  updateCards();
});