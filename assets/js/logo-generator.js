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

ellipse.setAttribute("fill", "var(--logo-color)");
ellipse.setAttribute("opacity", "var(--logo-opacity)");
ellipse.setAttribute("id", "ellipse");

let count = randomInt(5, 7),
  rx = randomNumber(3, 6),
  ry = randomNumber(3, 8);

let copies = [];

function drawFlower() {
  copies = [];

  copies.push(ellipse);
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

addEventListener("mousemove", (ev) => {
  rx = ev.x / 6;
  ry = ev.y / 8;
  drawFlower();
});

document.getElementById("logo").replaceChildren(svg);
