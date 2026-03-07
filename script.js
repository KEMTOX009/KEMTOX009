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
const track2 = document.querySelector(".stack-track");
const cards = Array.from(track2.children);

let current = 0;

function updateStack() {
    cards.forEach((card, i) => {
        card.classList.remove("active", "left", "right");

        if (i === current) card.classList.add("active");
        else if (i === current - 1) card.classList.add("left");
        else if (i === current + 1) card.classList.add("right");
    });

    const offset = current * -300;
    track2.style.transform = `translateX(${offset}px)`;
}

let startX = 0;

track2.addEventListener("mousedown", e => startX = e.clientX);
track2.addEventListener("mouseup", e => {
    if (e.clientX < startX - 50) current++;
    if (e.clientX > startX + 50) current--;

    if (current < 0) current = 0;
    if (current > cards.length - 1) current = cards.length - 1;

    updateStack();
});

track2.addEventListener("touchstart", e => startX = e.touches[0].clientX);
track2.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;

    if (endX < startX - 50) current++;
    if (endX > startX + 50) current--;

    if (current < 0) current = 0;
    if (current > cards.length - 1) current = cards.length - 1;

    updateStack();
});

updateStack();
