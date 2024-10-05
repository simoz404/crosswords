function printGrid(grid, n) {
  for (let i = 0; i < n; i++) {
      console.log(grid[i]);
  }
}

function canPlaceH(x, y, grid, word) {
  const len = word.length;
  for (let i = 0; i < len; i++) {
      if (y + i >= grid[x].length || (!/\d/.test(grid[x][y + i]) && grid[x][y + i] !== word[i])) {
          return false;
      }
  }
  return true;
}

function canPlaceV(x, y, grid, word) {
  const len = word.length;
  for (let i = 0; i < len; i++) {
      if (x + i >= grid.length || (!/\d/.test(grid[x + i][y]) && grid[x + i][y] !== word[i])) {
          return false;
      }
  }
  return true;
}

function placeH(x, y, grid, word) {
  const temp = [...grid];
  for (let i = 0; i < word.length; i++) {
      temp[x] = temp[x].slice(0, y + i) + word[i] + temp[x].slice(y + i + 1);
  }
  return temp;
}

function placeV(x, y, grid, word) {
  const temp = [...grid];
  for (let i = 0; i < word.length; i++) {
      temp[x + i] = temp[x + i].slice(0, y) + word[i] + temp[x + i].slice(y + 1);
  }
  return temp;
}

let solutionFound = false;

function solve(words, grid, index, n) {
  if (index >= words.length) {

      solutionFound = true;
      printGrid(grid, n);
      return;
  }

  const word = words[index];
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < grid[i].length; j++) {
          if (canPlaceH(i, j, grid, word)) {
              const newGrid = placeH(i, j, grid, word);
              solve(words, newGrid, index + 1, n);
          }
          if (canPlaceV(i, j, grid, word)) {
              const newGrid = placeV(i, j, grid, word);
              solve(words, newGrid, index + 1, n);
          }
      }
  }
}

function crosswordSolver(puzzle, words) {
  if (typeof puzzle !== 'string' || !Array.isArray(words)) {
      console.log('Errorff');
      return;
  }

  const grid = puzzle.split('\n');
  const wordSet = new Set(words);

  if (wordSet.size !== words.length) {
      console.log('Errordd');
      return;
  }

  const n = grid.length;
  solve(words, grid, 0, n);
  if (!solutionFound) {
      console.log('Error');
  }
  
}

const puzzle = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`
const words = [
  'sun',
  'sunglasses',
  'suncream',
  'swimming',
  'bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'sandals',
].reverse()
crosswordSolver(puzzle, words);
