import Renderable from '../Renderable';
import { randomString } from "../utils"

export default class WaterProgress extends Renderable {
    x: any
    y: any
    width: any
    height: any
    progress: any
    cid: any
    name: any
    layerName: any
    path: any
    constructor(params) {
        super(params);
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.width = params.width || 100;
        this.height = params.height || 100;
        this.progress = params.progress || 0;
        this.cid = params.cid || randomString(32);
        this.name = params.name || "";
        this.layerName = params.layerName || "";
        this.updatePath();
    }

    toJson() {
        return {
            layerName: this.layerName,
            name: this.name,
            type: "WaterProgress",
            cid: this.cid,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            progress: this.progress,
        };
    }

    set(prop, value, type) {
        this[prop] = value;
    }

    updatePath() {
        const path = new Path2D();
        path.rect(this.x, this.y, this.width, this.height);
        this.path = path;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = "hsla(0, 50%, 100%, .3)";
        ctx.fill();
        ctx.beginPath();
        const fillHeight = this.height * this.progress;
        ctx.rect(0, this.height - fillHeight, this.width, fillHeight);
        ctx.fillStyle = "hsl(200, 80%, 100%)";
        ctx.fill();
        ctx.restore();
    }
}
