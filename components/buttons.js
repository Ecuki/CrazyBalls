const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  if (button.id === "play") {
    button.addEventListener("click", () => handlePlayButton(`${button.id}`));
  } else if (button.id === "feed") {
    button.addEventListener("click", () => handelFeedButton(`${button.id}`));
  } else if (button.id === "stop") {
    button.addEventListener("click", () => handleStopButton(`${button.id}`));
  } else {
    button.addEventListener("click", () => changeButtonStatus(`${button.id}`));
  }
});
let timer = null;

const state = {
  stop: {
    value: false,
    falseText: `<i class="fas fa-pause-circle"></i>Stop`,
    trueText: `<i class="fas fa-play-circle"></i></i>Start`
  },
  gravity: {
    value: false,
    falseText: `<i class="fas fa-apple-alt"></i>ON  Gravity`,
    trueText: `<i class="fas fa-expand-arrows-alt"></i>ON  Gravity`
  },
  play: {
    value: false,
    falseText: `<i class="fas fa-gamepad"></i>Play`,
    trueText: `<i class="fas fa-times-circle"></i>Exit`
  },
  feed: false
};
function hide(element) {
  element.style.visibility = "hidden";
}
function show(element) {
  element.style.visibility = "visible";
}
function startPlay(id) {
  state.gravity.value = false;
  show(resultContener);
  buttons.forEach(button => {
    button.id !== id && hide(button);
  });
}
function endPlay(id) {
  hide(resultContener);
  buttons.forEach(button => {
    button.id !== id && show(button);
  });
}
function handlePlayButton(id) {
  changeButtonStatus(`${id}`);
  gameReset();
  clearLevel();

  state.play.value ? startPlay(id) : !state.play.value && endPlay(id);
}
function handelFeedButton(id) {
  const button = document.querySelector(`#${id}`);
  button.disabled = true;
  state.feed = true;
  timer = new Timer(function() {
    button.disabled = false;
    state.feed = false;
  }, 2000);
  pauseFeedEffect();
}

function changeButtonText(button, id) {
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

function handleStopButton(id) {
  changeButtonStatus(id);
  pauseFeedEffect();
}

function resumeCirclesMove(id) {
  if (id !== "stop" && state.stop.value && state[id].value)
    changeButtonStatus("stop");
}

function changeButtonStatus(id) {
  const button = document.querySelector(`.${id}`);
  state[id].value = !state[id].value;
  resumeCirclesMove(id);

  button.classList.toggle("button--active");

  changeButtonText(button, id);
  window.cancelAnimationFrame(requestID);
  animation();
}
