// Skrypt startowy
console.log("Strona KEMTOX została załadowana!");

// Przykład funkcji
function przyklad() {
    alert("Działa!");
}

window.addEventListener("load", () => {
    const elements = document.querySelectorAll(".fade-in");

    elements.forEach((el, i) => {
        el.style.animationDelay = `${3 + i * 0.25}s`;
    });
});

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
    if (type === 1) shape.style.borderRadius = "0"; // kwadrat
    if (type === 2) shape.style.borderRadius = "20%"; // prostokąt

    container.appendChild(shape);

    // usuń po animacji
    setTimeout(() => shape.remove(), 2600);
}

// generuj kształty co 200–500 ms
function spawnLoop() {
    spawnShape();
    setTimeout(spawnLoop, Math.random() * 300 + 200);
}

spawnLoop();

const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.getElementById("side-menu");

if (menuBtn && sideMenu) {
    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("open");
        sideMenu.classList.toggle("open");
    });
}

const centerBtn = document.getElementById("center-btn");
const menuIcons = document.querySelector(".menu-icons");

if (centerBtn && menuIcons) {
    centerBtn.addEventListener("click", () => {
        menuIcons.classList.toggle("show");
    });
}

setTimeout(() => {
    const menu = document.getElementById("center-menu");
    if (!menu) return;

    menu.style.opacity = "1";
    menu.style.pointerEvents = "auto";
}, 3200); // intro trwa 2.8s + fade

const centerMenu = document.getElementById("center-menu");
if (centerMenu) {
    centerMenu.addEventListener("click", (event) => {
        if (event.target !== centerMenu) return;

        centerMenu.style.opacity = "0";
        centerMenu.style.pointerEvents = "none";
    });
}
