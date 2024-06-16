import Renderable from '../Renderable';

export default class LinkLine extends Renderable {
    points: any
    lineDashOffset: any = 0
    constructor(params) {
        super(params);
        this.points = params.points || [];
        this.lineDashOffset = 0;
    }

    draw(ctx) {
        ctx.save();
        const linePath = new Path2D();
        for (let i = 0; i < this.points.length; i++) {
            const [x, y] = this.points[i];
            if (i === 0) {
                linePath.moveTo(x, y);
                continue;
            }
            linePath.lineTo(x, y);
        }
        ctx.lineWidth = 20;
        ctx.strokeStyle = "rgb(39,94,126)";
        ctx.stroke(linePath);
        ctx.lineWidth = 6;
        ctx.setLineDash([10, 10]);
        ctx.lineDashOffset = this.lineDashOffset;
        ctx.strokeStyle = "rgb(57,148,196)";
        ctx.stroke(linePath);
        ctx.restore();
        this.lineDashOffset -= 1;
    }
}