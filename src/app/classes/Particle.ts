import { getRandomNumber } from "../helpers/functions";
import { printCircle } from "../helpers/printers";

export class Particle {
    x: number;
    y: number;
    velX: number;
    velY: number;
    radius: number;
    color: string;
    bound: number;

    constructor(x: number, y: number, sphereRadius: number) {
        this.x = x;
        this.y = y;
        this.velX = Math.random() - 0.5;
        this.velY = Math.random() - 0.5;
        this.radius = getRandomNumber(1, 2);
        this.color = "rgba(255,255,255,0.6)";
        this.bound = Math.min(sphereRadius / 2 - 100, 350);
    }

    update(newBound: number) {
        this.bound = newBound / 2 - 100;
    }

    gravity(
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        randomness: number
    ) {
        printCircle(
            this.x,
            this.y,
            this.color,
            0.001 * this.y * (Math.abs(this.velX) + Math.abs(this.velY)),
            ctx
        );

        this.velY *= 0.996;
        this.velX *= 0.996;

        this.velY += (Math.random() - 0.5) * randomness;
        this.velX += (Math.random() - 0.5) * randomness;

        let dist = Math.sqrt(
            Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2)
        );

        const maxDist = 150;
        const repluseTrigger = dist - 200;

        if (repluseTrigger > 0) {
            this.velX +=
                -((this.x - centerX) / dist) * (repluseTrigger / maxDist) * 0.2;
            this.velY +=
                -((this.y - centerY) / dist) * (repluseTrigger / maxDist) * 0.2;
        }

        if (this.y > centerY) {
            this.velX -= 0.0001 * dist * (Math.abs(this.x) / centerY);
        } else {
            this.velX += 0.0001 * dist * (Math.abs(this.y) / centerX);
        }

        if (dist >= this.bound) {
            this.velX = -this.velX * 0.2;
            this.velY = -this.velY * 0.2;
        }

        // this.velX *= 0.99;

        if (dist > this.bound) {
            this.x = getRandomNumber(centerX - 50, centerX + 50);
            this.y = getRandomNumber(centerY - 50, centerY + 50);
            this.velX = 0;
            this.velY = 0;
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    follow(
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        mouseVelX: number,
        mouseVelY: number
    ) {
        printCircle(this.x, this.y, this.color, this.radius, ctx);

        this.x += this.velX;
        this.y += this.velY;

        this.velX += Math.random() - 0.5;
        this.velX *= 0.99;
        this.velY += Math.random() - 0.5;

        this.velX += (mouseVelX / 5) * Math.random();
        this.velY += (mouseVelY / 5) * Math.random();

        let dist = Math.sqrt(
            Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2)
        );
        if (
            dist + Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2)) >=
            this.bound
        ) {
            this.velX = -this.velX / 3;
            this.velY = -this.velY / 3;
        }

        if (dist >= this.bound + 1) {
            this.x = getRandomNumber(
                centerX - this.bound * 0.8,
                centerX + this.bound * 0.8
            );
            this.y = getRandomNumber(
                centerY - this.bound * 0.8,
                centerY + this.bound * 0.8
            );
        }
    }
}
