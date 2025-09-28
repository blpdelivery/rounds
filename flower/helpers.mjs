// random
export function randomInt(min, max) {
  const minCeiled = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - minCeiled + 1) + minCeiled);
}
export function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
export function randomColor(alpha) {
  return `rgb(${randomInt(0, 255)} ${randomInt(0, 255)} ${randomInt(0, 255)} / ${alpha}%)`;
}

// dom
export function setAttributes(el, attrs) {
  for (const attr in attrs) {
    el.setAttribute(attr, attrs[attr]);
  }
}
export function $(query, target = document) {
  return target.querySelector(query);
}
export function $all(query, target = document) {
  return target.querySelectorAll(query);
}

// viewport
export function vh(percent = 100) {
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * height) / 100;
}
export function vw(percent = 100) {
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (percent * width) / 100;
}
export function vmin(percent = 100) {
  return Math.min(vh(percent), vw(percent));
}
export function vmax(percent = 100) {
  return Math.max(vh(percent), vw(percent));
}
