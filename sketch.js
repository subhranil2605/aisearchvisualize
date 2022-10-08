let a;

var rows;
var cols;
var w = 20;
var graph = {};
var graphProblem;
var node;
var frontier;
var frontier_astar;
var frontier_greedy;
var frontier_ucs;
var ord = "min";
var cells = [];
let trails = [];
let createWall = true;
let started = false;

// starting coordinates
let rStart;
let cStart;

// goal's coordinates
let rGoal;
let cGoal;

let a_f = (n) => n.pathCost + graphProblem.h(n.state); // a-start
let g_f = (n) => graphProblem.h(n.state); // greddy best-first
let u_f = (n) => n.depth; // ucs

function setup() {
  createCanvas(600, 600);
  rows = floor(width / w);
  cols = floor(height / w);
  // frameRate(5);

  // generating graph values
  generateGraph();

  // creating nodes
  createNodes();

  rStart = 5;
  cStart = cols / 2;
  rGoal = 16;
  cGoal = cols / 2;

  let start = createVector(rStart, cStart);
  let goal = createVector(rGoal, cGoal);

  var graphSpace = new Graph(graph);

  graphProblem = new GraphProblem(graphSpace, start, goal);

  node = cells[rStart * cols + cStart];

  frontier = [node];

  frontier_astar = new PriorityQueue(ord, a_f);
  frontier_astar.append(node);

  frontier_greedy = new PriorityQueue(ord, g_f);
  frontier_greedy.append(node);

  frontier_ucs = new PriorityQueue(ord, u_f);
  frontier_ucs.append(node);
}

function draw() {
  background(51);

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
  } else if (a === "Uniform Cost Search") {
    uniformCostSearch();
  } else if (a === "Greedy Best-First Search") {
    greedyBestFirstSearch();
  } else if (a === "A-Star Search") {
    astar();
  } else if (a === "cleared") {
    // it does nothing
    let xyz = 15;
  } else {
    fill(255);
    textSize(32);
    text("Please select an algorithm", 10, 50);
  }

  // start
  fill(0, 0, 255);
  rect(rStart * w, cStart * w, w, w);

  // goal
  fill(255, 0, 0);
  rect(rGoal * w, cGoal * w, w, w);
}

// visualize selection from document
function getText() {
  started = true;
  a = sBtnText.innerText;
  console.log(a);
  clearField();

  // current locaton of the start node
  node = cells[rStart * cols + cStart];
  frontier = [node];
  frontier_ucs.append(node);
  frontier_greedy.append(node);
  frontier_astar.append(node);

  redraw();
  loop();
}

// creating the grid
function createNodes() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var pt = createVector(i, j);
      var n = new Node(pt);
      cells.push(n);
    }
  }
}

// clear the grid
function clearField() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      cells[i * cols + j].visited = false;
    }
  }
  // reset the frontier
  frontier = [];
  frontier_astar = new PriorityQueue(ord, a_f);
  frontier_greedy = new PriorityQueue(ord, g_f);
  frontier_ucs = new PriorityQueue(ord, u_f);
}

// clear the wall
function clearPath() {
  started = false;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      cells[i * cols + j].obstacle = false;
      cells[i * cols + j].visited = false;
    }
  }

  node = cells[rStart * cols + cStart];
  frontier = [];
  frontier_astar = new PriorityQueue(ord, a_f);
  frontier_greedy = new PriorityQueue(ord, g_f);
  frontier_ucs = new PriorityQueue(ord, u_f);
  a = "cleared";
  redraw();
  loop();
}

// generating graph for the grid search problem
function generateGraph() {
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
}

// adding wall
function mouseClicked() {
  if (createWall && !started) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      let x = floor(mouseX / w);
      let y = floor(mouseY / w);
      let c = cells[x * cols + y];

      if (x * cols + y != rGoal * cols + cGoal) {
        if (c.obstacle) {
          c.obstacle = false;
        } else {
          c.obstacle = true;
        }
      } else {
        console.log("goal cannot be wall");
        // c.obstacle = false;
      }
    }
  }
}

// change the start and goal position with mouse
function mouseDragged() {
  if (!started) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      let x = floor(mouseX / w);
      let y = floor(mouseY / w);
      let c = cells[x * cols + y];

      if (x * cols + y != rGoal * cols + cGoal) {
        c.obstacle = true;
        trails.push(createVector(x, y));
      } else {
        trails.push(createVector(x, y));
        console.log("on target");
      }

      if (trails.length > 0) {
        if (trails[0].x * cols + trails[0].y === rGoal * cols + cGoal) {
          createWall = false;
          rGoal = trails[trails.length - 1].x;
          cGoal = trails[trails.length - 1].y;
          cells[rGoal * cols + cGoal].obstacle = false;
          graphProblem.goal = createVector(rGoal, cGoal);
        } else if (
          trails[0].x * cols + trails[0].y ===
          rStart * cols + cStart
        ) {
          createWall = false;
          rStart = trails[trails.length - 1].x;
          cStart = trails[trails.length - 1].y;
          cells[rStart * cols + cStart].obstacle = false;
          graphProblem.initial = createVector(rStart, cStart);
        } else {
          createWall = true;
        }
      }
    }
  }
}

function mouseReleased() {
  trails = [];
}
