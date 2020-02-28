function MyCircle(id, x, y, dx, dy, radious, color, maxRadious, growSpeed) {
  Circle.call(this, id, x, y, dx, dy, radious, color, maxRadious, growSpeed);
  this.keyControl = () => {
    if (this.id === "myCircle") {
      if (key.up) this.dy = this.dy - 1;
      if (key.right) this.dx = this.dx + 1;
      if (key.down) this.dy += 1;
      if (key.left) this.dx -= 1;
    }
  };
  this.calcNewRadious = circle => {
    return Math.sqrt(Math.pow(circle.r / 2, 2) + Math.pow(this.r, 2));
  };
  this.eat = circle => {
    hitSound.play();
    circle.remove();
    const newRadious = this.calcNewRadious(circle);
    const deltaRadious = newRadious - this.r;
    this.r = newRadious;
    game.updateScore(deltaRadious);
    hitSound = null;
  };
  this.collisionWith = circle => {
    hitSound = new sound("/CrazyBalls/assets/hit.mp3");
    explodeSound = new sound("/CrazyBalls/assets/explode.mp3");
    const canBeEaten = this.r * collisionRatio.eat > circle.r;
    const isToBig = this.r * collisionRatio.lose < circle.r;
    if (canBeEaten) {
      this.eat(circle);
    } else if (isToBig) {
      game.end();
    }
  };
}
