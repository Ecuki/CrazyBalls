//------GAME
const lvlContener = document.querySelector("span.lvl");
const resultContener = document.querySelector(".result");
const scoreConteners = document.querySelectorAll("span.score");
const input = document.querySelector(".name");

let HIT_SOUND = null;
let EXPLODE_SOUND = null;

let SCORES = [];
const IS_STORAGE = "undefined" !== localStorage;
if (IS_STORAGE && localStorage.getItem("SCORES")) {
  const str = localStorage.getItem("SCORES");
  SCORES = JSON.parse(str);
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
    turnOff("gravity", "stop", "feed", "help");

    circles = [];
    this.createMyCircle();
    refreshAnimation(this.circles);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    show(resultContener);
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
      const date = new Date().toDateString();
      const score = { name, value: this.score, date };
      SCORES.push(score);
      SCORES = SCORES.sort(function(a, b) {
        return a.value - b.value;
      });

      localStorage.setItem("SCORES", JSON.stringify(SCORES));
      save.disabled = true;
      input.value = "Score saved";
      input.classList.add("name--saved");
    }
  };
  this.end = () => {
    EXPLODE_SOUND && EXPLODE_SOUND.play();

    hide(resultContener);
    shadow.classList.add("shadow--active");
    message.classList.add("message--active");

    circles = [];
    myCircle = null;
    refreshAnimation(circlesNumber);
  };

  this.handleExit = () => {
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
    refreshAnimation(this.circles);
  };
}
const game = new Game();
