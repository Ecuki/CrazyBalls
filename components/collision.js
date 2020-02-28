function collision(objectX, objectY, type) {
  this.objectX = objectX;
  this.objectY = objectY;
  this.distance = () => {
    switch (type) {
      case "ball":
        return (1 / 2) * (this.objectX.r + this.objectY.r);
      case "mouse":
        return 50;
      case "wall":
        return;
    }
  };
  this.checkDistance = () => {
    const a2 = Math.pow(this.objectX.x - this.objectY.x, 2);
    const b2 = Math.pow(this.objectX.y - this.objectY.y, 2);
    const c2 = Math.pow(this.distance(), 2);
    return a2 + b2 < c2;
  };

  this.check = () => {
    const isCollision = this.checkDistance();
    return isCollision;
  };

  return this.check();
}
