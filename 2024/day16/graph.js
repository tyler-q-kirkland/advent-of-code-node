import PriorityQueue from "./priorityQueue.js";

export default class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = {};
  }
  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }
  addEdge(node1, node2, weight) {
    this.adjacencyList[node1].push({ node: node2, weight: weight });
    this.adjacencyList[node2].push({ node: node1, weight: weight });
  }
  findPathWithDijkstra(startNode, endNode, direction) {
    let times = {};
    let backtrace = {};
    let pq = new PriorityQueue();
    times[startNode] = 0;

    this.nodes.forEach(node => {
      if (node.toString() !== startNode.toString()) {
        times[node] = Infinity
      }
    });
    pq.enqueue([startNode, 0, direction]);
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];
      let currentDirection = shortestStep[2];
      this.adjacencyList[currentNode].forEach(neighbor => {
        const newDirection = this.determineDirection(currentNode[0], currentNode[1], neighbor.node[0], neighbor.node[1])
        let time = currentDirection === newDirection ? times[currentNode] + neighbor.weight : times[currentNode] + neighbor.weight + 1000;
        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          pq.enqueue([neighbor.node, time, newDirection]);
        }
      });
    }
    let path = [endNode];
    let lastStep = endNode;
    while (lastStep !== startNode) {
      path.unshift(`${backtrace[lastStep]} `)
      lastStep = backtrace[lastStep]
    }
    console.log(`Path is ${path} and time is ${times[endNode]}`)
    return times[endNode];
  }
  hasEdge(y, x, adjY, adjX) {
    for (const node in this.adjacencyList[`${y},${x}`]) {
      if (this.adjacencyList[`${y},${x}`][node].node[0] === adjY && this.adjacencyList[`${y},${x}`][node].node[1] === adjX) {
        return true;
      }
    }
    return false;
  }

  determineDirection(y, x, adjY, adjX) {
    if (x > adjX) return 'left';
    if (y > adjY) return 'up';
    if (x < adjX) return 'right';
    if (y < adjY) return 'down';
  }
}