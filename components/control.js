const key = {
  up: false,
  right: false,
  down: false,
  left: false
};
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    key.right = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    key.left = true;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    key.up = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    key.down = true;
  }
}

function keyUpHandler(e) {
  switch (e.key) {
    case "ArrowUp":
      key.up = false;
      break;
    case "ArrowRight":
      key.right = false;
      break;
    case "ArrowDown":
      key.down = false;
      break;
    case "ArrowLeft":
      key.left = false;
      break;
    default:
  }
  false;
}
