class Component {
    constructor(_wrap, _event) {
        this.wrap = _wrap || document.body;
        var _wrapOffsetLeft = _wrap.offsetLeft;
        var _wrapOffsetTop = _wrap.offsetTop;
        this.wrapStyle = {
            width: _wrap.dataset.width,
            height: _wrap.dataset.height
        };
        // 获取用户的 data-** 属性
        for (let p in this.wrapStyle) {
            this.wrap.style[p] = this.wrapStyle[p];
        }
        this.layerManager = {};
        this.layerIndex = 0;
        window.addEventListener('resize', function() {
            this.onWindowResize();
            _event && _event.onWindowResize && _event.onWindowResize();
        }.bind(this), false);
        var getEventXY = function(e) {
            var x, y;
            if ('touches' in e) {
                x = (e.touches[0].clientX - _wrapOffsetLeft);
                y = (e.touches[0].clientY - _wrapOffsetTop);
            } else {
                x = e.offsetX;
                y = e.offsetY;
            }
            return [x * devicePixelRatio, y * devicePixelRatio];
        };
        var eventDown = function(e) {
            e.preventDefault();
            _event && _event.onMouseDown && _event.onMouseDown(getEventXY(e));
        };
        var eventMove = function(e) {
            e.preventDefault();
            _event && _event.onMouseMove && _event.onMouseMove(getEventXY(e));
        };
        var eventUp = function(e) {
            e.preventDefault();
            _event && _event.onMouseUp && _event.onMouseUp();
        };
        this.wrap.addEventListener('mousedown', eventDown, false);
        this.wrap.addEventListener('touchstart', eventDown, false);

        this.wrap.addEventListener('mousemove', eventMove, false);
        this.wrap.addEventListener('touchmove', eventMove, false);

        this.wrap.addEventListener('mouseup', eventUp, false);
        this.wrap.addEventListener('touchend', eventUp, false);
    }
    createCanvasLayer() {
        const canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
        canvas.classList.add('component-canvas');
        canvas.style.zIndex = this.layerIndex;
        this.layerManager[this.layerIndex] = {
            canvas: canvas,
            ctx: ctx
        };
        this.wrap.appendChild(canvas);
        this.layerIndex++;
        this.onWindowResize();
    }
    onWindowResize() {
        const wrapStyle = getComputedStyle(this.wrap);
        const _width = parseInt(wrapStyle.width.slice(0, -2));
        const _height = parseInt(wrapStyle.height.slice(0, -2));
        for (let i in this.layerManager) {
            if (this.layerManager[i].canvas.width != _width || this.layerManager[i].canvas.height != _width) {
                this.layerManager[i].canvas.width = _width * devicePixelRatio;
                this.layerManager[i].canvas.height = _height * devicePixelRatio;
                this.layerManager[i].canvas.style.width = `${_width}px`;
                this.layerManager[i].canvas.style.height = `${_height}px`;
            }
        }
    }
}

export default Component;
