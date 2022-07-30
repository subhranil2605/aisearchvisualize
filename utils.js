function topp(a, b) {
  if (a - 1 >= 0) {
    return createVector(a - 1, b);
  }
}

function right(a, b) {
  if (b + 1 <= rows - 1) {
    return createVector(a, b + 1);
  }
}

function bottom(a, b) {
  if (a + 1 <= cols - 1) {
    return createVector(a + 1, b);
  }
}

function left(a, b) {
  if (b - 1 >= 0) {
    return createVector(a, b - 1);
  }
}

function extend(mainArr, arr) {
    for (var element of arr) {
        mainArr.push(element);
    }
    return mainArr;
}