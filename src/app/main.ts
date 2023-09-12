import "destyle.css";
import "../main.css";
import { Particle } from "./classes/Particle";
import { getRandomNumber } from "./helpers/functions";
let width = window.innerWidth;
let height = window.innerHeight;
let centerX = width / 2;
let centerY = height / 2;
let initialized = false;

// UI
const followCursor = document.getElementById("follow-cursor") as HTMLDivElement;
const randomnessDiv = document.getElementById("randomness") as HTMLDivElement;

let currentProgram = 1;
const programFollow = document.getElementById("follow") as HTMLInputElement;
const programGravity = document.getElementById("gravity") as HTMLInputElement;

programFollow.addEventListener("click", () => {
    currentProgram = 1;
    followCursor.classList.remove("hidden");
    randomnessDiv.classList.add("hidden");
});

programGravity.addEventListener("click", () => {
    currentProgram = 2;
    followCursor.classList.add("hidden");
    randomnessDiv.classList.remove("hidden");
});

const randomnessInput = document.getElementById("volume") as HTMLInputElement;
let randomness = parseFloat(randomnessInput.value);

randomnessInput.addEventListener("input", () => {
    randomness = parseFloat(randomnessInput.value);
});
// UI END

let mouseVelX = 0;
let mouseVelY = 0;
window.addEventListener("mousemove", (event) => {
    let dist = Math.sqrt(
        Math.pow(event.clientX - centerX, 2) +
            Math.pow(event.clientY - centerY, 2)
    );
    mouseVelX = ((event.clientX - centerX) / dist) * 2;
    mouseVelY = ((event.clientY - centerY) / dist) * 2;
});

let particles: Particle[] = [];
for (let i = 0; i < 2000; i++) {
    particles.push(
        new Particle(
            getRandomNumber(centerX - 150, centerX + 150),
            getRandomNumber(centerY - 150, centerY + 150),
            Math.min(width, height)
        )
    );
}

let canvas = document.getElementById("canvas") as HTMLCanvasElement;

window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    centerX = width / 2;
    centerY = height / 2;

    if (canvas !== null) {
        canvas.width = width;
        canvas.height = height;
    }

    if (width > 500 && !initialized) {
        init();
    }

    const bound = Math.min(width, height);

    particles.forEach((particle) => {
        particle.update(bound);
    });
});
function init() {
    if (canvas !== null) {
        initialized = true;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvas.width = width;
        canvas.height = height;

        let pause = false;
        window.addEventListener("keydown", (event) => {
            if (event.code === "KeyP") {
                pause = !pause;
                if (!pause) {
                    loop();
                }
            }
        });

        const loop = function () {
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fillRect(0, 0, width, height);

            mouseVelX *= 0.95;
            mouseVelY *= 0.95;

            if (currentProgram === 1) {
                particles.forEach((particle) => {
                    particle.follow(
                        ctx,
                        centerX,
                        centerY,
                        mouseVelX,
                        mouseVelY
                    );
                });
            } else if (currentProgram === 2) {
                particles.forEach((particle) => {
                    particle.gravity(ctx, centerX, centerY, randomness);
                });
            }

            if (!pause) {
                requestAnimationFrame(loop);
            }
        };

        loop();
    }
}

if (width > 500 && !initialized) {
    init();
}
