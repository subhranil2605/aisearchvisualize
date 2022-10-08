class Graph {
  constructor(graphDict = null, directed = true) {
    if (graphDict) {
      this.graphDict = graphDict;
    } else {
      this.graphDict = {};
    }
    this.directed = directed;

    if (!directed) {
      this.makeUndirected();
    }
  }

  makeUndirected() {
    for (var parent of Object.keys(this.graphDict)) {
      for (var child of this.graphDict[parent]) {
        if (child in this.graphDict) {
          if (!this.graphDict[child].includes(parent)) {
            this.connect(child, parent);
          }
        } else {
          this.connect(child, parent);
        }
      }
    }
  }

  connect(A, B) {
    setDefault(this.graphDict, A, []).push(B);
  }

  // gets the neigbor cells
  gets(a, b = null) {
    let links = setDefault(this.graphDict, a, {});
    if (b) {
      return links[b];
    } else {
      return links;
    }
  }

  nodes() {
    var s1 = new Set();
    for (var k of Object.keys(this.graphDict)) {
      s1.add(k);
    }
    return s1;
  }
}

function UndirectedGraph(graphDict = null) {
  return new Graph(graphDict, false);
}

function setDefault(dict, key, value = null) {
  if (dict[key]) {
    return dict[key];
  } else if (!dict[key] && value) {
    dict[key] = value;
    return dict[key];
  }
}
