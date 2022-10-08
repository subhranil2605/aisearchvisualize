class Node {
  constructor(state, parent = null, pathCost = 0) {
    this.state = state;
    this.parent = parent;
    this.pathCost = pathCost;
    this.depth = 0;
    this.visited = false;
    this.obstacle = false;

    if (parent) {
      this.depth = parent.depth + 1;
    }
  }

  // expand the current node and returns the children
  expand(problem) {
    var result = [];
    for (var action of problem.actions(this.state)) {
      result.push(this.childNode(problem, action));
    }
    return result;
  }

  // neighbours of the current node
  checkNeighbor(problem) {
    var neighbors = this.expand(problem);
    return neighbors[floor(random() * neighbors.length)];
  }

  // child node of the current node
  childNode(problem, action) {
    // var nextState = problem.result(this.state, action);
    var nextNode = new Node(action, this, problem.pathCost(this.pathCost, this.state, action));
    return nextNode;
  }

  path() {
    var node = this;
    var pathBack = [];
    while (node) {
      pathBack.push(node);
      node = node.parent;
    }
    return pathBack.reverse();
  }

  show() {
    var x = this.state.x * w;
    var y = this.state.y * w;
    noFill();
    stroke(255, 20);
    rect(x, y, w, w);

    if (this.visited) {
      fill(255, 100);
      rect(x, y, w, w);
    }

    // wall
    if (this.obstacle) {
      fill(188, 74, 60);
      rect(x, y, w, w);
    }
  }

  goal() {
    var x = this.state.x * w;
    var y = this.state.y * w;
    fill(0, 255, 0);
    rect(x, y, w, w);
  }

  highlight() {
    var x = this.state.x * w;
    var y = this.state.y * w;
    fill(255, 255, 0);
    rect(x, y, w, w);
  }
}
