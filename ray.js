class Ray {
  constructor(x, y, direction) {
    this.position = createVector(x, y);
    this.direction = p5.Vector.fromAngle(direction);
    this.direction.normalize();
  }

  show() {
    stroke(255);
    push();
    translate(this.position.x, this.position.y);
    line(0, 0, this.direction.x * 10, this.direction.y * 10);
    pop();
  }

  update(x, y) {
    this.position.x = x;
    this.position.y = y;
  }

  cast(wall) {
    const x1 = wall.start.x;
    const y1 = wall.start.y;
    const x2 = wall.end.x;
    const y2 = wall.end.y;
    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = this.position.x + this.direction.x;
    const y4 = this.position.y + this.direction.y;

    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denom == 0) return null;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denom;

    if (t > 0 && t < 1 && u > 0) {
      const x = x1 + t * (x2 - x1);
      const y = y1 + t * (y2 - y1);
      return createVector(x, y);
    }
    return null;
  }
}
