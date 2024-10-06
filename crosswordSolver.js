simo404
mbakhouc
Online

simo404 — Today at 5:36 PM
.
```function canPlaceH(x, y, grid, word) {
  for (let i = 0; i < word.length; i++) {
    if (y + i >= grid[x].length || 
        (!/\d/.test(grid[x][y + i]) && grid[x][y + i] !== word[i])) {
      return false;
    }
Expand
message.txt
3 KB
﻿
Msalmi
_msalmi_
...
```function canPlaceH(x, y, grid, word) {
  for (let i = 0; i < word.length; i++) {
    if (y + i >= grid[x].length || 
        (!/\d/.test(grid[x][y + i]) && grid[x][y + i] !== word[i])) {
      return false;
    }
  }
  return true;
}
function canPlaceV(x, y, grid, word) {
  for (let i = 0; i < word.length; i++) {
    if (x + i >= grid.length || 
        (!/\d/.test(grid[x + i][y]) && grid[x + i][y] !== word[i])) {
      return false;
    }
  }
  return true;
}
function placeH(x, y, grid, word) {
  const newGrid = Array.from(grid);
  for (let i = 0; i < word.length; i++) {
    newGrid[x] = newGrid[x].slice(0, y + i) + word[i] + newGrid[x].slice(y + i + 1);
  }
  return newGrid;
}
function placeV(x, y, grid, word) {
  const newGrid = Array.from(grid);
  for (let i = 0; i < word.length; i++) {
    newGrid[x + i] = newGrid[x + i].slice(0, y) + word[i] + newGrid[x + i].slice(y + 1);
  }
  return newGrid;
}
let solutions = [];
function solve(words, grid, index) {
  if (index >= words.length) {
    solutions.push(grid);
    return;
  }
  const word = words[index];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (/[1-2]/.test(grid[i][j]) || grid[i][j] === word[0]) {
        if (canPlaceH(i, j, grid, word)) {
          const newGrid = placeH(i, j, grid, word);
          solve(words, newGrid, index + 1);
        }
        if (canPlaceV(i, j, grid, word)) {
          const newGrid = placeV(i, j, grid, word);
          solve(words, newGrid, index + 1);
        }
      }
    }
  }
}
function checkIfSolvable(grid) {
  const numbers = grid.replace(/[^0-9]/g, '').split('');
  const sum = numbers.reduce((acc, curr) => acc + Number(curr), 0);
  return sum;
}
function crosswordSolver(puzzle, words) {
  if (typeof puzzle !== 'string' || !Array.isArray(words)) {
    console.log('Error: Invalid input.');
    return;
  }
  
  const regex = /^[\d.\n]+$/;
  if (!regex.test(puzzle)) {
    console.log('Error: Puzzle contains invalid characters.');
    return;
  }
  if (words.length !== checkIfSolvable(puzzle)) {
    console.log('Error: Puzzle and words do not match.');
    return;
  }
  const grid = puzzle.split('\n');
  const wordSet = new Set(words);
  if (wordSet.size !== words.length) {
    console.log('Error: Duplicate words.');
    return;
  }
  solutions = [];
  solve(words, grid, 0);
  const validSolutions = solutions.filter(sol => 
    sol.every(row => !/\d/.test(row))
  );
  if (validSolutions.length === 0) {
    console.log('Error: No solution found.');
  } else if (validSolutions.length > 1) {
    console.log('Error: More than one solution found.');
  } else {
    validSolutions[0].forEach(row => console.log(row));
  }
}
//---------------------------------------------------------------------------------
const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['aaab', 'aaac', 'aaad', 'aaae']
crosswordSolver(puzzle, words);```
message.txt
3 KB
