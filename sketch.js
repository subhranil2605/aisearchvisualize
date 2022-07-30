let a;

var rows;
var cols;
var w = 20;
var graph = {};
var graphProblem;
var node;
var frontier;
var explored;
var cells = [];

// starting coordinates
let rStart = 10;
let cStart = 10;

// goal's coordinates
let rGoal = 13;
let cGoal = 15;

function setup() {
  createCanvas(600, 600);
  rows = floor(width / w);
  cols = floor(height / w);

  // generating graph values
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (topp(i, j)) {
        setDefault(graph, createVector(i, j), []).push(topp(i, j));
      }
      if (right(i, j)) {
        setDefault(graph, createVector(i, j), []).push(right(i, j));
      }
      if (bottom(i, j)) {
        setDefault(graph, createVector(i, j), []).push(bottom(i, j));
      }
      if (left(i, j)) {
        setDefault(graph, createVector(i, j), []).push(left(i, j));
      }
    }
  }
  createNodes();

  let start = createVector(rStart, cStart);
  let goal = createVector(rGoal, cGoal);

  var graphSpace = new Graph(graph);
  graphProblem = new GraphProblem(graphSpace, start, goal);

  node = cells[rStart * cols + cStart];
  // node = cells[2];

  frontier = [node];
  explored = new Set();
}

function draw() {
  background(51);
  // fill(255);
  // textSize(32);
  // if (a === "Breadth-First Search") {
  //   text(a, 10, 50);
  // } else if (a === "Depth-First Search") {
  //   text(a, 10, 50);
  // } else {
  //   text("Please select an algorithm", 10, 50);
  // }

  cells.forEach((element) => {
    element.show();
  });

  if (graphProblem.isGoal(node.state)) {
    node.goal();
    return -1;
  }

  // algorithm of visualization

  if (a === "Breadth-First Search") {
    bfsVisualize();
  } else if (a === "Depth-First Search") {
    dfsVisualize();
  } else {
    fill(255);
    text("Please select an algorithm", 10, 50);
  }

  // start
  fill(0, 0, 255);
  rect(graphProblem.initial.x * w, graphProblem.initial.y * w, w, w);

  // goal
  fill(255, 0, 0);
  rect(graphProblem.goal.x * w, graphProblem.goal.y * w, w, w);
}

function getText() {
  a = sBtnText.innerText;
  console.log(a);
  clearField();
  node = cells[rStart * cols + cStart];

  frontier = [node];

  redraw();
  loop();
}

function createNodes() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var pt = createVector(i, j);
      var n = new Node(pt);
      cells.push(n);
    }
  }
}

function clearField() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      cells[i * cols + j].visited = false;
    }
  }
  frontier = [];
  explored = new Set();
}
