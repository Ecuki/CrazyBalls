const buttons = document.querySelectorAll("button");
const message = document.querySelector(".message");
const shadow = document.querySelector(".shadow");
const helpMessage = document.querySelector(".settings__message");
buttons.forEach(button => {
  addListener(button, "click");
});
function firstLetterUpperCase(text) {
  const textUpperCase =
    text.toString()[0].toLocaleUpperCase(0) + text.toString().slice(1);
  return textUpperCase;
}

function addListener(element, event = "click") {
  element.addEventListener(event, () => {
    window[
      "handle" +
        `${firstLetterUpperCase(element.id) + firstLetterUpperCase(event)}`
    ]();
  });
}

function hide() {
  for (let id of arguments) {
    if (typeof id !== "string") {
      return (id.style.visibility = "hidden");
    } else {
      const element = document.querySelector(`#${id}`);
      element.style.visibility = "hidden";
    }
  }
}

function show() {
  for (let id of arguments) {
    if (typeof id !== "string") {
      return (id.style.visibility = "visible");
    } else {
      const element = document.querySelector(`#${id}`);
      element.style.visibility = "visible";
    }
  }
}

function turnOff() {
  for (let element of arguments) {
    if (states[element].value) states[element].value = false;
    const button = document.querySelector(`#${element}`);
    button.classList.remove("button--active");

    states[element].trueText && changeButtonText(button);
  }
}

function turnOn() {
  for (let element of arguments) {
    if (!states[element].value) states[element].value = true;
    const button = document.querySelector(`#${element}`);
    button.classList.add("button--active");
    states[element].trueText && changeButtonText(button);
  }
}

function handlePlayClick() {
  changeButtonStatus("play");
  if (states.play.value) {
    timer && timer.pause();
    hide("best", "gravity", "feed");
    game.start();
  } else {
    buttons.forEach(button => {
      button.disabled = button.id === "feed" && false;
      button.disabled = button.id === "play" && true;
    });
    game.end();
  }
}

function handleBestClick() {
  changeButtonStatus("best");
  const ol = document.querySelector(".records");
  const messageElements = message.querySelectorAll("*");
  if (states.best.value) {
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

    const resultsNumber = SCORES.length > 5 ? 5 : SCORES.length;
    for (let i = resultsNumber - 1; i >= 0; i--) {
      const li = document.createElement("li");
      li.classList.add("record");

      for (let el in SCORES[i]) {
        const span = document.createElement("span");
        span.textContent = SCORES[i][el];
        li.appendChild(span);
      }
      ol.appendChild(li);
    }
  } else {
    ol.textContent = "";
    messageElements.forEach(element => {
      return element.id === "title" ||
        element.id === "records" ||
        element.id === "line-first" ||
        element.id === "line-second"
        ? (element.style.display = "none")
        : (element.style.display = "");
    });
    buttons.forEach(button => {
      button.disabled = false;
    });
  }
  message.classList.toggle("message--active");
  shadow.classList.toggle("shadow--active");
}

function handleGravityClick() {
  changeButtonStatus("gravity");
}

function handleSaveClick() {
  game.saveScore();
}

function handleExitClick() {
  game.handleExit();
  states.play.value && changeButtonStatus("play");
  turnOff("stop");

  window.cancelAnimationFrame(REQUEST_ID);
  animation();
}

function handleStopClick() {
  changeButtonStatus("stop");
  pauseFeedEffect();
  window.cancelAnimationFrame(REQUEST_ID);
  animation();
}
function handleHelpClick() {
  changeButtonStatus("help");
  helpMessage.classList.toggle("settings__message--active");
}
function handleSoundClick() {
  changeButtonStatus("sound");
  sounds();
}

function changeButtonText(button) {
  const state = button.id;
  button.innerHTML = states[state].value
    ? states[state].trueText
    : states[state].falseText;
}

function pauseFeedEffect() {
  if (!timer) return;
  else if (states.stop.value) {
    timer.pause();
  } else if (!states.stop.value && states.feed.value) {
    timer.resume();
  }
}

function resumeCirclesMove(id) {
  if (id === "stop" && !states.stop.value) {
    return;
  } else {
    changeButtonStatus("stop");
  }
}

function changeButtonStatus(id) {
  const button = document.querySelector(`#${id}`);
  states[id].value = !states[id].value;
  states[id].trueText && changeButtonText(button);
  button.classList.toggle("button--active");
}

function handleFeedClick() {
  const button = document.querySelector(`#feed`);
  changeButtonStatus("feed");
  button.disabled = true;

  timer = new Timer(function() {
    button.disabled = false;
    changeButtonStatus("feed");
  }, 2000);
  pauseFeedEffect();
  states.stop.value && handleStopClick();
}
