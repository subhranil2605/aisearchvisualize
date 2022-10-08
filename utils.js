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

// extending elements of a second array to the main array
function extend(mainArr, arr) {
  for (var element of arr) {
    mainArr.push(element);
  }
  return mainArr;
}

// Priority Queue

// push element in the heap
function heapPush(arr, item) {
  arr.push(item);
}

function heapPop(arr) {
  // create a temporary array for storing the priorities
  let temp = [];
  for (let element of arr) {
    temp.push(element.priority);
  }

  // find the most prior element's index from the list
  let c = temp.findIndex((x) => Math.min.apply(Math, temp) === x);
  return arr.splice(c, 1)[0].value; // delete the most prior element and return it
}

function delete_(arr, key) {
  let temp = [];
  for (let element of arr) {
    temp.push(element.value);
  }

  // find the most prior element's index from the list
  let c = temp.findIndex((x) => key === x);
  if (c >= 0) {
    return arr.splice(c, 1);  // delete the element from the heap
  }
}

function contains(arr, key) {
  let isPresent = false;
  for (let element of arr) {
    if (key.state.x === element.value.state.x && key.state.y === element.value.state.y) {
      isPresent = true;
    }
  }
  return isPresent;
}

// Item Class
class Item {
  constructor(priority, value) {
    this.priority = priority;
    this.value = value;
  }
}

class PriorityQueue {
  constructor(order = "min", f = (x) => x) {
    this.heap = [];

    if (order === "min") {
      this.f = f;
    } else if (order === "max") {
      this.f = (x) => -f(x);
    } else {
      console.log("Order must be min or max");
    }
  }

  append(val) {
    // Insert element in the priority queue
    let item = new Item(this.f(val), val);
    heapPush(this.heap, item);
  }

  pop() {
    // Returns the most prior item and remove it from the heap
    if (this.heap.length > 0) {
      return heapPop(this.heap);
    } else {
      console.log("Trying to pop from empty PriorityQueue.");
    }
  }

  extend(items) {
    for (let item of items) {
      this.append(item);
    }
  }

  length() {
    return this.heap.length;
  }

  include(key) {
    let isPresent = contains(this.heap, key);
    return isPresent;
  }

  getItem(key) {
    for (let element of this.heap) {
      if (element.value === key) {
        return element.priority;
      }
    }
  }

  deleteItem(key) {
    delete_(this.heap, key);
  }
}
