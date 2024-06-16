import Renderable from '../Renderable';
import { randomString } from '../utils';

export default class Smoke extends Renderable {
    x: any
    y: any
    batch: any
    layerName: any
    cid: any
    path: any
    constructor(params) {
        super(params);
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.batch = [
            { x: 0, y: 0, size: 0, opacity: 1, opacitySpeed: 0.1 },
            {
                x: 0,
                y: 0,
                size: 0,
                opacity: 1,
                opacitySpeed: 0.1,
            },
            { x: 0, y: 0, size: 0, opacity: 1, opacitySpeed: 0.1 },
            {
                x: 0,
                y: 0,
                size: 0,
                opacity: 1,
                opacitySpeed: 0.1,
            },
        ];
        this.layerName = params.layerName || "";
        this.cid = params.cid || randomString(32);
        this.updatePath();
    }

    toJson() {
        return {
            layerName: this.layerName,
            cid: this.cid,
            type: "Smoke",
            x: this.x,
            y: this.y,
        };
    }

    updatePath() {
        const path = new Path2D();
        this.path = path;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        for (let i = 0; i < this.batch.length; i++) {
            const d = this.batch[i];
            d.y -= d.ySpeed || 2;
            d.size += 1;
            d.opacity -= d.opacitySpeed;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2, true);
            ctx.fillStyle = `rgba(0,0,0,${d.opacity})`;
            ctx.fill();
            if (d.opacity <= 0) {
                const opacity = Math.random();
                const ySpeed = 2 + Math.random() * 4;
                const live = parseInt((30 + Math.random() * 100) + "");
                const opacitySpeed = 1 / live;
                this.batch.splice(i, 1, {
                    x: 0,
                    y: 0,
                    size: 0,
                    opacity: 1,
                    opacitySpeed,
                    ySpeed,
                });
            }
        }
        ctx.restore();
    }
}