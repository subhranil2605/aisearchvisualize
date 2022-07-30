function bfs(problem) {
  var node = new Node(problem.initial);

  if (problem.isGoal(node.state)) {
    return node;
  }

  var frontier = [node];
  var explored = new Set();

  while (frontier) {
    node = frontier.shift();
    explored.add(node.state);

    for (var child of node.expand(problem)) {
      if (!explored.has(child.state) && !frontier.includes(child)) {
        if (problem.isGoal(child.state)) {
          return child.path();
        }
        frontier.push(child);
      }
    }
  }
}

