const MyCircle = {
  id: "myCircle",
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  dx: 0,
  dy: 0,
  radious: 20,
  color: "#0029FA",
  maxRadious: Infinity,
  growSpeed: null
};
let myCircle = {};

function createMyCircle() {
  myCircle = new Circle(
    MyCircle.id,
    MyCircle.x,
    MyCircle.y,
    MyCircle.dx,
    MyCircle.dy,
    MyCircle.radious,
    MyCircle.color,
    MyCircle.maxRadious,
    MyCircle.growSpeed
  );
  circleArray.push(myCircle);
  console.log(myCircle);
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
}
//------GAME
const lvlContener = document.querySelector("span.lvl");
const resultContener = document.querySelector(".result");
const scoreContener = document.querySelector("span.score");

let gameStartCirclesNumber = 1;
const game = {
  score: 0,
  lvl: 1,
  resultMultiplication: 10
};
function Game() {
  this.game = {
    lvl: 1,
    score: 0,
    resultMultiplication: 10,
    startCircles: 1
  };

  ///--Instancja myCircle
  //Add listeners
  //game reset
}

function gameReset() {
  circleArray = [];
  updateScore(0);

  window.cancelAnimationFrame(requestID);
  createCircles(gameStartCirclesNumber);

  state.play.value ? createMyCircle() : myCircle.circleRemove("myCircle");
}
function updateScore(value) {
  game.score = Math.floor(value);
  scoreContener.textContent = game.score;
}
function updateLevel() {
  game.lvl++;
  lvlContener.textContent = game.lvl;
  gameStartCirclesNumber++;
  myCircle.r = myCircle.defaultR;
  window.cancelAnimationFrame(requestID);
  createCircles(gameStartCirclesNumber);
}

function clearLevel() {
  lvlContener.textContent = 1;
}
