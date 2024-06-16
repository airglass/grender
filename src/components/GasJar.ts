import Renderable from '../Renderable';

export default class Gasjar extends Renderable {
    x: any
    y: any
    width: any
    height: any
    name: any
    path: any
    constructor(params) {
        super(params);
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.width = 90;
        this.height = 360;
        this.name = params.name || "";
        this.updatePath();
    }

    updatePath() {
        const path = new Path2D();
        path.rect(
            this.x,
            this.y - this.height,
            this.width,
            this.height,
        );
        this.path = path;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -this.height);
        ctx.bezierCurveTo(
            0,
            -this.height - 50,
            this.width,
            -this.height - 50,
            this.width,
            -this.height,
        );
        ctx.lineTo(this.width, 0);
        ctx.closePath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#bbb";
        ctx.stroke();
        const gradient = ctx.createLinearGradient(0, 0, 90, 0);
        gradient.addColorStop(0, "rgb(83, 111, 142)");
        gradient.addColorStop(0.3, "rgb(132, 162, 198)");
        gradient.addColorStop(0.6, "rgb(49, 81, 117)");
        gradient.addColorStop(0.7, "rgb(49, 81, 117)");
        gradient.addColorStop(1, "rgb(125, 150, 175)");
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = `${14 * devicePixelRatio}px bolder sans-serif`;
        ctx.fillText(this.name, this.width / 2, -this.height / 2);
        ctx.fillStyle = "rgba(255,255,255,1)";
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.roundRect(
                10,
                -this.height + 60 - i * 25,
                this.width - 20,
                16,
                2,
            );
            ctx.fill();
        }
        ctx.restore();
    }
}