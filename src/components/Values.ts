import Renderable from '../Renderable';

export default class Values extends Renderable {
    x: any
    y: any
    width: any
    height: any
    path: any
    constructor(params: any = {}) {
        super(params);
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.width = params.width || 200;
        this.height = params.height || 200;
        this.updatePath();
    }
    updatePath() {
        const path = new Path2D();
        path.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        this.path = path;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // 绘制托盘
        const outerRectSize = 70 * devicePixelRatio;
        ctx.beginPath();
        ctx.roundRect(-outerRectSize / 2, -outerRectSize / 2, outerRectSize, outerRectSize, outerRectSize * 0.3);
        ctx.fillStyle = "#7c7d7d";
        ctx.fill();
        ctx.beginPath();
        const innerRectSize = 60 * devicePixelRatio;
        ctx.roundRect(-innerRectSize / 2, -innerRectSize / 2, innerRectSize, innerRectSize, innerRectSize * 0.4);
        ctx.fillStyle = "#626161";
        ctx.fill();
        ctx.beginPath();
        const innerRectSize1 = 52 * devicePixelRatio;
        ctx.roundRect(-innerRectSize1 / 2, -innerRectSize1 / 2, innerRectSize1, innerRectSize1, innerRectSize1 * 0.4);
        ctx.fillStyle = "#515051";
        ctx.fill();

        ctx.save();
        ctx.translate(0, -outerRectSize / 2);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-30, 0);
        ctx.lineTo(-20, -20);
        ctx.lineTo(20, -20);
        ctx.lineTo(30, 0);
        ctx.fillStyle = "#7c7d7d";
        ctx.fill();
        ctx.restore();

        ctx.save();
        // 绘制仪表盘
        const size = 100;
        ctx.translate(0, -outerRectSize / 2 - size - 20);
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2, true);
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#222";
        ctx.lineWidth = 2 * devicePixelRatio;
        ctx.fill();
        ctx.stroke();

        // 绘制刻度
        ctx.save();
        ctx.font = "20px sans-serif";
        ctx.fillStyle = "#222";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.rotate((-138 * Math.PI) / 180);
        for (let i = 0; i <= 25; i++) {
            ctx.save();
            ctx.rotate((i * 11 * Math.PI) / 180);
            ctx.translate(0, -size);
            let pointerLength = 13;
            if (i % 5 === 0) {
                ctx.lineWidth = 2 * devicePixelRatio;
                ctx.strokeStyle = "#222";
                pointerLength = 17;
                ctx.fillText(i * 5 * 4, 0, pointerLength + 4);
            } else {
                ctx.lineWidth = 1 * devicePixelRatio;
                ctx.strokeStyle = "#999";
            }
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, pointerLength);
            ctx.stroke();
            ctx.restore();
        }
        ctx.beginPath();
        ctx.arc(0, 0, 4 * devicePixelRatio, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.save();
        ctx.rotate((275 * Math.PI) / 180);
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(-4, 0);
        ctx.lineTo(-4, 20);
        ctx.lineTo(4, 20);
        ctx.lineTo(4, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        ctx.restore();
        ctx.restore();

        {
            const g = ctx.createRadialGradient(0, 0, 92, 0, 0, 115);
            g.addColorStop(0, "hsl(0,30%,50%)");
            g.addColorStop(0.5, "hsl(0,90%,50%)");
            g.addColorStop(1, "hsl(0,30%,50%)");
            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, 115, 0, Math.PI * 2, true);
            ctx.arc(0, 0, 92, 0, Math.PI * 2, false);
            ctx.fillStyle = g;
            ctx.fill();
            ctx.restore();
        }

        {
            for (let i = 0; i < 6; i++) {
                ctx.save();
                ctx.rotate((i * 60 * Math.PI) / 180);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, -7);
                ctx.lineTo(105, -12);
                ctx.lineTo(105, 12);
                ctx.lineTo(0, 7);
                ctx.fillStyle = "#df343d";
                ctx.fill();
                const g = ctx.createRadialGradient(105, 0, 0, 105, 0, 20);
                g.addColorStop(0, "hsl(0,80%,50%)");
                g.addColorStop(1, "hsl(0,80%,40%)");
                ctx.beginPath();
                ctx.arc(105, 0, 22, 0, Math.PI * 2, true);
                ctx.fillStyle = g;
                ctx.fill();
                ctx.restore();
            }
        }

        {
            const radius = 30;
            const g = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            g.addColorStop(0, "#888");
            g.addColorStop(1, "#333");
            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
            ctx.fillStyle = g;
            ctx.fill();
            ctx.restore();
        }

        ctx.restore();
    }
}