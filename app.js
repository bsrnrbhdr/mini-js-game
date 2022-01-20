import GameCanvas from "./scripts/gameCanvas.js";
var Game = new GameCanvas();
//--------------------------------------------------------------------
window.addEventListener("keydown", function (e) {
  Game.player.keys[e.keyCode] = true;
  Game.player.moving = true;
});

window.addEventListener("keyup", function (e) {
  delete Game.player.keys[e.keyCode];
  Game.player.moving = false;
  Game.player.anim = "idle";
});
//--------------------------------------------------------------------
let fps, fpsInterval, startTime, now, then, elapsed;
//--------------------------------------------------------------------
function start(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}
//--------------------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    Game.start();
    requestAnimationFrame(animate);
  }
}
//--------------------------------------------------------------------
start(10);
