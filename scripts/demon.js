import * as gameFunctions from "gamefunctions.js";

const demon_idle = new Image();
demon_idle.src = "/mini-js-game/assets/demon-Files/PNG/demon-idle.png";
const demon_attack = new Image();
demon_attack.src = "/mini-js-game/assets/demon-Files/PNG/demon-attack.png";
const demon_dead = new Image();
demon_dead.src = "/mini-js-game/assets/explosions-pack-web/spritesheets/explosion-4.png";
//--------------------------------------------------------------------
const canvas = document.getElementById("canvas1");
//--------------------------------------------------------------------
export default class Demon {
  constructor() {
    this.anim_count = 0;
    (this.width = 160),
      (this.heigth = 144),
      (this.canvas_w = 70),
      (this.canvas_h = 50),
      (this.frameX = 0),
      (this.frameY = 0),
      (this.speed = 3),
      (this.moving = false),
      (this.anim = "idle"),
      (this.alive = true),
      this.Sprite,
      (this.frame_count = 5),
      //horizontal position
      (this.x = 700 - gameFunctions.randomIntFromInterval(0, canvas.width / 4)),
      //vertical position
      (this.y = gameFunctions.randomIntFromInterval(
        0,
        canvas.height - this.canvas_h
      ));
  }

  //--------------------------------------------------------------------
  setDemonSprite() {
    switch (this.anim) {
      case "idle":
        this.frame_count = 5;
        this.width = 160;
        this.height = 144;
        this.canvas_w = 70;
        this.Sprite = demon_idle;
        break;
      case "dead":
        this.frame_count = 11;
        this.width = 128;
        this.height = 128;
        this.canvas_w = 60;
        this.Sprite = demon_dead;
        break;
      case "attack":
        this.frame_count = 10;
        this.width = 240;
        this.height = 192;
        this.canvas_w = 80;
        this.Sprite = demon_attack;
        break;
      default:
        this.frame_count = 5;
        this.width = 160;
        this.height = 144;
        this.canvas_w = 70;
        this.Sprite = demon_idle;
        break;
    }
  }
  //--------------------------------------------------------------------
}
