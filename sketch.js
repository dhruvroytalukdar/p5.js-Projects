let walls = [];
let particle;
const wallCount = 8;

function setup() {
  // put setup code here
  createCanvas(500, 500);
  for (let i = 0; i < wallCount; i++) {
    const x1 = random(width);
    const x2 = random(width);
    const y1 = random(height);
    const y2 = random(height);
    walls.push(new Boundary(x1, y1, x2, y2));
  }
  walls.push(new Boundary(0, 0, 0, height));
  walls.push(new Boundary(0, height, width, height));
  walls.push(new Boundary(width, height, width, 0));
  walls.push(new Boundary(width, 0, 0, 0));
  particle = new Particle();
}

function mousePressed() {
  noLoop();
}

function draw() {
  // put drawing code here
  background(0);
  particle.update(mouseX, mouseY);
  particle.show();
  const scene = particle.look(walls);
  for (let [key, _] of Object.entries(scene)) {
    stroke(255);
    line(
      scene[key].startPoint.x,
      scene[key].startPoint.y,
      scene[key].endPoint.x,
      scene[key].endPoint.y
    );
  }
}
