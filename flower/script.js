// # helper functions
function setAttributes(el, obj) {
  for (const attr in obj) {
    el.setAttribute(attr, obj[attr]);
  }
}

// # global variables
const svg = document.getElementById("svg"),
  masterPetal = document.getElementById("master-petal"),
  petals = document.getElementById("petals");

let petalCount = 6,
  moveType = "r";

function drawFlower(count = petalCount) {
  let copies = [];
  for (let i = 0; i < count; i++) {
    const copy = document.createElementNS("http://www.w3.org/2000/svg", "use");
    setAttributes(copy, {
      href: "#" + masterPetal.id,
      transform: `rotate(${360 / count * i})`
    });
    copies.push(copy);
  }
  petals.replaceChildren(...copies);
}
drawFlower();

// # handle mouse and touch
function move(x, y, type = moveType) {
  let typeIsR = type === "r";
  x = x - innerWidth / 2;
  y = y - innerHeight / 2;
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

// ## mouse
svg.addEventListener("mousemove", ev => move(ev.x, ev.y));
svg.addEventListener("mousedown", () => moveType = "c");
svg.addEventListener("mouseup", () => moveType = "r");
svg.addEventListener("mouseleave", () => moveType = "r");

// ## touch
svg.addEventListener("touchstart", touch);
svg.addEventListener("touchmove", touch);


// # handle keyboard input
function type(ev) {
  switch (ev.key) {
    case "ArrowUp":
      drawFlower(petalCount++);
      break;
    case "ArrowDown":
      drawFlower(petalCount--);
      break;
    case "s":
      capture();
      break;
  }
}
addEventListener("keydown", type);


/* # capture
let captureDialog = document.getElementById("capture"),
  captureImg = document.getElementById("capture-img"),
  captureDownload = document.getElementById("capture-download"),
  captureURL = "";

function capture() {
  URL.revokeObjectURL(captureURL);
  
  captureURL = URL.createObjectURL(new File([svg.outerHTML], "flower.svg", {
    type: "image/svg+xml"
  }));
  
  captureImg.src = captureURL;
  captureDownload.href = captureURL;
  
  captureDialog.show();
}
*/


// # handle resize
function resizeCont() {
  setAttributes(svg, {
    width: innerWidth,
    height: innerHeight,
    viewBox: `-${innerWidth / 2} -${innerHeight / 2} ${innerWidth} ${innerHeight}`
  });
}
resizeCont();
addEventListener("resize", resizeCont);
