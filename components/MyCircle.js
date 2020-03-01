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
    HIT_SOUND && HIT_SOUND.play();

    const newRadious = this.calcNewRadious(circle);
    circle.remove();
    const deltaRadious = newRadious - this.r;
    this.r = newRadious;
    game.updateScore(deltaRadious);
  };
  this.collisionWith = circle => {
    const canBeEaten = this.r * collisionRatio.eat > circle.r;
    const isToBig = this.r * collisionRatio.lose < circle.r;
    if (canBeEaten) {
      this.eat(circle);
    } else if (isToBig) {
      game.end();
    }
  };
}
