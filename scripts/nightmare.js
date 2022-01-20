import * as gameFunctions from "gamefunctions.js";
const nightmare = new Image();
nightmare.src = "/mini-js-game/assets/Nightmare-Files/PNG/nightmare-galloping.png";
const nightmare_dead = new Image();
nightmare_dead.src = "/mini-js-game/assets/explosions-pack-web/spritesheets/explosion-4.png";
const canvas = document.getElementById("canvas1");

export default class Nightmare {
  constructor() {
    (this.x = gameFunctions.randomIntFromInterval(
      canvas.width,
      canvas.width + 10
    )),
      (this.y = gameFunctions.randomIntFromInterval(0, canvas.height)),
      (this.speed = 12),
      (this.frame_count = 3),
      (this.frameY = 0),
      (this.frameX = 0),
      (this.alive = true),
      (this.anim_count = 0),
      (this.width = 144),
      (this.heigth = 96),
      (this.canvas_w = 65),
      (this.canvas_h = 30),
      (this.anim = "run");
    this.Sprite = nightmare;
  }
  //--------------------------------------------------------------------
  setNightmareSprite() {
    switch (this.anim) {
      case "dead":
        this.frame_count = 11;
        this.width = 128;
        this.height = 128;
        this.canvas_w = 60;
        this.Sprite = nightmare_dead;
        break;
      case "run":
        this.x -= 12;
        break;
      default:
        break;
    }
  }
  //--------------------------------------------------------------------
}
