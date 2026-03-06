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
setInterval(spawnShape, Math.random() * 300 + 200);

const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.getElementById("side-menu");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    sideMenu.classList.toggle("open");
});

