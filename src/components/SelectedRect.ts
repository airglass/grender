import Renderable from '../Renderable';

export default class SelectedRect extends Renderable {
    x: any
    y: any
    width: any
    height: any
    cid: any
    constructor(params) {
        super(params);
        this.x = params.x;
        this.y = params.y;
        this.width = params.width;
        this.height = params.height;
    }

    toJson() {
        return {
            cid: this.cid,
            type: "SelectRect",
            x: this.x,
            y: this.y,
        };
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.lineWidth = 1.5 * window.devicePixelRatio;
        ctx.setLineDash([15, 10]);
        ctx.strokeStyle = "hsla(0, 50%, 50%, 1)";
        ctx.stroke();
        ctx.fillStyle = "hsla(0, 50%, 50%, .2)";
        ctx.fill();
        ctx.restore();
    }
}