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

// <button onclick="przyklad()">Kliknij</button>

