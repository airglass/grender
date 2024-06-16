import Renderable from '../Renderable';

export default class Grid extends Renderable {
    width: any
    height: any
    color: any
    lineWidth: any
    angle: any
    step: any
    scale: any
    alpha: any
    lineOffset: any
    constructor(params) {
        super(params);
        this.width = params.width;
        this.height = params.height;
        this.color = params.color || "#999999";
        this.lineWidth = params.lineWidth || 0.5;
        this.angle = params.angle || 0;
        this.step = params.step || 40;
        this.scale = params.scale || 1;
        this.alpha = params.alpha || 0;

        this.lineOffset = 0;
    }

    draw(ctx) {
        // 取最长的一边
        const length = Math.max(this.width, this.height);
        ctx.save();
        ctx.translate(this.width / 2, this.height / 2);
        ctx.scale(1, this.scale);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        const times = Math.ceil(length / this.step);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.font = `${18 * devicePixelRatio}px sans-serif`;
        ctx.fillText(0, -20, -20);
        for (let i = 0; i < times; i++) {
            const y = i * this.step;
            ctx.globalAlpha = this.alpha;
            if (i !== 0) ctx.fillText(i * this.step, i - 20, y);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(length, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, y + this.step / 2);
            ctx.lineTo(length, y + this.step / 2);
            ctx.globalAlpha = this.alpha * 0.3;
            ctx.stroke();
        }
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        for (let i = 0; i < times; i++) {
            const x = i * this.step;
            ctx.globalAlpha = this.alpha * 0.3;
            if (i !== 0) ctx.fillText(i * this.step, x, i - 20);
            ctx.beginPath();
            ctx.moveTo(x + this.step / 2, 0);
            ctx.lineTo(x + this.step / 2, length);
            ctx.stroke();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, length);
            ctx.stroke();
        }

        ctx.restore();

        this.lineOffset -= 1;
    }
}