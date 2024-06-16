import Renderable from '../Renderable';
import { randomString } from '../utils';

export default class TextComp extends Renderable {
    x: any
    y: any
    name: any
    layerName: any
    fontSize: any
    cid: any
    path: any
    constructor(params) {
        super(params);
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.name = params.name || "";
        this.layerName = params.layerName || "";
        this.fontSize = params.fontSize || 12;
        this.cid = params.cid || randomString(32);
        this.updatePath();
    }

    toJson() {
        return {
            layerName: this.layerName,
            fontSize: this.fontSize,
            type: "TextComp",
            cid: this.cid,
            x: this.x,
            y: this.y,
            name: this.name,
        };
    }

    set(prop, value, type) {
        this[prop] = value;
    }

    updatePath() {
        const path = new Path2D();
        this.path = path;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.font = `${this.fontSize * window.devicePixelRatio}px bold sans-serif`;
        ctx.fillStyle = "#222";
        ctx.fillText(this.name, 0, 0);
        ctx.restore();
    }
}