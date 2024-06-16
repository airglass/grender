import Renderable from '../Renderable';
import { randomString } from "../utils"

export default class VideoCapture extends Renderable {
    x: any
    y: any
    layerName: any
    width: any
    height: any
    padding: any
    cid: any
    image: any
    imgWidth: any
    imgHeight: any
    controller: any
    path: any
    selected: any
    selectedLineOffset: any
    constructor(params) {
        super(params);
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.layerName = params.layerName || "";
        this.width = params.width || 800;
        this.height = params.height || 450;
        this.updatePath();
        this.padding = devicePixelRatio;
        this.cid = params.cid || randomString(32);
        this.image = null;
        this.imgWidth = 0;
        this.imgHeight = 0;
        this.controller = [];
    }

    toJson() {
        const data = {
            cid: this.cid,
            layerName: this.layerName,
            type: "VideoCapture",
            x: this.x,
            y: this.y,
        };
        return data;
    }

    set(prop, value, type) {
        const img = new Image();
        img.src = value;
        img.onload = () => {
            this.imgWidth = img.width;
            this.imgHeight = img.height;
            this.image = img;
        };
    }

    updatePath() {
        const path = new Path2D();
        path.rect(this.x, this.y, this.width, this.height);
        this.path = path;
        // 控制点
        this.controller = [
            [this.x - this.padding, this.y - this.padding],
            [this.x + this.width / 2, this.y - this.padding],
            [this.x + this.width + this.padding, this.y - this.padding],
            [this.x + this.width + this.padding, this.y + this.height / 2],
            [this.x + this.width + this.padding, this.y + this.height + this.padding],
            [this.x + this.width / 2, this.y + this.height + this.padding],
            [this.x - this.padding, this.y + this.height + this.padding],
            [this.x - this.padding, this.y + this.height / 2],
        ];
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.image) {
            ctx.drawImage(this.image, (this.width - this.imgWidth) / 2, (this.height - this.imgHeight) / 2, this.imgWidth, this.imgHeight);
        }
        ctx.restore();
        if (this.selected) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(this.x - this.padding, this.y - this.padding, this.width + this.padding * 2, this.height + this.padding * 2);
            ctx.lineWidth = 1.5 * devicePixelRatio;
            ctx.setLineDash([10, 5]);
            ctx.strokeStyle = "#f00";
            ctx.lineCap = "round";
            ctx.lineDashOffset = this.selectedLineOffset;
            ctx.stroke();
            ctx.restore();
            this.selectedLineOffset -= 1;
            const w = 10 * devicePixelRatio;
            for (let p of this.controller) {
                const [x, y] = p;
                ctx.beginPath();
                ctx.rect(x - w / 2, y - w / 2, w, w);
                ctx.lineWidth = devicePixelRatio;
                ctx.strokeStyle = "#888";
                ctx.stroke();
            }
        } else {
            this.selectedLineOffset = 0;
        }
    }
}
