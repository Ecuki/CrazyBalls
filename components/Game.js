//------GAME
const lvlContener = document.querySelector("span.lvl");
const resultContener = document.querySelector(".result");
const scoreConteners = document.querySelectorAll("span.score");
const input = document.querySelector(".name");
const save = document.querySelector(".save");
const exitButton = document.querySelector(".exit");
let hitSound = null;
let explodeSound = null;

exitButton.addEventListener("click", () => game.handleExit());
save.addEventListener("click", () => game.saveScore());
let scores = [];
const isStorage = "undefined" !== localStorage;
if (isStorage && localStorage.getItem("scores")) {
  const str = localStorage.getItem("scores");

  scores = JSON.parse(str);
  console.log(scores);
  // scores = console.log(JSON.parse(localStorage.getItem("scores")));
}
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
}
function Game() {
  this.resultMultiplication = resultMultiplication;
  this.circles = startCircles;
  this.lvl = 1;
  this.score = 0;
  this.setScore = () => {
    scoreConteners.forEach(contener => {
      contener.textContent = this.score;
    });
  };
  this.resetScore = () => {
    this.score = 0;
    this.lvl = 1;
    this.setScore();
    lvlContener.textContent = this.lvl;
  };
  this.resetSettings = () => {
    this.circles = startCircles;
  };
  this.createMyCircle = () => {
    MyCircle.prototype = Object.create(Circle.prototype);
    Object.defineProperty(MyCircle.prototype, "constructor", {
      value: MyCircle,
      enumerable: false, // so that it does not appear in 'for in' loop
      writable: true
    });
    myCircle = new MyCircle(
      myCircleData.id,
      myCircleData.x,
      myCircleData.y,
      myCircleData.dx,
      myCircleData.dy,
      myCircleData.radious,
      myCircleData.color,
      myCircleData.maxRadious,
      myCircleData.growSpeed
    );
  };
  this.start = () => {
    canvas.removeEventListener("click", handleCanvasClick);
    turnOff("gravity");
    changeButtonStatus("play");
    window.cancelAnimationFrame(requestID);
    circles = [];
    this.createMyCircle();
    createCircles(this.circles);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    show(resultContener);
    buttons.forEach(button => {
      if (button.id === "play") return;
      hide(button);
      turnOff(button.id);
      button.classList.remove("button--active");
    });
  };
  this.saveScore = () => {
    if (!input.value) {
      input.classList.add("name--error");
      return;
    } else if (this.score === 0) {
      input.classList.add("name--error");
      input.value = "Eat something first!";
      return;
    } else {
      input.classList.remove("name--error");
      const name = input.value;
      time = new Date().toDateString();
      const score = { name: name, value: this.score, time: time };
      scores.push(score);
      scores = scores.sort(function(a, b) {
        return a.value - b.value;
      });

      localStorage.setItem("scores", JSON.stringify(scores));
      save.disabled = true;
      input.value = "Score saved";
      input.classList.add("name--saved");
    }
  };
  this.end = () => {
    explodeSound.play();
    hide(resultContener);
    shadow.classList.add("shadow--active");
    message.classList.add("message--active");

    circles = [];
    myCircle = null;
    window.cancelAnimationFrame(requestID);
    createCircles(circlesNumber);

    buttons.forEach(button => {
      button.disabled = button.id === "feed" && false;
      button.disabled = button.id === "play" && true;
    });
  };

  this.handleExit = () => {
    changeButtonStatus(`play`);
    this.resetScore();
    this.resetSettings();
    buttons.forEach(button => {
      button.disabled = button.id === "feed" && false;
      show(button);
    });
    shadow.classList.remove("shadow--active");
    message.classList.remove("message--active");
    myCircle = null;
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    save.removeEventListener("click", game.saveScore);
    save.disabled = false;
    input.value = "";
    input.classList.remove("name--saved");
    input.classList.remove("name--error");

    return;
  };

  this.updateScore = value => {
    const score = Math.floor(value * game.resultMultiplication);
    this.score += score;
    this.setScore();
    circles.length === 0 && game.lvlUp();
  };
  this.lvlUp = () => {
    this.circles += this.lvl;
    this.lvl++;

    lvlContener.textContent = this.lvl;
    myCircle.r = myCircle.defaultR;
    window.cancelAnimationFrame(requestID);
    createCircles(this.circles);
  };
}
const game = new Game();
