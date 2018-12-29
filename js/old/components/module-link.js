import Component from './component.js';

class Module {
    constructor() {
        this.width = 18;
        this.height = 6;
        this.x = 0;
        this.y = 0;
        this.name = '';
        this.isChecked = false;
        this.color = 'hsla(60, 80%, 50%, 1)';
        this.resetSpeed();
    }
    emitPath(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
    resetSpeed() {
        this.speedX = -2 + Math.random() * 4;
        this.speedY = -2 + Math.random() * 4;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.save();
        this.emitPath(ctx);
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.font = 'normal normal 12px "微软雅黑"';
        ctx.textBaseline = 'middle';
        var offset = 4;
        var textOffsetX = -(this.width / 2 + offset);
        ctx.textAlign = 'right';
        var textOffsetY = 0;
        if (this.infoDir > 0) {
            textOffsetX = (this.width / 2 + offset);
            ctx.textAlign = 'left';
        }
        ctx.fillText(parseInt(this.y), textOffsetX, textOffsetY);
        ctx.restore();
    }
}

class ModuleLink {
    constructor(wrap) {
        var isMouseDown = false;
        this.component = new Component(wrap, {
            onMouseDown: function(XY_Array) {
                isMouseDown = true;
                this.startAnimationMain();
                this.checkedModule = this.checkModule(XY_Array);
                if (this.checkedModule) {
                    this.checkedModule.isChecked = true;
                }
            }.bind(this),
            onMouseMove: function(XY_Array) {
                if (!isMouseDown) return;
                if (this.checkedModule) {
                    // this.checkedModule.x = XY_Array[0];
                    this.checkedModule.y = XY_Array[1];
                }
            }.bind(this),
            onMouseUp: function() {
                isMouseDown = false;
                this.stopAnimationMain();
                if (this.checkedModule) {
                    this.checkedModule.isChecked = false;
                    delete this.checkedModule;
                }
            }.bind(this)
        });
        this.component.createCanvasLayer();
        this.component.createCanvasLayer();
        this.bgCanvasLayer = this.component.layerManager[0].canvas;
        this.bgCtxLayer = this.component.layerManager[0].ctx;
        this.mainCanvasLayer = this.component.layerManager[1].canvas;
        this.mainCtxLayer = this.component.layerManager[1].ctx;
        this.modules = {};
        this.center = [this.mainCanvasLayer.width / 2, this.mainCanvasLayer.height / 2];
        var module = null;
        for (let i = 1; i < 12; i++) {
            module = new Module();
            module.x = this.center[0] - this.mainCanvasLayer.width * 0.2;
            module.y = this.center[1] + (i % 2 == 0 ? -(i * 10) : (i * 10));
            module.to = 'k' + i;
            module.name = 'm' + i;
            module.color = 'hsla(0, 100%, 50%, 1)';
            this.modules['m' + i] = module;
        }
        for (let i = 1; i < 12; i++) {
            module = new Module();
            module.x = this.center[0] + this.mainCanvasLayer.width * 0.2;
            module.y = this.center[1] + (i % 2 == 0 ? -(i * 10) : (i * 10));
            module.name = 'k' + i;
            module.color = 'hsla(60, 100%, 50%, 1)';
            this.modules['k' + i] = module;
        }
        this.mainLayerRequestAnimationFrame;
        this.drawBg();
        this.drawMain();
    }
    startAnimationMain() {
        this.mainLayerRequestAnimationFrame = requestAnimationFrame(function() {
            this.startAnimationMain();
        }.bind(this));

        this.drawBg();
        this.drawMain();
    }
    stopAnimationMain() {
        cancelAnimationFrame(this.mainLayerRequestAnimationFrame);
    }
    checkModule(_a_XY) {
        var ctx = this.mainCtxLayer;
        var checkedModule;
        for (let i in this.modules) {
            var module = this.modules[i];
            ctx.save();
            module.emitPath(ctx);
            if (ctx.isPointInPath(_a_XY[0], _a_XY[1])) {
                checkedModule = module;
                break;
            }
            ctx.restore();
        }
        return checkedModule;
    }
    drawBg() {
        var ctx = this.bgCtxLayer;
        ctx.save();
        ctx.fillStyle = 'hsla(0, 0%, 15%, 1)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }
    drawMain() {
        this.center = [this.mainCanvasLayer.width / 2, this.mainCanvasLayer.height / 2];

        var ctx = this.mainCtxLayer;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.save();
        for (let i in this.modules) {
            var from = this.modules[i];
            if (!this.modules[i].to) continue;
            var to = this.modules[this.modules[i].to];
            if (!to) continue;
            var linearGradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
            linearGradient.addColorStop(0, from.color);
            linearGradient.addColorStop(1, to.color);
            var d = Math.abs(from.x - to.x);
            var c1y = from.y;
            var c2y = to.y;
            var dl = 0.4;
            var c1x, c2x;
            from.infoDir = 1;
            to.infoDir = -1;
            if (from.x < to.x) {
                c1x = from.x + d * dl;
                c2x = to.x - d * dl;
                from.infoDir = -1;
                to.infoDir = 1;
            } else {
                c1x = from.x - d * dl;
                c2x = to.x + d * dl;
            }
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.bezierCurveTo(c1x, c1y, c2x, c2y, to.x, to.y);
            ctx.strokeStyle = linearGradient;
            ctx.stroke();
        }
        ctx.restore();

        for (let i in this.modules) {
            var module = this.modules[i];
            ctx.save();
            module.draw(ctx);
            ctx.restore();
        }
    }
}

export default ModuleLink;
