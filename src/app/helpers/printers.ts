export const printCircle = (
    x: number,
    y: number,
    color: string | CanvasGradient | CanvasPattern,
    r: number,
    ctx: CanvasRenderingContext2D
) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
};
