window.addEventListener("mousemove", function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const gravity = {
  a: 0.2,
  dissipation: {
    active: 1,
    on: 0.9,
    off: 1
  }
};
const color = ["#5C257F", "#D697FF", "#B84BFF", "#6B4C7F", "#933CCC"];
let circlesNumber = 50;
const minCirclesRadious = 5;
const maxCirclesRadious = 20;
const maxRadious = 100;
const growSpeed = 3;
let circleArray = [];
let requestID = null;
let ID = 0;
canvas.addEventListener("click", () => {
  window.cancelAnimationFrame(requestID);
  circleArray.length > 100 && circleArray.splice(0, 20);
  createCircles(circlesNumber);
});
const mouse = {
  x: null,
  y: null,
  distance: 50
};
function createCircles(number) {
  for (let i = 0; i < number; i++) {
    const property = getCircleProperty();
    circleArray.push(
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

function getRandomColor() {
  const randomColor = color[Math.floor(Math.random() * 4)];
  return randomColor;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.random() * (max - min) + min;
}
function getRandomPositionInGame(min, max) {
  const randomPosition = getRandomInt(min, max);
  return Math.abs(max / 2 - randomPosition) > 50
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
  return Math.abs(velocity) > 0.5 ? velocity : getRandomInt(min, max);
}
function getCircleProperty() {
  this.radious = getRandomInt(minCirclesRadious, maxCirclesRadious);
  this.property = {
    radious: this.radious,
    id: ID,
    x: getRandomPosition(this.radious, window.innerWidth - radious),
    y: getRandomPosition(this.radious, window.innerHeight - radious),
    dx: getRandomVelocity(-2, 2),
    dy: getRandomVelocity(-2, 2),
    color: getRandomColor(),
    maxRadious: maxRadious,
    growSpeed: growSpeed
  };
  ID++;
  return this.property;
}

function animation() {
  requestID = !state.stop.value && requestAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let circle of circleArray) {
    state.gravity.value && circle.turnOnGravity();
    state.feed && circle.grow();
    circle.update();
    !state.gravity.value && circle.turnOffGravity();
  }
}
window.addEventListener("onload", createCircles(circlesNumber));
