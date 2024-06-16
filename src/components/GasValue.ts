import Renderable from '../Renderable';

// 标气值
export default class GasVal extends Renderable {
    x: any
    y: any
    size: any
    value: any
    timer: any
    path: any
    constructor(params) {
        super(params);
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.size = params.size || 30;
        this.value = params.value || 0;
        this.updatePath();
        this.timer;
    }

    updatePath() {
        const path = new Path2D();
        path.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        this.path = path;
    }

    setVal(targetVal) {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.timer = setInterval(() => {
            this.value += (targetVal - this.value) * 0.1;
        }, 50);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.lineWidth = 8;
        ctx.arc(0, 0, this.size, 0, Math.PI * 2, true);
        if (this.value > 8) {
            ctx.fillStyle = "hsl(0, 80%, 50%, .4)";
        } else if (this.value > 6) {
            ctx.fillStyle = "hsl(30, 80%, 50%, .4)";
        } else if (this.value > 3) {
            ctx.fillStyle = "hsl(50, 80%, 50%, .4)";
        } else {
            ctx.fillStyle = "hsl(90, 80%, 50%, .4)";
        }
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
            0,
            0,
            this.size - 6,
            0,
            -(Math.PI / 180) * (this.value / 10) * 360,
            true,
        );
        if (this.value > 8) {
            ctx.strokeStyle = "hsl(0, 80%, 50%)";
        } else if (this.value > 6) {
            ctx.strokeStyle = "hsl(30, 80%, 50%)";
        } else if (this.value > 3) {
            ctx.strokeStyle = "hsl(50, 80%, 50%)";
        } else {
            ctx.strokeStyle = "hsl(90, 80%, 50%)";
        }
        ctx.setLineDash([18, 4]);
        ctx.stroke();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${16 * devicePixelRatio}px sans-serif`;
        ctx.fillText(this.value.toFixed(1), 0, 0);
        ctx.restore();
    }
}