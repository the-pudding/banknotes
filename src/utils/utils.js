export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function randBw(min, max) {
  return Math.random() * (max - min) + min;
}

// get rand Int value between min, max (inclusive)
export function randIntBw(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// get random value from supplied array
export function randFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// map input value to new range
export function map(val, inputMin, inputMax, outputMin, outputMax) {
  return (outputMax - outputMin) * ((val - inputMin) / (inputMax - inputMin)) + outputMin;
}

// LERP: linear interpolation
export function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}

// cosine interpolate between val1, val2, at progress (range 0-1)
export function cosineInterpolate(val1, val2, progress) {
  const m2 = (1 - Math.cos(progress * Math.PI)) / 2;
  return val1 * (1 - m2) + val2 * m2;
}

// clamp/constrain value to min/max range
export function clamp(val, min, max) {
  return Math.max(Math.min(val, max), min);
}

// given 1D index, return 2D indices based on given 2D array size
export function idx2D(idx, xSize, ySize) {
  let x = idx % xSize;
  let y = Math.floor(idx / ySize);
  return { x: x, y: y };
}

// given 2D index, return the corresponding 1D index
export function idx1D(xIdx, yIdx, xSize) {
  return xIdx + xSize * yIdx;
}

// convert degrees to radians
export function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// convert radians to degrees
export function rad2deg(rad) {
  return rad * (180 / Math.PI);
}

// get random color
export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// test if number is between range (inclusive)
export function isBetween(val, min, max) {
  return val >= min && val <= max;
}

// given an array of X values, return array of non-overlapping y-values
// adapted from: https://observablehq.com/@d3/beeswarm
export function dodge(X, radius) {
  const Y = new Float64Array(X.length);
  const radius2 = radius ** 2;
  const epsilon = 1e-3;
  let head = null,
    tail = null;

  // Returns true if circle ⟨x,y⟩ intersects with any circle in the queue.
  function intersects(x, y) {
    let a = head;
    while (a) {
      const ai = a.index;
      if (radius2 - epsilon > (X[ai] - x) ** 2 + (Y[ai] - y) ** 2) return true;
      a = a.next;
    }
    return false;
  }

  // Place each circle sequentially.
  for (const bi of [...Array(X.length).keys()].sort((i, j) => X[i] - X[j])) {
    // Remove circles from the queue that can’t intersect the new circle b.
    while (head && X[head.index] < X[bi] - radius2) head = head.next;

    // Choose the minimum non-intersecting tangent.
    if (intersects(X[bi], (Y[bi] = 0))) {
      let a = head;
      Y[bi] = Infinity;
      do {
        const ai = a.index;
        let y = Y[ai] + Math.sqrt(radius2 - (X[ai] - X[bi]) ** 2);
        if (y < Y[bi] && !intersects(X[bi], y)) Y[bi] = y;
        a = a.next;
      } while (a);
    }

    // Add b to the queue.
    const b = { index: bi, next: null };
    if (head === null) head = tail = b;
    else tail = tail.next = b;
  }

  return Y;
}
