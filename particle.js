class Particle {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.rays = [];
    for (let i = 0; i < 360; i += 0.5) {
      this.rays.push(new Ray(this.position.x, this.position.y, radians(i)));
    }
  }

  update(x, y) {
    this.position.x = x;
    this.position.y = y;
    for (let ray of this.rays) ray.update(x, y);
  }

  look(walls) {
    let scene = {};
    for (let ray of this.rays) {
      let closestPoint = null;
      let record = Infinity;
      let closestWall = null;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const dist = p5.Vector.dist(pt, ray.position);
          if (dist < record) {
            record = dist;
            closestPoint = pt;
            closestWall = wall;
          }
        }
      }
      if (closestPoint) {
        stroke(255, 55);
        line(this.position.x, this.position.y, closestPoint.x, closestPoint.y);
        if (closestWall.id in scene) {
          const dStart = p5.Vector.dist(
            scene[closestWall.id].startPoint,
            closestWall.start
          );
          const dNewStart = p5.Vector.dist(closestPoint, closestWall.start);
          const dEnd = p5.Vector.dist(
            scene[closestWall.id].endPoint,
            closestWall.end
          );
          const dNewEnd = p5.Vector.dist(closestPoint, closestWall.end);
          if (dStart > dNewStart)
            scene[closestWall.id].startPoint = closestPoint;
          if (dEnd > dNewEnd) scene[closestWall.id].endPoint = closestPoint;
        } else {
          scene[closestWall.id] = {
            startPoint: closestPoint,
            endPoint: closestPoint,
          };
        }
      }
    }
    return scene;
  }

  show() {
    fill(255);
    ellipse(this.position.x, this.position.y, 20);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}
