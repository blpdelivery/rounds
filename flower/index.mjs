import { $, $all, setAttributes, vw, vh, vmin } from "./helpers.mjs";

const flower = $("#flower"),
  masterPetal = $("#master-petal"),
  petals = $("#petals");

let petalCount = 6,
  moveType = "r";

function defaultPosition(width = vmin(70)) {
  let rx, cy;
  rx = cy = width / 4;
  setAttributes(masterPetal, { rx, cy: -cy });
}

function drawFlower() {
  let copies = [];
  for (let i = 0; i < petalCount; i++) {
    const copy = document.createElementNS("http://www.w3.org/2000/svg", "use");
    setAttributes(copy, {
      href: "#" + masterPetal.id,
      transform: `rotate(${360 / petalCount * i})`
    });
    copies.push(copy);
  }
  petals.replaceChildren(...copies);
}

defaultPosition();
drawFlower();

// interaction
function changePetalCount(difference) {
  petalCount += difference;
  if (petalCount === 0) {
    petalCount++;
  }
  drawFlower();
}

function move(x, y, type = moveType) {
  const typeIsR = type === "r";
  x -= window.innerWidth / 2;
  y -= window.innerHeight / 2;
  setAttributes(masterPetal, {
    [type + "x"]: typeIsR ? Math.abs(x) : x,
    [type + "y"]: typeIsR ? Math.abs(y) : y
  });
}

function touch(ev) {
  switch (ev.touches.length) {
    case 1:
      move(ev.touches.item(0).clientX, ev.touches.item(0).clientY);
      break;
    case 2:
      move(ev.touches.item(0).clientX, ev.touches.item(0).clientY, "c");
      break;
  }
}

flower.addEventListener("mousemove", ev => move(ev.x, ev.y));
flower.addEventListener("mousedown", () => moveType = "c");
flower.addEventListener("mouseup", () => moveType = "r");
flower.addEventListener("mouseleave", () => moveType = "r");

flower.addEventListener("touchstart", touch);
flower.addEventListener("touchmove", touch);

window.addEventListener("keydown", (ev) => {
  switch (ev.key) {
    case "ArrowUp":
      changePetalCount(1);
      break;
    case "ArrowDown":
      changePetalCount(-1);
      break;
  }
});

// buttons
const controls = Object.fromEntries([...$all(".control")].map((control) => [control.id, control]));

controls.addPetal.onclick = () => changePetalCount(1);
controls.subtractPetal.onclick = () => changePetalCount(-1);

// handle resize
function resize() {
  const width = vw(),
    height = vh();
    
  setAttributes(flower, {
    width,
    height,
    viewBox: [-(width / 2), -(height / 2), width, height]
  });
}
resize();
window.addEventListener("resize", resize);
