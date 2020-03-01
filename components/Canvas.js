const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
canvas.addEventListener("click", () => handleCanvasClick());
function handleCanvasClick() {
  states.best.value && handleBestClick();
  circles.length > maxOnCanvas && circles.splice(0, circlesAfterClick);
  states.help.value && handleHelpClick();
  refreshAnimation(circlesAfterClick);
}
