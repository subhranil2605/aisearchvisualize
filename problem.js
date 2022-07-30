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

  result(state, action) {
    return action;
  }

  isGoal(state) {
    return state.x === this.goal.x && state.y === this.goal.y;
  }
}
