/*
 CIRCLES
*/
const circlesNumber = 50; /*number of circles in menu*/
const circlesAfterClick = 20;
const maxOnCanvas = 100; /*max number of circles on canvas in menu*/
const minCirclesRadious = 5;
const maxCirclesRadious = 30;
const maxRadious = 100; /*max radious of circles when feed state is active*/
const growSpeed = 3; /*grow speed in feed state */

const minVelocity = 0.5; /*minimum velocity value*/
const velocityRange = 2; /*velocity is randomly selected from the -x to x range  */
let circles = []; /* container for created circles*/
let requestID = null; /*request animation frame ID*/
let ID = 0; /*circle ID*/
let timer = null;
/*
GAME
*/
const startCircles = 1; /*number of circles at the beginning of the game */
const resultMultiplication = 10; /*radious increase*resultMultiplication= score in game*/
const distanceFromCenter = 50; /*distance from the center of the canvas where the circles do not render at the beginning of the game */

/*
CIRCLES COLORS
*/
const color = ["#5C257F", "#D697FF", "#B84BFF", "#6B4C7F", "#933CCC"];
/*
    CONTROL
    Control variables
*/
const key = {
  up: false,
  right: false,
  down: false,
  left: false
};
const mouse = {
  x: null,
  y: null,
  distance: 50 /*distance below which the feed effect is active*/
};
/*
    MYCIRCLE
    myCircle properties, myCircle is active onle in "play" mode
*/
let myCircle = null;
const myCircleData = {
  id: "myCircle",
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  dx: 0,
  dy: 0,
  radious: 20,
  color: "#0029FA",
  maxRadious: 300 /*ball growth limit after feed*/,
  growSpeed: null
};
/*
    GRAVITY
    Gravity variables
*/
const gravity = {
  a: 0.2 /*gravitational acceleration, it rais speed while ball fall*/,
  dissipation: {
    /*energy dissipation factor, it reduce ball velocity after collision with wall*/
    active: 1 /*energy dissipation factor when gravity is active*/,
    on: 0.9 /*energy dissipation factor when gravity is on*/,
    off: 1 /*energy dissipation factor when gravity is off*/
  }
};
/*
     STATE
*/
const state = {
  stop: {
    /*type off state, this name is related to button id*/
    value: false /*is state active*/,
    falseText: `<i class="fas fa-pause-circle"></i>Stop` /*button text content when state is inactive*/,
    trueText: `<i class="fas fa-play-circle"></i></i>Start` /*button text content when state is active*/
  },
  gravity: {
    value: false,
    falseText: `<i class="fas fa-apple-alt"></i>ON  Gravity`,
    trueText: `<i class="fas fa-expand-arrows-alt"></i>OFF  Gravity`
  },
  play: {
    value: false,
    falseText: `<i class="fas fa-gamepad"></i>Play`,
    trueText: `<i class="fas fa-times-circle"></i>Exit`
  },
  best: {
    value: false
  },
  feed: { value: false }
};

/*
COLLISION
*/

const collisionRatio = {
  eat: 0.9 /*ratio of radious at which myCircle ball eat another*/,
  lose: 1.1 /*ratio of radious at which another ball eat myCircle*/
};
