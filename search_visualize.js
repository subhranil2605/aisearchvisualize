// breadth-first search
function bfsVisualize() {
  if (frontier) {
    node = frontier.shift();

    // visiting nodes becomes visited true
    cells[node.state.x * cols + node.state.y].visited = true;

    // if (node.state.x === rGoal && node.state.y === cGoal) {
    //   noLoop();
    //   // showing the path from start to goal
    //   node.path().forEach((element) => {
    //     element.goal();
    //   });
    // }

    for (var child of node.expand(graphProblem)) {
      if (
        !frontier.includes(child) &&
        !cells[child.state.x * cols + child.state.y].visited &&
        !cells[child.state.x * cols + child.state.y].obstacle
      ) {
        if (graphProblem.isGoal(child.state)) {
          noLoop();
          // showing the path from start to goal
          child.path().forEach((element) => {
            element.goal();
          });
          break;
        }
        frontier.push(child);
        fill(255, 255, 0);
        rect(child.state.x * w, child.state.y * w, w, w);
        cells[child.state.x * cols + child.state.y].visited = true;
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

    // append the current node in the cells
    cells[node.state.x * cols + node.state.y].visited = true;

    if (graphProblem.isGoal(node.state)) {
      noLoop();
      node.path().forEach((e) => e.goal());
    }

    node.highlight();
    for (var child of node.expand(graphProblem)) {
      if (
        !frontier.includes(child) &&
        !cells[child.state.x * cols + child.state.y].visited &&
        !cells[child.state.x * cols + child.state.y].obstacle
      ) {
        frontier.push(child);

        // fill(245, 100, 100);
        // rect(child.state.x * w, child.state.y * w, w, w);
      }
    }
  }
  return null;
}

function best_first_search(frontier_1, f) {
  if (frontier_1.heap) {
    node = frontier_1.pop();

    node.highlight();

    if (graphProblem.isGoal(node.state)) {
      noLoop();
      node.path().forEach((e) => e.goal());
    }

    // explored
    cells[node.state.x * cols + node.state.y].visited = true;

    for (var child of node.expand(graphProblem)) {
      if (
        !frontier_1.include(child) &&
        !cells[child.state.x * cols + child.state.y].visited &&
        !cells[child.state.x * cols + child.state.y].obstacle
      ) {
        frontier_1.append(child);
      } else if (frontier_1.include(child)) {
        let incumbent = frontier_1.getItem(child);
        if (f(child) < incumbent) {
          frontier_1.deleteItem(child);
          frontier_1.append(child);
        }
      }
    }
  }
  return null;
}

// uniform cost search
function uniformCostSearch() {
  best_first_search(frontier_ucs, u_f);
}

// greedy best first search
function greedyBestFirstSearch() {
  best_first_search(frontier_greedy, g_f);
}

// A* search
function astar() {
  best_first_search(frontier_astar, a_f);
}
