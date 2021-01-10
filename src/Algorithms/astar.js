import PriorityQueue from './DataStructures/minHeap.js';

export function astar(grid, startNode, finishNode, cost) {

 

  var manhattanDist = hScore(startNode, finishNode);

  // Add start node to list
  // Usually stored as a min-heap
  var openSet = new PriorityQueue();
  openSet.enqueue(startNode, startNode.cost);

  var closedSet = [];

  while (openSet.front() != finishNode) {
    var currNode = openSet.dequeue();
    closedSet.push(currNode);
    currNode.gScore = currNode.previousNode.gScore + currNode.cost;
    var count = 0;

    for (var neighbor of getNeighbors(currNode, grid)) {
      var cost = gScore(currNode, closedSet) + dWeight(currNode, neighbor);
      if (openSet.has(neighbor) && cost < gScore(neighbor, closedSet)) {
        openSet.remove(neighbor);
      }
      if (closedSet.contains(neighbor) && cost < gScore(neighbor, closedSet)) {
        closedSet.splice(count, 1);
        // closeSet.remove(neighbor);
      }
      if (!openSet.has(neighbor) && !closedSet.contains(neighbor)) {
        // gScore(neighbor, closedSet) = cost;
        openSet.enqueue(neighbor, gScore(neighbor, closedSet)+hScore(neighbor));
        
        neighbor.previousNode = currNode;
        // currNode = currNode.previousNode;
        // neighbor.parent = current;
      }
      count++;
    }
  }

  reconstructPath(closedSet, finishNode);
}

function gScore(node, closedset) {

}

function hScore(current, final) {
  return Math.abs(current.row - final.row) + Math.abs(current.col - final.col);
}

function dWeight(current, neighbor) {
  return current.distance + neighbor.distance;
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function reconstructPath(cameFrom, current) {
  const totalPath = [];
  totalPath.push(current);
  while (current in cameFrom) {
    current = cameFrom[current];
    totalPath.push(current);
  }
  return totalPath;
}

function lowestFScore(fScore) {
  const lowest = fScore[0];
  for (const element of fScore) {
    if (element.cost < lowest) {
      lowest = element;
    }
  }
  return lowest;
}

// function cameFrom(cameFrom, current) {
//   const totalPath = [];
//   totalPath.push(current);
//   while (cameFrom != )
//   ////
// }

// Backtrack from finish node
// export function getNodesInShortestPathOrder(finishNode) {
//   const nodesInShortestPathOrder = [];
//   let currentNode = finishNode;

//   while (currentNode !== null) {
//     nodesInShortestPathOrder.unshift(currentNode);
//     currentNode = currentNode.previousNode;
//   }

//   return nodesInShortestPathOrder;
// }
