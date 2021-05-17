import { Elements } from "./components.js";
import GUI from "./lil-gui.module.min.js";

const DPR = 2;

const ag = new grender.create({
  element: document.querySelector("#app"),
  width: 300,
  height: 300,
  DPR: DPR,
});

const mainRenderer = ag.addRenderer("main");

const params = {
  centerX: (ag.width * DPR) / 2,
  centerY: (ag.height * DPR) / 2,
  size: ag.width / 2,
  hue: 150,
  tilt: 1,
};

const element = new Elements({
  centerX: params.centerX,
  centerY: params.centerY,
  step: 0.01,
  size: params.size,
  hue: params.hue,
  tilt: params.tilt,
});

mainRenderer.scene.children = [element];

function render() {
  requestAnimationFrame(render);
  mainRenderer.reRender();
}
render();

const gui = new GUI();

gui
  .add(params, "centerX")
  .name('位移 X')
  .min(0)
  .max(ag.width * 2)
  .step(1)
  .onChange((value) => {
    element.centerX = value;
  });

gui
  .add(params, "centerY")
  .name('位移 Y')
  .min(0)
  .max(ag.height * 2)
  .step(1)
  .onChange((value) => {
    element.centerY = value;
  });

gui
  .add(params, "size")
  .name('尺寸')
  .min(10)
  .max(ag.width)
  .step(1)
  .onChange((value) => {
    element.size = value;
  });

gui
  .add(params, "hue")
  .name('色相')
  .min(0)
  .max(360)
  .step(1)
  .onChange((value) => {
    element.hue = value;
  });

gui
  .add(params, "tilt")
  .name('倾斜')
  .min(0)
  .max(1)
  .step(0.1)
  .onChange((value) => {
    element.tilt = value;
  });
