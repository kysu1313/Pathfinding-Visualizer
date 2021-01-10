import React, { Component } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/dijkstra";
import { astar } from "../Algorithms/astar";
import Node from "./Node/Node";

import "./Visualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class Visualizer extends Component {
  constructor(properties) {
    super(properties);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseUp(row, col) {
    this.setState({ mouseIsPressed: false });
  }

  handleMouseDown(row, col) {
    const newGrid = makeNewWallNode(this.state.nodes, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = makeNewWallNode(this.state.nodes, row, col);
    this.setState({ grid: newGrid });
  }

  animateDijkstra(visitedNodesInOrder) {
    console.log(visitedNodesInOrder);
    for (const node of visitedNodesInOrder) {
      const newGrid = this.state.grid.slice();
      const newNode = {
        ...node,
        isVisited: true,
      };
      newGrid[node.row][node.col] = newNode;
      setTimeout(() => {
        this.setState({ grid: newGrid });
      }, 100);
    }
  }

  animateAstar(visitedNodesInOrder) {
    console.log(visitedNodesInOrder);
    for (const node of visitedNodesInOrder) {
      const newGrid = this.state.grid.slice();
      const newNode = {
        ...node,
        isVisited: true,
      };
      newGrid[node.row][node.col] = newNode;
      setTimeout(() => {
        this.setState({ grid: newGrid });
      }, 100);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode, 1);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAstar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAstar(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    const { nodes } = this.state;
    console.log(this.mouseIsPressed);
    // console.log(row, ", ", col);

    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstras Algorithm
        </button>
        <button onClick={() => this.visualizeAstar()}>
          Visualize Astar
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div>
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    cost,
                    isStart,
                    isFinish,
                    isWall,
                    isVisited,
                  } = node;
                  return (
                    <Node
                      row={row}
                      col={col}
                      cost={cost}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      isVisited={isVisited}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];

  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    cost: 0,
    gScore: 0,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    nextNode: null,
  };
};

const makeNewWallNode = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
