import Renderable from '../Renderable';

export default class FenXiYi extends Renderable {
    x: any
    y: any
    width: any
    height: any
    path: any
    name: any
    deviceName: any
    value: any
    constructor(params: any = {}) {
        super();
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.width = params.width || 200;
        this.height = params.height || 480;
        this.path = null;
        this.name = params.name || "质控仪";
        this.deviceName = params.deviceName || "";
        this.value = params.value || null;
        this.updatePath();
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
        ctx.roundRect(0, 0, this.width, this.height, 6);
        ctx.strokeStyle = "rgb(57,57,57)";
        ctx.lineWidth = 2;
        ctx.fillStyle = "rgb(230,232,229)";
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.rect(20, 40, 160, 80);
        ctx.fillStyle = "rgb(1, 24, 40)";
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(3, this.height, this.width - 6, 10, 4);
        ctx.strokeStyle = "rgb(57,57,57)";
        ctx.fillStyle = "rgb(153,153,151)";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(20, 180, 160, 24);
        ctx.lineWidth = 2;
        ctx.fillStyle = "#ccc";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(70, 185, 60, 10);
        ctx.lineWidth = 2;
        ctx.fillStyle = "#999";
        ctx.fill();
        ctx.stroke();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = `bold ${14 * devicePixelRatio}px sans-serif`;
        ctx.fillStyle = "#777";
        ctx.fillText(this.deviceName, 100, this.height - 60);
        ctx.fillStyle = "#fff";
        ctx.font = `${14 * devicePixelRatio}px sans-serif`;
        ctx.fillText(this.name, 100, this.height + 40);
        ctx.fillStyle = "hsl(90,50%,50%)";
        ctx.font = `${14 * devicePixelRatio}px sans-serif`;
        ctx.fillText("数据 " + this.value, 100, 80);
        ctx.restore();
    }
}