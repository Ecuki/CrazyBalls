function Circle(id, x, y, dx, dy, r, color, maxRadious, growSpeed) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.maxRadious = maxRadious;
  this.growSpeed = growSpeed;
  this.defaultR = r;
  this.defaultDX = r;
  this.defaultDY = r;
  this.color = color;

  this.grow = () => {
    this.r += this.r < this.maxRadious && this.growSpeed;
  };

  this.decrease = () => {
    if (this.r > this.defaultR) this.r -= this.growSpeed;
  };

  this.checkIsEndOfCanvas = position => {
    return position === this.y
      ? position + this.dy > canvas.height - this.r ||
          position + this.dy < this.r
      : position + this.dx > canvas.width - this.r ||
          position + this.dx < this.r;
  };

  this.changeMoveDirection = () => {
    if (this.checkIsEndOfCanvas(this.x)) {
      this.dx = -this.dx * gravity.dissipation.active;
    }
    if (this.checkIsEndOfCanvas(this.y)) {
      this.dy = -this.dy * gravity.dissipation.active;
    }
  };

  this.changePosition = () => {
    this.x += this.dx;
    this.y += this.dy;
  };

  this.move = () => {
    this.changeMoveDirection();
    this.changePosition();
  };

  this.turnOnGravity = () => {
    this.dy += gravity.a;
    gravity.dissipation.active = gravity.dissipation.on;
  };
  this.slowDown = () => {
    if (this.dy > 3 || this.dy < -3) this.dy = this.dy / 2;
    if (this.dx > 3 || this.dx < -3) this.dx = this.dx / 2;
  };
  this.turnOffGravity = () => {
    this.slowDown();
    gravity.dissipation.active = gravity.dissipation.off;
  };
  this.remove = () => {
    circles = circles.filter(ele => ele.id != this.id);
  };
  this.shouldGrow = () => {
    collision(this, mouse, "mouse") || states.feed.value
      ? this.grow()
      : this.decrease();
  };
  this.update = () => {
    states.gravity.value ? this.turnOnGravity() : this.turnOffGravity();
    states.feed.value && this.grow();
    this.move();
    mouse.x && !states.feed.value && !states.play.value && this.shouldGrow();
    draw(this);
  };
}
//---Colision
