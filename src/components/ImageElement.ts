import Renderable from '../Renderable';
import { randomString } from '../utils';

export default class ImageElement extends Renderable {
    url: any
    x: any
    y: any
    realWidth: any
    realHeight: any
    width: any
    height: any
    ratio: any
    layerName: any
    angle: any
    isRotating: any
    rotateStep: any
    image: any
    controller: any
    transformX: any
    transformY: any
    padding: any
    cid: any
    timer: any
    selectedBlinkCounter: any
    selectedBlinkSpeed: any
    selectedBlinkMax: any
    path: any
    selected: any
    selectedLineOffset: any
    constructor(params) {
        super(params);
        this.url = params.url;
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.realWidth = 0;
        this.realHeight = 0;
        this.width = params.width;
        this.height = params.height;
        this.ratio = this.width / this.height;
        this.layerName = params.layerName || "";
        this.angle = 0;
        this.isRotating = params.isRotating || false;
        this.rotateStep = params.rotateStep || 0;
        this.image = null;
        this.controller = [];
        this.transformX = params.transformX || 0;
        this.transformY = params.transformY || 0;
        this.padding = devicePixelRatio;
        this.cid = params.cid || randomString(32);
        this.timer = null;
        this.selectedBlinkCounter = 0;
        this.selectedBlinkSpeed = 0.03;
        this.selectedBlinkMax = 0.5;
        this._loadImg();
    }

    toJson() {
        return {
            layerName: this.layerName,
            cid: this.cid,
            type: "ImageElement",
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            isRotating: this.isRotating,
            transformX: this.transformX,
            transformY: this.transformY,
            rotateStep: this.rotateStep,
            url: this.image.src,
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

    _loadImg() {
        const img = new Image();
        img.src = this.url;
        img.onload = () => {
            this.image = img;
            this.realWidth = img.width * window.devicePixelRatio;
            this.realHeight = img.height * window.devicePixelRatio;
            this.ratio = this.realWidth / this.realHeight;
            this.width = this.width || this.realWidth;
            this.height = this.height || this.realHeight;
            this.updatePath();
        };
    }

    set(prop, value, type) {
        this[prop] = value;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.translate(this.width * this.transformX, this.height * this.transformY);
        if (this.isRotating && this.rotateStep) {
            ctx.rotate((this.angle * Math.PI) / 180);
            this.angle += this.rotateStep;
            if (this.angle >= 360) this.angle = 0;
        }
        if (this.image) ctx.drawImage(this.image, -this.width * this.transformX, -this.height * this.transformY, this.width, this.height);
        ctx.restore();
        if (this.selected) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(this.x - this.padding, this.y - this.padding, this.width + this.padding * 2, this.height + this.padding * 2);
            ctx.lineWidth = 1.5 * devicePixelRatio;
            ctx.setLineDash([15, 10]);
            ctx.lineCap = "round";
            ctx.lineDashOffset = this.selectedLineOffset;
            ctx.strokeStyle = "#f00";
            ctx.stroke();
            ctx.fillStyle = `hsla(0, 50%, 50%, ${this.selectedBlinkCounter})`;
            ctx.fill();
            ctx.restore();
            this.selectedLineOffset -= 1;
            const w = 10 * devicePixelRatio;
            this.selectedBlinkCounter += this.selectedBlinkSpeed;
            if (this.selectedBlinkCounter >= this.selectedBlinkMax || this.selectedBlinkCounter <= 0) {
                this.selectedBlinkSpeed = -this.selectedBlinkSpeed;
            }
        } else {
            this.selectedLineOffset = 0;
        }
    }
}
