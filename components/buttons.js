let buttons = document.querySelectorAll("nav button");
let message = document.querySelector(".message");
let shadow = document.querySelector(".shadow");

buttons.forEach(button => {
  if (button.id === "play") {
    button.addEventListener("click", () => handlePlayButton());
  } else if (button.id === "feed") {
    button.addEventListener("click", () => handelFeedButton());
  } else if (button.id === "stop") {
    button.addEventListener("click", () => handleStopButton());
  } else if (button.id === "gravity") {
    button.addEventListener("click", () => handleGravityButton());
  } else if (button.id === "best") {
    button.addEventListener("click", () => handleBestButton());
  }
});

function hide(element) {
  element.style.visibility = "hidden";
}
function show(element) {
  element.style.visibility = "visible";
}
function turnOff(type) {
  state[type].value = false;
}
function turnOn(type) {
  state[type].value = true;
}

function changeButtonText(button, id) {
  console.log("object");
  button.innerHTML = state[id].value ? state[id].trueText : state[id].falseText;
}
function pauseFeedEffect() {
  if (!timer) return;
  else if (state.stop.value) {
    timer.pause();
  } else if (!state.stop.value) {
    timer.resume();
  }
}

function resumeCirclesMove(id) {
  if (id !== "stop" && state.stop.value && state[id].value)
    changeButtonStatus("stop");
}

function changeButtonStatus(id) {
  const button = document.querySelector(`.${id}`);
  state[id].value = !state[id].value;
  state[id].trueText && changeButtonText(button, id);
  resumeCirclesMove(id);
  button.classList.toggle("button--active");

  window.cancelAnimationFrame(requestID);
  animation();
}
function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}
function handleBestButton() {
  changeButtonStatus("best");
  const ol = document.querySelector(".records");
  const messageElements = message.querySelectorAll("*");
  if (state.best.value) {
    buttons.forEach(button => {
      button.disabled = true;
    });
    messageElements.forEach(element => {
      return element.id === "title" ||
        element.id === "records" ||
        element.id === "line-first" ||
        element.id === "line-second"
        ? (element.style.display = "block")
        : (element.style.display = "none");
    });

    const resultsNumber = scores.length > 5 ? 5 : scores.length;
    for (let i = resultsNumber - 1; i >= 0; i--) {
      const li = document.createElement("li");
      li.classList.add("record");

      for (let el in scores[i]) {
        const span = document.createElement("span");
        span.textContent = scores[i][el];
        li.appendChild(span);
      }
      ol.appendChild(li);
    }
    // message.parentNode.insertBefore(, secondLine);
  } else {
    ol.textContent = "";
    messageElements.forEach(element => {
      return element.id === "title" ||
        element.id === "records" ||
        element.id === "line-first" ||
        element.id === "line-second"
        ? (element.style.display = "none")
        : (element.style.display = "initial");
    });
    buttons.forEach(button => {
      button.disabled = false;
    });
  }
  message.classList.toggle("message--active");
}
function handleGravityButton() {
  changeButtonStatus("gravity");
}

function handlePlayButton() {
  console.log(state.play.value);
  state.best.value && handleBestButton();
  !state.play.value ? game.start() : game.end();
  console.log(state.play.value);
}
function handelFeedButton() {
  const button = document.querySelector(`#feed`);
  turnOn("feed");
  button.disabled = true;
  timer = new Timer(function() {
    button.disabled = false;
    turnOff("feed");
  }, 2000);
  pauseFeedEffect();
}

function handleStopButton() {
  changeButtonStatus("stop");
  pauseFeedEffect();
}
