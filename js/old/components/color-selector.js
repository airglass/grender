import Component from './component.js';

class ColorPointer {
    constructor() {
        this.actived = false;
        this.color = 'hsla(0, 0%, 0%, 1)';
        this.x = 0;
        this.y = 0;
        this.size = 10;
    }
    draw(ctx, color, x, y) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!this.actived) return;

        this.color = color;
        this.x = x;
        this.y = y;

        ctx.save();
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowColor = 'hsla(0, 0%, 0%, .1)';
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'hsla(0, 0%, 100%, 1)';
        ctx.stroke();
        ctx.restore();
    }
}

class ColorSelector {
    constructor(wrap, _option) {
        this.onSelected = _option && _option.onSelected;
        var isMouseDown = false;
        this.component = new Component(wrap, {
            onMouseDown: function(XY_Array) {
                isMouseDown = true;
                this.checkColorByXY(XY_Array);
            }.bind(this),
            onMouseMove: function(XY_Array) {
                if (!isMouseDown) return;
                this.checkColorByXY(XY_Array);
            }.bind(this),
            onMouseUp: function() {
                isMouseDown = false;
                this.colorPointer.actived = false;
            }.bind(this)
        });
        this.component.createCanvasLayer();
        this.component.createCanvasLayer();
        this.colorCanvasLayer = this.component.layerManager[0].canvas;
        this.colorCtxLayer = this.component.layerManager[0].ctx;
        this.pointerCanvasLayer = this.component.layerManager[1].canvas;
        this.pointerCtxLayer = this.component.layerManager[1].ctx;
        this.mainLayerRequestAnimationFrame;
        this.colorPointer = new ColorPointer();
        var _padding = 0;
        var _borderWidth = 0;
        var _width = this.colorCanvasLayer.width - (_padding + _borderWidth / 2) * 2;
        var _height = this.colorCanvasLayer.height - (_padding + _borderWidth / 2) * 2;
        this.colorSelectorInfo = {
            x: _padding + _borderWidth / 2,
            y: _padding + _borderWidth / 2,
            padding: _padding,
            borderWidth: _borderWidth,
            width: _width,
            height: _height,
            colorPanelWidth: _width - _borderWidth,
            colorPanelHeight: _height - _borderWidth
        };
        this.reDrawColorSelector();
    }
    startAnimationMain() {
        this.mainLayerRequestAnimationFrame = requestAnimationFrame(function() {
            this.startAnimationMain();
        }.bind(this));
    }
    stopAnimationMain() {
        cancelAnimationFrame(this.mainLayerRequestAnimationFrame);
    }
    checkColorByXY(xy_array) {
        var x = xy_array[0],
            y = xy_array[1],
            padding = this.colorSelectorInfo.padding,
            borderWidth = this.colorSelectorInfo.borderWidth,
            layerWidth = this.colorCanvasLayer.width,
            height = this.colorSelectorInfo.height;
        this.colorPointer.actived = false;
        this.colorPointer.draw(this.pointerCtxLayer);
        if (x <= (padding + borderWidth)) return;
        if (x >= (layerWidth - padding - borderWidth)) return;
        if (y <= (padding + borderWidth)) return;
        if (y >= (height + padding)) return;
        this.colorPointer.actived = true;

        var imageData = this.colorCtxLayer.getImageData(x, y, 1, 1);
        var rgb = imageData.data;
        var r = rgb[0],
            g = rgb[1],
            b = rgb[2];
        this.colorPointer.draw(this.pointerCtxLayer, 'rgb(' + r + ',' + g + ',' + b + ')', x, y);
        this.onSelected && this.onSelected(r, g, b);
    }
    drawColorSelectorVariableH(_h) {
        var ctx = this.colorCtxLayer;
        var maxL = 100,
            maxS = 100;
        ctx.save();
        ctx.translate(this.colorSelectorInfo.x, this.colorSelectorInfo.y);
        for (var x = 0; x < this.colorSelectorInfo.width; x++) {
            for (var y = 0; y < this.colorSelectorInfo.height; y++) {
                ctx.save();
                ctx.translate(x, y);
                var px = x / this.colorSelectorInfo.width;
                var py = y / this.colorSelectorInfo.height;
                ctx.fillStyle = 'hsl(' + _h + ', ' + (maxS * px) + '%, ' + (100 - maxL * py) + '%)';
                ctx.fillRect(0, 0, 2, 2);
                ctx.restore();
            }
        }
        ctx.save();
        ctx.strokeStyle = 'hsla(0, 0%, 100%, 1)';
        ctx.lineWidth = this.colorSelectorInfo.borderWidth;
        ctx.strokeRect(0, 0, this.colorSelectorInfo.width, this.colorSelectorInfo.height);
        ctx.restore();

        ctx.restore();
    }
    drawColorSelectorVariableS(_s) {
        var ctx = this.colorCtxLayer;
        var maxL = 100,
            maxH = 360,
            _borderWidth = this.colorSelectorInfo.borderWidth,
            _x = this.colorSelectorInfo.x,
            _y = this.colorSelectorInfo.y,
            _width = this.colorSelectorInfo.width,
            _height = this.colorSelectorInfo.height,
            _colorPanelWidth = this.colorSelectorInfo.colorPanelWidth,
            _colorPanelHeight = this.colorSelectorInfo.colorPanelHeight;


        ctx.save();
        ctx.translate(_x, _y);

        for (var x = 0; x < _colorPanelWidth; x++) {
            for (var y = 0; y < _colorPanelHeight; y++) {
                ctx.save();
                ctx.translate(_borderWidth / 2 + x, _borderWidth / 2 + y);
                var px = x / _colorPanelWidth;
                var py = y / _colorPanelHeight;
                ctx.fillStyle = 'hsl(' + (maxH * px) + ', ' + _s + '%, ' + (100 - maxL * py) + '%)';
                ctx.fillRect(0, 0, 2, 2);
                ctx.restore();
            }
        }

        if (this.colorSelectorInfo.borderWidth) {
            ctx.save();
            ctx.strokeStyle = 'hsla(0, 0%, 100%, 1)';
            ctx.lineWidth = this.colorSelectorInfo.borderWidth;
            ctx.strokeRect(0, 0, _width, _height);
            ctx.restore();
        }

        ctx.restore();
    }
    drawColorSelectorVariableL(_l) {
        var ctx = this.colorCtxLayer;
        var maxH = 360, maxS = 100;

        ctx.save();
        ctx.translate(this.colorSelectorInfo.x, this.colorSelectorInfo.y);

        for (var x = 0; x < this.colorSelectorInfo.width; x++) {
            for (var y = 0; y < this.colorSelectorInfo.height; y++) {
                ctx.save();
                ctx.translate(this.colorSelectorInfo.x, this.colorSelectorInfo.y);
                var px = x / this.colorSelectorInfo.width;
                var py = y / this.colorSelectorInfo.height;
                ctx.fillStyle = 'hsl(' + maxH * px + ', ' + (100 - maxS * py) + '%, ' + _l + '%)';
                ctx.fillRect(0, 0, 2, 2);
                ctx.restore();
            }
        }

        ctx.save();
        ctx.strokeStyle = 'hsla(0, 0%, 100%, 1)';
        ctx.lineWidth = this.colorSelectorInfo.borderWidth;
        ctx.strokeRect(0, 0, this.colorSelectorInfo.width, this.colorSelectorInfo.height);
        ctx.restore();

        ctx.restore();
    }
    reDrawColorSelector() {
        this.drawColorSelectorVariableS(100);
    }
    drawMain() {

    }
}

export default ColorSelector;
