export function maximunInArray(array) {
  return Math.max(...array)
}
export function randomPoint(array, maxPoint) {
  const centerpoint = [];
  for (let index = 0; index < maxPoint; index++) {
    let center = array[Math.floor(Math.random() * array.length)];
    while (centerpoint.indexOf(center) !== -1) {
      center = array[Math.floor(Math.random() * array.length)];
    }
    centerpoint.push(center);
  }
  return centerpoint;
}

export function getRandomRgb(maxColor) {
  const arr = [];
  for (let i = 0; i <maxColor; i++){
    const num = Math.round(0xffffff * Math.random());
    const r = num >> 16;
    const g = (num >> 8) & 255;
    const b = num & 255;
    const color = "rgb(" + r + ", " + g + ", " + b + ")";
    arr.push(color)
  } 
  return arr;
}