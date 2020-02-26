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

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.grow = () => {
    this.r += this.r < this.maxRadious && this.growSpeed;
  };

  this.decrease = () => {
    if (this.r > this.defaultR) this.r -= this.growSpeed;
  };

  this.checkDistance = (circle, distance) => {
    const a2 = Math.pow(this.x - circle.x, 2);
    const b2 = Math.pow(this.y - circle.y, 2);
    const c2 = Math.pow(distance, 2);
    return a2 + b2 < c2;
  };

  this.shouldCircleGrow = () => {
    this.checkDistance(mouse, mouse.distance) ? this.grow() : this.decrease();
  };

  this.checkIsEndOfCanvas = position => {
    if (position === this.y) {
      return (
        position + this.dy > canvas.height - this.r ||
        position + this.dy < this.r
      );
    }
    return (
      position + this.dx > canvas.width - this.r || position + this.dx < this.r
    );
  };

  this.changeMoveDirection = axis => {
    if (this.checkIsEndOfCanvas(this[axis])) {
      if (axis === "x") {
        this[`d${axis}`] = -this[`d${axis}`] * gravity.dissipation.active;
      } else {
        this[`d${axis}`] = -this[`d${axis}`] * gravity.dissipation.active;
      }
    }
  };

  this.changePosition = () => {
    this.x += this.dx;
    this.y += this.dy;
  };

  this.move = () => {
    this.changeMoveDirection("x");
    this.changeMoveDirection("y");
    this.changePosition();
  };

  this.turnOnGravity = () => {
    this.dy += gravity.a;
    gravity.dissipation.active = gravity.dissipation.on;
  };

  this.turnOffGravity = () => {
    if (this.dy > 3 || this.dy < -3) this.dy = this.dy / 2;
    if (this.dx > 3 || this.dx < -3) this.dx = this.dx / 2;

    gravity.dissipation.active = gravity.dissipation.off;
  };

  this.keyControl = () => {
    if (this.id === "myCircle") {
      if (key.up) this.dy = this.dy - 1;
      if (key.right) this.dx = this.dx + 1;
      if (key.down) this.dy += 1;
      if (key.left) this.dx -= 1;
    }
  };
  this.isCollison = circle => {
    return (
      circle !== this &&
      this.checkDistance(circle, (1 / 2) * (this.r + circle.r))
    );
  };
  this.circleRemove = value => {
    circleArray = circleArray.filter(ele => ele.id != value);
  };
  this.collisionWithSmaller = circle => {
    this.circleRemove(circle.id);
    const newR = Math.sqrt(Math.pow(circle.r / 2, 2) + Math.pow(this.r, 2));
    const deltaR = newR - this.r;
    this.r = newR;
    const score = deltaR * game.resultMultiplication;
    updateScore(score);
    circleArray.length === 1 && updateLevel();
  };
  this.collisionEffect = circle => {
    if (this.r * 0.9 > circle.r) this.collisionWithSmaller(circle);

    if (this.r * 1.1 < circle.r) gameReset();
  };

  this.checkCollision = () => {
    if (this.id === "myCircle") {
      for (const circle of circleArray) {
        this.isCollison(circle) && this.collisionEffect(circle);
      }
    }
  };
  this.update = () => {
    this.keyControl();
    this.move();
    this.checkCollision();
    mouse.x && !state.feed && !state.play.value && this.shouldCircleGrow();
    this.draw();
  };
}
