class GraphProblem {
  constructor(graph, initial, goal = null) {
    this.graph = graph;
    this.initial = initial;
    this.goal = goal;
  }

  // create neighbors here top right bottom left
  actions(state) {
    return this.graph.gets(state);
  }

  // path cost
  pathCost(cost_so_far, A, B) {
    return cost_so_far + 1;
  }

  // goal test
  isGoal(state) {
    return state.x === this.goal.x && state.y === this.goal.y;
  }

  // heuristic value
  h(node) {
    let heuristic_value = dist(node.x, node.y, this.goal.x, this.goal.y); 
    return heuristic_value
  }
}
