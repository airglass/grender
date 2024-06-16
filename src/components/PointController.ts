import Renderable from '../Renderable';

export default class PointController extends Renderable {
    x: any
    y: any
    size: any
    path: any
    constructor(params) {
        super(params);
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.size = params.size || 30;
        this.updatePath();
    }
    updatePath() {
        const path = new Path2D();
        path.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        this.path = path;
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = "hsla(0,0%,0%,0.1)";
        ctx.fill(this.path);
        ctx.restore();
    }
}