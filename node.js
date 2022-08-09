class Node {
  constructor(state, parent = null, action = null) {
    this.state = state;
    this.parent = parent;
    this.action = action;
    this.visited = false;
    this.obstacle = false;
  }

  expand(problem) {
    var result = [];
    for (var action of problem.actions(this.state)) {
      result.push(this.childNode(problem, action));
    }
    return result;
  }

  checkNeighbor(problem) {
    var neighbors = this.expand(problem);
    return neighbors[floor(random() * neighbors.length)];
  }

  childNode(problem, action) {
    var nextState = problem.result(this.state, action);
    var nextNode = new Node(nextState, this, action);
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
