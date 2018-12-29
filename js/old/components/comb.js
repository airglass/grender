import Component from './component';

class SingleComb {
    constructor(x, y, size) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.fillH = 0;
        this.fillS = 100;
        this.fillL = 50;
        this.fillA = 0.1;

        this.strokeH = 0;
        this.strokeS = 100;
        this.strokeL = 50;
        this.strokeA = Math.random();
        this.speedStrokeA = 0.02 + Math.random() * 0.02;
        this.speedStrokeH = 1;

        this.lineWidth = 2;
        this.points = this.createPoints();
        this.actived = false;
    }
    update() {
        this.strokeA += this.speedStrokeA;
        if (this.strokeA > 1 || this.strokeA <= 0) {
            this.speedStrokeA = -this.speedStrokeA;
        }
        this.strokeH += this.speedStrokeH;
        if (this.strokeH > 360) {
            this.strokeH = 0;
        }
    }
    draw(ctx) {
        this.update();

        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.fillStyle = 'hsla(' + this.strokeH + ',' + this.strokeS + '%,' + this.strokeL + '%,' + this.fillA + ')';
        ctx.strokeStyle = 'hsla(' + this.strokeH + ',' + this.strokeS + '%,' + this.strokeL + '%,' + this.strokeA + ')';
        ctx.lineWidth = this.lineWidth;

        ctx.save();
        this.emitPath(ctx);
        if (this.lineWidth) {
            ctx.stroke();
        }
        ctx.fill();
        ctx.restore();

        ctx.restore();
    }
    createPoints() {
        var points = [];
        var _width = (this.size - this.lineWidth / 2);
        for (var i = 0; i < 6; i++) {
            var rotation = Math.PI / 180 * i * 60;
            var x = Math.cos(rotation) * _width;
            var y = Math.sin(rotation) * _width;
            points.push([x, y]);
        }
        return points;
    }
    emitPath(ctx) {
        ctx.save();
        ctx.beginPath();
        for (var i = 0; i < this.points.length; i++) {
            if (i == 0) {
                ctx.moveTo(this.points[i][0], this.points[i][1]);
                continue;
            }
            ctx.lineTo(this.points[i][0], this.points[i][1]);
        }
        ctx.closePath();
        ctx.restore();
    }
}

class Comb {
    constructor(wrap) {
        var isMouseDown = false;
        this.component = new Component(wrap, {
            onMouseDown: function() {
                isMouseDown = true;
            }.bind(this),
            onMouseMove: function() {
                if (!isMouseDown) return;
            }.bind(this),
            onMouseUp: function() {
                isMouseDown = false;
            }.bind(this),
            onWindowResize: function() {
                this.drawBg();
            }.bind(this)
        });

        this.component.createCanvasLayer();
        this.component.createCanvasLayer();
        this.bgCanvasLayer = this.component.layerManager[0].canvas;
        this.bgCtxCtxLayer = this.component.layerManager[0].ctx;
        this.mainCanvasLayer = this.component.layerManager[1].canvas;
        this.mainCtxCtxLayer = this.component.layerManager[1].ctx;

        this.mainLayerRequestAnimationFrame;

        this.bgColor = 'hsla(0, 0%, 10%, 1)';
        this.combs = [];
        this.combSize = 26;
        this.combPadding = 2;
        this.createCombs();

        this.drawBg();
        this.startAnimationMain();
    }
    createCombs() {
        var padding = this.combPadding;
        var size = this.combSize;
        var _ih = Math.sin(Math.PI / 180 * 60) * size;
        var width = size * 3 + padding * 2;
        var height = _ih + padding / 2;
        for (var i = 0; i < Math.ceil(this.mainCanvasLayer.width / width) + 1; i++) {
            for (var k = 0; k < Math.ceil(this.mainCanvasLayer.height / height) + 1; k++) {
                var offsetX = 0;
                if (k % 2 != 0) {
                    offsetX = (size * 1 + size / 2 + padding);
                }
                var x = offsetX + i * width;
                var y = k * height;
                var singleComb = new SingleComb(x, y, size);
                this.combs.push(singleComb);
            }
        }

    }
    startAnimationMain() {
        this.mainLayerRequestAnimationFrame = requestAnimationFrame(function() {
            this.startAnimationMain();
        }.bind(this));

        this.drawMain();
    }
    stopAnimationMain() {
        cancelAnimationFrame(this.mainLayerRequestAnimationFrame);
    }
    drawBg() {
        var ctx = this.bgCtxCtxLayer;
        ctx.save();
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }
    checkComb(XY_Array) {
        var x = XY_Array[0],
            y = XY_Array[1];
        var ctx = this.mainCtxCtxLayer;
        var comb = {};
        for (var i = 0; i < this.combs.length; i++) {
            ctx.save();
            this.combs[i].emitPath(ctx);
            if (ctx.isPointInPath(x, y)) {
                comb = this.combs[i];
                break;
            }
            ctx.restore();
        }
        return comb;
    }
    drawMain() {
        const ctx = this.mainCtxCtxLayer;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (var i = 0; i < this.combs.length; i++) {
            this.combs[i].draw(ctx);
        }
    }
}

export default Comb;
