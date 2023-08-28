import "destyle.css";
import "../main.css";
import { Particle } from "./classes/Particle";
import { getRandomNumber } from "./helpers/functions";

let canvas = document.getElementById("canvas") as HTMLCanvasElement;
if (canvas !== null) {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const centerX = width / 2;
    const centerY = height / 2;

    // const purple = { red: 255, green: 0, blue: 255 };
    // const blue = { red: 0, green: 83, blue: 255 };

    let mouseVelX = 0;
    let mouseVelY = 0;
    window.addEventListener("mousemove", (event) => {
        let dist = Math.sqrt(
            Math.pow(event.clientX - centerX, 2) +
                Math.pow(event.clientY - centerY, 2)
        );
        mouseVelX = (event.clientX - centerX) / dist;
        mouseVelY = (event.clientY - centerY) / dist;
    });

    // function handleMotionEvent(event) {
    //     mouseVelX = -event.accelerationIncludingGravity.x;
    //     mouseVelY = event.accelerationIncludingGravity.y;
    // }
    // window.addEventListener("devicemotion", handleMotionEvent, true);

    let particles: Particle[] = [];
    for (let i = 0; i < 2000; i++) {
        particles.push(
            new Particle(
                getRandomNumber(centerX - 50, centerX + 50),
                getRandomNumber(centerY - 50, centerY + 50),
                getRandomNumber(2, 3)
            )
        );
    }

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
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, width, height);
        mouseVelX *= 0.99;
        mouseVelY *= 0.99;

        particles.forEach((particle) => {
            particle.render(ctx, centerX, centerY, mouseVelX, mouseVelY);
        });

        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 252 + 100, 0, 2 * Math.PI, false);
        ctx.lineWidth = 200;
        ctx.stroke();

        if (!pause) {
            requestAnimationFrame(loop);
        }
    };

    loop();
}
