import { getRandomNumber } from "../helpers/functions";
import { printCircle } from "../helpers/printers";

export class Particle {
    x: number;
    y: number;
    velX: number;
    velY: number;
    radius: number;
    color: string;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.velX = 0;
        this.velY = 0;
        this.radius = getRandomNumber(1, 2);
        this.color = "rgba(255,255,255,0.6)";
    }

    render(
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        mouseVelX: number,
        mouseVelY: number
    ) {
        // let red = ((this.y - (centerY - 250))/500)*255
        // let green = (1-((this.y - (centerY - 250))/500))*83
        // this.color = "rgb(" + red + "," + green + ",255)";
        printCircle(this.x, this.y, this.color, this.radius, ctx);

        this.x += this.velX;
        this.y += this.velY;

        this.velX += Math.random() - 0.5;
        this.velX *= 0.8;
        this.velY += Math.random() - 0.5 / 3 + 0.01;

        // this.velX += (mouseVelX / 5) * Math.random();
        // this.velY += (mouseVelY / 5) * Math.random();

        let dist = Math.sqrt(
            Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2)
        );
        this.velX = (this.velX * dist) / 200;
        this.velY = (this.velY * dist) / 200;
        // if (
        //     dist + Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2)) >=
        //     250
        // ) {
        //     this.velX = -this.velX / 3;
        //     this.velY = -this.velY / 3;
        // }

        if (dist >= 251) {
            this.x = getRandomNumber(centerX - 200, centerX + 200);
            this.y = getRandomNumber(centerY - 200, centerY + 200);
        }
    }
}
