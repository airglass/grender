import Renderable from '../Renderable';
import PointController from './PointController';

export default class Pipeline extends Renderable {
    context: any
    polyline: any
    size: any
    speed: any
    lineDashOffset: any
    constructor(params) {
        super(params);
        this.context = params.context;
        this.polyline = params.polyline || [];
        this.size = params.size || 45;
        this.speed = params.speed || 2;
        this.lineDashOffset = 1;
    }
    getControllerPoints() {
        return this.polyline.map((point, idx) => {
            const [x, y] = point;
            const PC: any = new PointController({
                x,
                y,
                size: this.size / 2,
            });
            PC.userData.idx = idx;
            PC.userData.host = this;
            return PC;
        });
    }
    movePoint(idx, newX, newY) {
        this.polyline[idx] = [newX, newY];
    }
    updatePath() { }
    draw(ctx) {
        ctx.save();

        this.polyline.reduce((p1, p2) => {
            const [p1x, p1y] = p1;
            const [p2x, p2y] = p2;

            const keepLength = this.size;

            const y = p2y - p1y;
            const x = p2x - p1x;
            const radian = Math.atan2(y, x);
            const length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            const size = this.size;
            const halfSize = size / 2;

            ctx.save();
            ctx.translate(p1x, p1y);
            ctx.rotate(radian);
            // 矩形管道
            ctx.beginPath();
            ctx.moveTo(keepLength, -halfSize);
            ctx.lineTo(length - keepLength, -halfSize);
            ctx.lineTo(length - keepLength, halfSize);
            ctx.lineTo(keepLength, halfSize);
            ctx.closePath();
            const linearGradient = ctx.createLinearGradient(0, -halfSize, 0, halfSize);
            linearGradient.addColorStop(0, "#777");
            linearGradient.addColorStop(0.5, "#fff");
            linearGradient.addColorStop(1, "#555");
            ctx.fillStyle = linearGradient;
            ctx.fill();

            ctx.restore();
            return p2;
        });

        ctx.beginPath();
        for (let i = 0; i < this.polyline.length; i++) {
            const point = this.polyline[i];
            const [x, y] = point;
            if (i == 0) {
                ctx.moveTo(x, y);
                continue;
            }
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "hsl(220,50%,38%)";
        ctx.lineWidth = this.size * 0.6;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.setLineDash([this.size * 0.7 * devicePixelRatio, this.size * 0.6 * devicePixelRatio]);
        ctx.lineDashOffset = this.lineDashOffset;
        ctx.stroke();

        this.polyline.reduce((p1, p2) => {
            const [p1x, p1y] = p1;
            const [p2x, p2y] = p2;

            const keepLength = this.size;

            const y = p2y - p1y;
            const x = p2x - p1x;
            const radian = Math.atan2(y, x);

            ctx.save();
            ctx.translate(p1x, p1y);
            ctx.rotate(radian);
            const length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            const size = this.size;
            const halfSize = size / 2;
            ctx.beginPath();
            ctx.moveTo(keepLength, -halfSize);
            ctx.lineTo(length - keepLength, -halfSize);
            ctx.lineTo(length - keepLength, halfSize);
            ctx.lineTo(keepLength, halfSize);
            ctx.closePath();
            let linearGradient = ctx.createLinearGradient(0, -halfSize, 0, halfSize);
            linearGradient.addColorStop(0, "transparent");
            linearGradient.addColorStop(0.5, "hsla(0,0%,100%,.3)");
            linearGradient.addColorStop(1, "transparent");
            ctx.fillStyle = linearGradient;
            ctx.fill();

            {
                // 法兰尺寸
                const flangeWidth = size * 0.2;
                const flangHeight = size * 1.7;
                // 垫片尺寸
                const shimsWidth = size * 0.095;
                const shimsHeight = size * 1.4;

                ctx.strokeStyle = "#666";
                ctx.setLineDash([0, 0]);
                ctx.lineWidth = 1 * devicePixelRatio;

                // 终点法兰
                ctx.save();
                const linearGradient = ctx.createLinearGradient(length - keepLength, -flangHeight / 2, length - keepLength, flangHeight / 2);
                linearGradient.addColorStop(0, "#aaa");
                linearGradient.addColorStop(0.2, "#888");
                linearGradient.addColorStop(0.3, "#999");
                linearGradient.addColorStop(0.5, "#eee");
                linearGradient.addColorStop(0.7, "#999");
                linearGradient.addColorStop(0.8, "#888");
                linearGradient.addColorStop(1, "#aaa");
                ctx.fillStyle = linearGradient;
                ctx.beginPath();
                ctx.rect(length - keepLength - flangeWidth - shimsWidth, -flangHeight / 2, flangeWidth, flangHeight);
                ctx.fill();
                ctx.stroke();

                // 起点法兰
                ctx.beginPath();
                ctx.rect(keepLength + shimsWidth, -flangHeight / 2, flangeWidth, flangHeight);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = "hsl(0,50%,50%)";
                // 终点垫片
                ctx.beginPath();
                ctx.rect(length - keepLength - shimsWidth, -shimsHeight / 2, shimsWidth, shimsHeight);
                ctx.fill();
                // 起点垫片
                ctx.beginPath();
                ctx.rect(keepLength, -shimsHeight / 2, shimsWidth, shimsHeight);
                ctx.fill();

                const fastenerWidth = this.size * 0.16;
                const fastenerHeight = this.size * 0.3;
                ctx.fillStyle = "#ccc";

                // 终点螺丝第一个
                ctx.beginPath();
                ctx.roundRect(length - keepLength - flangeWidth - shimsWidth - fastenerWidth, -flangHeight / 2 + fastenerHeight * 0.25, fastenerWidth, fastenerHeight, fastenerWidth * 0.4);
                ctx.rect(length - keepLength - flangeWidth - shimsWidth - fastenerWidth, -flangHeight / 2 + fastenerHeight * 0.55, fastenerWidth, fastenerHeight * 0.3, fastenerWidth * 0.4);
                // 终点螺丝第二个
                ctx.roundRect(length - keepLength - flangeWidth - shimsWidth - fastenerWidth, -fastenerHeight / 2, fastenerWidth, fastenerHeight, fastenerWidth * 0.4);
                ctx.rect(length - keepLength - flangeWidth - shimsWidth - fastenerWidth, -fastenerHeight / 2 + fastenerHeight * 0.35, fastenerWidth, fastenerHeight * 0.3, fastenerWidth * 0.4);
                // 终点螺丝第三个
                ctx.roundRect(
                    length - keepLength - flangeWidth - shimsWidth - fastenerWidth,
                    flangHeight / 2 - fastenerHeight - fastenerHeight * 0.25,
                    fastenerWidth,
                    fastenerHeight,
                    fastenerWidth * 0.4
                );
                ctx.roundRect(
                    length - keepLength - flangeWidth - shimsWidth - fastenerWidth,
                    flangHeight / 2 - fastenerHeight + fastenerHeight * 0.1,
                    fastenerWidth,
                    fastenerHeight * 0.3,
                    fastenerWidth * 0.4
                );
                ctx.fill();
                ctx.stroke();

                // 起点螺丝第一个
                ctx.beginPath();
                ctx.roundRect(keepLength + flangeWidth + shimsWidth, -flangHeight / 2 + fastenerHeight * 0.25, fastenerWidth, fastenerHeight, fastenerWidth * 0.4);
                ctx.rect(keepLength + flangeWidth + shimsWidth, -flangHeight / 2 + fastenerHeight * 0.6, fastenerWidth, fastenerHeight * 0.3, fastenerWidth * 0.4);
                // 起点螺丝第二个
                ctx.roundRect(keepLength + flangeWidth + shimsWidth, -fastenerHeight / 2, fastenerWidth, fastenerHeight, fastenerWidth * 0.4);
                ctx.rect(keepLength + flangeWidth + shimsWidth, -fastenerHeight / 2 + fastenerHeight * 0.35, fastenerWidth, fastenerHeight * 0.3, fastenerWidth * 0.4);
                // 起点螺丝第三个
                ctx.roundRect(keepLength + flangeWidth + shimsWidth, flangHeight / 2 - fastenerHeight - fastenerHeight * 0.25, fastenerWidth, fastenerHeight, fastenerWidth * 0.4);
                ctx.rect(keepLength + flangeWidth + shimsWidth, flangHeight / 2 - fastenerHeight + fastenerHeight * 0.1, fastenerWidth, fastenerHeight * 0.3, fastenerWidth * 0.4);
                ctx.fill();
                ctx.stroke();

                ctx.restore();
            }

            ctx.restore();
            return p2;
        });
        ctx.restore();

        this.lineDashOffset += this.speed;
        if (this.lineDashOffset >= 500 || this.lineDashOffset <= 0) {
            this.speed *= -1;
        }
    }
}