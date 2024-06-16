import Renderable from '../Renderable';

export default class FixWood extends Renderable {
    x: any
    y: any
    width: any
    height: any
    path: any
    constructor(params) {
        super(params);
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.width = params.width || 100;
        this.height = params.height || 40;
        this.updatePath();
    }

    updatePath() {
        const path = new Path2D();
        path.rect(this.x, this.y, this.width, this.height);
        this.path = path;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.roundRect(0, 0, this.width, this.height, 2);
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#888";
        ctx.stroke();
        ctx.fillStyle = "rgb(230,232,229)";
        ctx.fill();
        ctx.restore();
    }
}