const WIDTH = 1000
const HEIGHT = 650
const SIZE = 5

let grid,rows,cols;

function gridInit(rows,cols){
  let grid = new Array(rows)
  for(let i=0;i<grid.length;i++)
    grid[i] = new Array(cols)
  
  for(let i=0;i<grid.length;i++)
    for(let j=0;j<grid[i].length;j++)
      grid[i][j] = floor(random(2))

  return grid
}

function setup() {
  createCanvas(WIDTH, HEIGHT)
  frameRate(30)
  rows = WIDTH / SIZE
  cols = HEIGHT / SIZE
  grid = gridInit(rows,cols)
}

function countLiveNeighbours(row,col){
  let count = 0
  
  // Check top,left,right,bottom
  count += grid[(row-1+rows)%rows][col]
  count += grid[(row+1)%rows][col]
  count += grid[row][(col-1+cols)%cols]
  count += grid[row][(col+1)%cols]
  
  // check corners
  count += grid[(row-1+rows)%rows][(col-1+cols)%cols]
  count += grid[(row-1+rows)%rows][(col+1)%cols]
  count += grid[(row+1)%rows][(col-1+cols)%cols]
  count += grid[(row+1)%rows][(col+1)%cols]
  return count
}

function draw() {
  background(0);
  
  // Draw current generation
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      if(grid[i][j] === 1){
        fill(255)
        strokeWeight(0)
        rect(i*SIZE,j*SIZE,SIZE,SIZE)
      }
    }
  }
  
  // Calculate next generation
  // 1. 0 -> 3 live neighbor -> 1
  // 2. 1 -> <2,3< live neighbour -> 0
  
  var nextGen = [];

  for (var i = 0; i < rows; i++)
      nextGen[i] = grid[i].slice();
  
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      let count = countLiveNeighbours(i,j)
      nextGen[i][j] = grid[i][j]
      if(grid[i][j] === 0 && count === 3)
        nextGen[i][j] = 1
      if(grid[i][j] === 1 && (count < 2 || count > 3))
        nextGen[i][j] = 0
    }
  }
  // Go to next generation
  grid = nextGen
}
