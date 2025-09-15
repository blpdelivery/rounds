---
---

function randomInt(min, max) {
  const minCeiled = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - minCeiled + 1) + minCeiled);
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

/*function randomColor(alpha) {
  return `rgb(${randomInt(0, 255)} ${randomInt(0, 255)} ${randomInt(0, 255)} / ${alpha}%)`;
}*/

const ns = "http://www.w3.org/2000/svg",
  svg = document.createElementNS(ns, "svg"),
  ellipse = document.createElementNS(ns, "ellipse");
  
svg.setAttribute("viewBox", "-9 -9 18 18");

ellipse.setAttribute("opacity", "var(--logo-opacity)");
ellipse.setAttribute("id", "ellipse");

let count = randomInt(5, 7),
  rx = randomNumber(3, 6),
  ry = randomNumber(3, 8),
  colorChange = false,
  color = "var(--logo-color)";

let copies = [];

function drawFlower() {
  copies = [];

  copies.push(ellipse);
  ellipse.setAttribute("fill", color);
  ellipse.setAttribute("rx", rx);
  ellipse.setAttribute("ry", ry);
  ellipse.setAttribute("cy", -(8 - ry));
    
  for (let iteration = 1; iteration < count; iteration++) {
    const copy = document.createElementNS(ns, "use");
    copy.setAttribute("href", "#" + ellipse.id)
    copy.setAttribute("transform", `rotate(${360 / count * iteration})`);
    copies.push(copy);
  }
    
  svg.replaceChildren(...copies);
}

drawFlower();

window.addEventListener("mousemove", (ev) => {
  rx = ev.x / (window.innerWidth / 3) + 3;
  ry = ev.y / (window.innerHeight / 4) + 4;
  drawFlower();
});

const validHexChar = /[0-9a-f]/i;
window.addEventListener("keydown", (ev) => {
  if (colorChange) {
    colorChange = validHexChar.test(ev.key)
      ? colorChange + ev.key
      : false;
    if (colorChange.length === 6) {
      color = "#" + colorChange;
      colorChange = false;
    }
  }
  
  switch (ev.key) {
    case "+":
      count++;
      drawFlower();
      break;
    case "-":
      count -= count === 1 ? 0 : 1;
      break;
    case "#":
      colorChange = true;
      break;
  }
});

document.getElementById("logo").replaceChildren(svg);
