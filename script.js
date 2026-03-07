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
gsap.registerPlugin(ScrollTrigger, Draggable);

const spacing = 0.1;
const cards = gsap.utils.toArray(".cards li");
let iteration = 0;

const seamlessLoop = buildSeamlessLoop(cards, spacing);

const scrub = gsap.to(seamlessLoop, {
    totalTime: 0,
    duration: 0.5,
    ease: "power3",
    paused: true
});

const trigger = ScrollTrigger.create({
    start: 0,
    end: "+=3000",
    pin: ".gallery",
    onUpdate(self) {
        if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
            wrapForward(self);
        } else if (self.progress < 1e-5 && self.direction < 0 && !self.wrapping) {
            wrapBackward(self);
        } else {
            scrub.vars.totalTime = gsap.utils.snap(spacing)(
                (iteration + self.progress) * seamlessLoop.duration()
            );
            scrub.invalidate().restart();
            self.wrapping = false;
        }
    }
});

// DRAG MYSZKĄ
Draggable.create(".gallery", {
    type: "x",
    trigger: ".gallery",
    onPress() {
        this.startX = this.x;
    },
    onDrag() {
        const movement = this.x - this.startX;

        if (movement > 40) {
            scrubTo(scrub.vars.totalTime - spacing);
            this.startX = this.x;
        }
        if (movement < -40) {
            scrubTo(scrub.vars.totalTime + spacing);
            this.startX = this.x;
        }
    },
    onRelease() {
        gsap.to(this.target, { x: 0, duration: 0.3, ease: "power2.out" });
    }
});


document.querySelector(".next").addEventListener("click", () =>
    scrubTo(scrub.vars.totalTime + spacing)
);
document.querySelector(".prev").addEventListener("click", () =>
    scrubTo(scrub.vars.totalTime - spacing)
);

function wrapForward(trigger) {
    iteration++;
    trigger.wrapping = true;
    trigger.scroll(trigger.start + 1);
}

function wrapBackward(trigger) {
    iteration--;
    if (iteration < 0) {
        iteration = 9;
        seamlessLoop.totalTime(
            seamlessLoop.totalTime() + seamlessLoop.duration() * 10
        );
        scrub.pause();
    }
    trigger.wrapping = true;
    trigger.scroll(trigger.end - 1);
}

function scrubTo(totalTime) {
    let progress =
        (totalTime - seamlessLoop.duration() * iteration) /
        seamlessLoop.duration();

    if (progress > 1) wrapForward(trigger);
    else if (progress < 0) wrapBackward(trigger);
    else
        trigger.scroll(
            trigger.start + progress * (trigger.end - trigger.start)
        );
}

function buildSeamlessLoop(items, spacing) {
    let overlap = Math.ceil(1 / spacing),
        startTime = items.length * spacing + 0.5,
        loopTime = (items.length + overlap) * spacing + 1,
        rawSequence = gsap.timeline({ paused: true }),
        seamlessLoop = gsap.timeline({
            paused: true,
            repeat: -1,
            onRepeat() {
                this._time === this._dur && (this._tTime += this._dur - 0.01);
            }
        }),
        l = items.length + overlap * 2,
        time = 0;

    gsap.set(items, { xPercent: 300, opacity: 0, scale: 0.6 });

    for (let i = 0; i < l; i++) {
        let index = i % items.length;
        let item = items[index];
        time = i * spacing;

        rawSequence
            .fromTo(
                item,
                { scale: 0.6, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    zIndex: 100,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.in",
                    immediateRender: false
                },
                time
            )
            .fromTo(
                item,
                { xPercent: 300 },
                {
                    xPercent: -300,
                    duration: 1,
                    ease: "none",
                    immediateRender: false
                },
                time
            );
    }

    rawSequence.time(startTime);

    seamlessLoop
        .to(rawSequence, {
            time: loopTime,
            duration: loopTime - startTime,
            ease: "none"
        })
        .fromTo(
            rawSequence,
            { time: overlap * spacing + 1 },
            {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                ease: "none",
                immediateRender: false
            }
        );

    return seamlessLoop;
}
