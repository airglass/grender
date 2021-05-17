export class Element extends grender.Renderable {
  #size = 10;
  constructor(params) {
    super(params);
    this.path = new Path2D();
    this.centerX = (params && params.centerX) || 0;
    this.centerY = (params && params.centerY) || 0;
    this.#size = (params && params.size) || 100;
    this.t = (params && params.t) || 0;
    this.hue = (params && params.hue) || 0;
    this.step = (params && params.step) || 0.1;

    this.sizeProgress = new grender.Progress(0, this.#size, this.t, this.step);
    this.opacityProgress = new grender.Progress(0, 1, this.t, this.step);
  }
  set size(size) {
    this.sizeProgress = new grender.Progress(0, size, this.t, this.step);
    this.opacityProgress = new grender.Progress(0, 1, this.t, this.step);
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.centerX, this.centerY);

    const path = new Path2D();
    path.arc(0, 0, this.sizeProgress.value, 0, Math.PI * 2);

    ctx.fillStyle = `hsla(${this.hue}, 90%, 50%, ${
      .8 - this.opacityProgress.value
    })`;
    ctx.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${
      this.opacityProgress.value < 0.5 ? 0.8 : 1 - this.opacityProgress.value
    })`;
    ctx.lineWidth = 4;
    ctx.fill(path);
    ctx.stroke(path);
    ctx.restore();

    this.sizeProgress.drive();
    this.opacityProgress.drive();
  }
}

export class Elements extends grender.Renderable {
  #size = 0;
  #hue = 0;
  constructor(params) {
    super(params);
    this.path = new Path2D();
    this.centerX = (params && params.centerX) || 0;
    this.centerY = (params && params.centerY) || 0;
    this.#size = (params && params.size) || 100;
    this.#hue = (params && params.hue) || 0;
    this.step = (params && params.step) || 0.1;
    this.tilt = (params && params.tilt) || 1;

    this.all = [];
    const num = 3;
    for (let i = 0; i < num; i++) {
      this.all.push(
        new Element({
          centerX: 0,
          centerY: 0,
          size: this.#size,
          hue: this.#hue,
          step: this.step,
          t: +(1 / num).toFixed(2) * i,
        })
      );
    }
  }
  set size(size) {
    this.all.forEach((ele) => {
      ele.size = size;
    });
  }
  set hue(hue) {
    this.all.forEach((ele) => {
      ele.hue = hue;
    });
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.centerX, this.centerY);
    ctx.scale(1, this.tilt);
    this.all.forEach((ele) => {
      ele.draw(ctx);
    });
    ctx.restore();
  }
}
