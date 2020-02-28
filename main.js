canvas.addEventListener("click", () => handleCanvasClick());
function handleCanvasClick() {
  state.best.value && handleBestButton("best");
  window.cancelAnimationFrame(requestID);
  circles.length > maxOnCanvas && circles.splice(0, circlesAfterClick);
  createCircles(circlesAfterClick);
}

function createCircles(number) {
  for (let i = 0; i < number; i++) {
    const property = getCircleProperty();
    circles.push(
      new Circle(
        property.id,
        property.x,
        property.y,
        property.dx,
        property.dy,
        property.radious,
        property.color,
        property.maxRadious,
        property.growSpeed
      )
    );
  }
  animation();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.random() * (max - min) + min;
}
function getRandomPositionInGame(min, max) {
  const randomPosition = getRandomInt(min, max);
  return Math.abs(max / 2 - randomPosition) > distanceFromCenter
    ? randomPosition
    : getRandomPosition(min, max);
}
function getRandomPosition(min, max) {
  return state.play.value
    ? getRandomPositionInGame(min, max)
    : getRandomInt(min, max);
}
function getRandomVelocity(min, max) {
  const velocity = getRandomInt(min, max);
  return Math.abs(velocity) > minVelocity ? velocity : getRandomInt(min, max);
}
function getCircleProperty() {
  const radious = getRandomInt(minCirclesRadious, maxCirclesRadious);
  const index = Math.floor(getRandomInt(0, color.length));
  const property = {
    radious: radious,
    id: ID,
    x: getRandomPosition(radious, window.innerWidth - radious),
    y: getRandomPosition(radious, window.innerHeight - radious),
    dx: getRandomVelocity(-velocityRange, velocityRange),
    dy: getRandomVelocity(-velocityRange, velocityRange),
    color: color[index],
    maxRadious: maxRadious,
    growSpeed: growSpeed
  };
  ID++;
  return property;
}

function animation() {
  requestID = !state.stop.value && requestAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (myCircle !== null) {
    myCircle.update();
    myCircle.keyControl();
    myCircle.slowDown();
  }

  for (let circle of circles) {
    myCircle !== null &&
      collision(myCircle, circle, "ball") &&
      myCircle.collisionWith(circle);

    circle.update();
  }
}
function draw(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, false);
  ctx.strokeStyle = circle.color;
  ctx.stroke();
  ctx.fillStyle = circle.color;
  ctx.fill();
}
window.addEventListener("onload", createCircles(circlesNumber));
