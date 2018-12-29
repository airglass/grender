import Component from './component';
import ColorSelector from './color-selector';

class Pen {
    constructor(ctx) {
        this.size = 3;
        this.color = 'rgba(0, 0%, 10%, 1)';
        this.ctx = ctx;
        this.isPen = true;
    }
    startDraw(p) {
        this.lastX = p[0];
        this.lastY = p[1];
    }
    endDraw() {
        delete this.lastX;
        delete this.lastY;
    }
    drawDot(p) {
        const x = p[0];
        const y = p[1];
        var ctx = this.ctx;

        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        if (this.isPen) {
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2, true);
            ctx.fillStyle = this.color;
            ctx.fill();
        } else {
            var size = this.size;
            ctx.clearRect(size / 2, size / 2, size, size);
        }
        ctx.restore();

    }
    drawLine(p) {
        const x = p[0];
        const y = p[1];
        const lastX = this.lastX;
        const lastY = this.lastY;
        var ctx = this.ctx;

        ctx.save();
        if (this.isPen) {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.lineWidth = this.size;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = this.color;
            ctx.stroke();
        } else {
            var size = this.size;
            ctx.clearRect(x - size / 2, y - size / 2, size, size);
        }
        ctx.restore();
        this.lastX = x;
        this.lastY = y;
    }
}

class Doodle {
    constructor(wrap, _option) {
        this.onExport = _option && _option.onExport;

        wrap.classList.add('doodle-wrap');

        var isMouseDown = false;
        this.component = new Component(wrap, {
            onMouseDown: function(XY_Array) {
                isMouseDown = true;
                this.pen.startDraw(XY_Array);
                this.pen.drawDot(XY_Array);
            }.bind(this),
            onMouseMove: function(XY_Array) {
                if (!isMouseDown) return;
                this.pen.drawLine(XY_Array);
            }.bind(this),
            onMouseUp: function() {
                isMouseDown = false;
                this.pen.endDraw();
            }.bind(this),
            onWindowResize: function() {

            }.bind(this)
        });
        this.component.createCanvasLayer();
        this.component.createCanvasLayer();
        this.bgCanvasLayer = this.component.layerManager[0].canvas;
        this.bgCtxCtxLayer = this.component.layerManager[0].ctx;
        this.mainCanvasLayer = this.component.layerManager[1].canvas;
        this.mainCtxCtxLayer = this.component.layerManager[1].ctx;
        this.createTools(wrap);
        this.createBase64Btn();
        this.createPenBtn();
        this.createEraserBtn();
        this.createSizeBtn();
        this.createColorSelector();


        this.mainLayerRequestAnimationFrame;
        this.isPen = true;
        this.isEraser = false;
        this.pen = new Pen(this.mainCtxCtxLayer);

        this.drawBg();
    }
    createTools(wrap) {
        this.tools = document.createElement('div');
        this.tools.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        }, false);
        this.tools.addEventListener('mousemove', (e) => {
            e.stopPropagation();
        }, false);
        this.tools.style.cssText =
			'';
        this.tools.classList.add('tools-wrap');
        wrap.appendChild(this.tools);
    }
    createBase64Btn() {
        var ele = this.btnCreateBase64 = document.createElement('div');
        this.tools.appendChild(ele);
        ele.classList.add('tool-btn');
        ele.innerText = '导出';
        ele.addEventListener('mousedown', () => {
            this.onExport(this.getBase64());
        }, false);
    }
    createPenBtn() {
        var ele = this.btnCreatePen = document.createElement('div');
        this.tools.appendChild(ele);
        ele.classList.add('tool-btn');
        ele.innerText = '钢笔';
        ele.addEventListener('mousedown', () => {
            this.pen.isPen = true;
        }, false);
    }
    createEraserBtn() {
        var ele = this.btnCreatePen = document.createElement('div');
        this.tools.appendChild(ele);
        ele.classList.add('tool-btn');
        ele.innerText = '橡皮';
        ele.addEventListener('mousedown', () => {
            this.pen.isPen = false;
        }, false);
    }
    createSizeBtn() {
        var that = this;
        var ele = this.btnCreatePen = document.createElement('div');
        this.tools.appendChild(ele);
        ele.classList.add('tool-btn');
        ele.classList.add('size-change-wrap');

        for (let i = 1; i < 6; i++) {
            var e = document.createElement('div');
            e.dataset.size = 3 * i;
            e.classList.add('size-change-btn');
            e.addEventListener('mousedown', function() {
                that.pen.size = this.dataset.size;
            }, false);
            ele.appendChild(e);
        }
    }
    createColorSelector() {
        var ele = this.btnCreatePen = document.createElement('div');
        this.tools.appendChild(ele);
        ele.classList.add('color-selector');
        this.colorSelector = new ColorSelector(ele, {
            onSelected: function(r, g, b) {
                this.pen.color = `rgb(${r},${g},${b})`;
            }.bind(this)
        });
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
        const ctx = this.bgCtxCtxLayer;
        ctx.save();
        ctx.fillStyle = 'hsla(0, 0%, 100%, 1)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }
    getBase64() {
        this.bgCtxCtxLayer.drawImage(this.mainCanvasLayer, 0, 0);
        var base64 = this.bgCanvasLayer.toDataURL('image/jpeg');
        this.drawBg();
        return base64;
    }
    drawMain() {

    }
}

export default Doodle;
