// breadth-first search
function bfsVisualize() {
  if (frontier) {
    node = frontier.shift();
    explored.add(node.state);

    // visiting nodes becomes visited true
    cells[node.state.x * cols + node.state.y].visited = true;

    for (var child of node.expand(graphProblem)) {
      if (
        !explored.has(child.state) &&
        !frontier.includes(child) &&
        !cells[child.state.x * cols + child.state.y].visited
      ) {
        if (graphProblem.isGoal(child.state)) {
          noLoop();
          // showing the path from start to goal
          child.path().forEach((element) => {
            element.goal();
          });
        }
        explored.add(child.state);
        frontier.push(child);
        cells[child.state.x * cols + child.state.y].visited = true;
        fill(255, 255, 0);
        rect(child.state.x * w, child.state.y * w, w, w);
      }
    }
  }
  return null;
}

// depth-first search
function dfsVisualize() {
  if (frontier) {
    node = frontier.pop();
    // node.visited = true;
    explored.add(node.state);

    // append the current node in the cells
    cells[node.state.x * cols + node.state.y].visited = true;

    if (graphProblem.isGoal(node.state)) {
      noLoop();
      node.path().forEach((e) => e.goal());
    }

    node.highlight();
    for (var child of node.expand(graphProblem)) {
      if (
        !explored.has(child.state) &&
        !frontier.includes(child) &&
        !cells[child.state.x * cols + child.state.y].visited
      ) {
        frontier.push(child);
        explored.add(child.state);

        // fill(245, 100, 100);
        // rect(child.state.x * w, child.state.y * w, w, w);
      }
    }
  }
  return null;
}
