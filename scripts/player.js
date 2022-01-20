// --------------PLAYER SPRITES--------------------------------------
const playerSpriteIdle = new Image();
playerSpriteIdle.src = "assets/Blue_witch/B_witch_idle.png";
const playerSpriteRunRight = new Image();
playerSpriteRunRight.src = "assets/Blue_witch/B_witch_run_right.png";
const playerSpriteRunLeft = new Image();
playerSpriteRunLeft.src = "assets/Blue_witch/B_witch_run_left.png";
const playerSpriteAttack = new Image();
playerSpriteAttack.src = "assets/Blue_witch/B_witch_attack.png";
const playerSpriteDead = new Image();
playerSpriteDead.src = "assets/Blue_witch/B_witch_death.png";
const playerSpriteRespawn = new Image();
playerSpriteRespawn.src = "assets/Blue_witch/B_witch_charge.png";
//--------------------------------------------------------------------
const canvas = document.getElementById("canvas1");
//--------------------------------------------------------------------

//--------------------------------------------------------------------
export default class Player {
  constructor() {
    //horizontal position
    (this.x = 0),
      //vertical position
      (this.y = 108),
      (this.width = 32),
      (this.heigth = 48),
      (this.canvas_w = 32),
      (this.canvas_h = 32),
      (this.frameX = 0),
      (this.frameY = 0),
      (this.speed = 6),
      (this.moving = false),
      (this.anim = "idle"),
      (this.lives = 3),
      this.Sprite,
      this.frame_count,
      //key up,down by event listeners
      (this.keys = []);
  }

  //--------------------------------------------------------------------

  handlePlayerFrame() {
    if (!this.moving && this.anim == "respawn" && this.lives == 3) {
      this.anim = "idle";
    }
    if (
      this.frameY < this.frame_count &&
      (this.moving ||
        this.anim == "idle" ||
        this.anim == "dead" ||
        this.anim == "respawn")
    ) {
      this.frameY++;
    } else {
      this.frameY = 0;
      if (this.anim == "dead") {
        this.anim = "respawn";
      }
      if (this.anim == "respawn") {
        this.x = 0;
        this.y = 108;
        this.lives++;
      }
    }
  }
  //--------------------------------------------------------------------
  //--------------------------------------------------------------------
  movePlayer() {
    //left arrow
    if (this.keys[37] && this.x > 0) {
      this.x -= this.speed;
      this.moving = true;
      this.anim = "left";
    }
    //up arrow
    if (this.keys[38] && this.y > 0) {
      this.y -= this.speed;
      this.moving = true;
      this.anim = "up";
    }
    //right arrow
    if (this.keys[39] && canvas.width > this.x + this.canvas_w) {
      this.x += this.speed;
      this.moving = true;
      this.anim = "right";
    }
    //down arrow
    if (this.keys[40] && canvas.height > this.canvas_h + this.y) {
      this.y += this.speed;
      this.moving = true;
      this.anim = "down";
    }
    //space
    if (this.keys[32]) {
      this.moving = true;
      this.anim = "attack";
    }
  }
  //--------------------------------------------------------------------

  setPlayerSprite() {
    switch (this.anim) {
      case "idle":
        this.canvas_w = 32;
        this.width = 32;
        this.heigth = 48;
        this.Sprite = playerSpriteIdle;
        this.frame_count = 5;
        break;
      case "up":
        this.canvas_w = 32;
        this.width = 32;
        this.heigth = 48;
        this.Sprite = playerSpriteRunRight;
        this.frame_count = 7;
        break;
      case "down":
        this.Sprite = playerSpriteRunRight;
        this.frame_count = 7;
        break;
      case "left":
        this.canvas_w = 32;
        this.width = 32;
        this.heigth = 48;
        this.Sprite = playerSpriteRunLeft;
        this.frame_count = 7;
        break;
      case "right":
        this.canvas_w = 32;
        this.width = 32;
        this.heigth = 48;
        this.Sprite = playerSpriteRunRight;
        this.frame_count = 7;
        break;
      case "dead":
        this.canvas_w = 32;
        this.width = 32;
        this.Sprite = playerSpriteDead;
        this.heigth = 40;
        this.frame_count = 11;
        break;
      case "respawn":
        this.canvas_w = 32;
        this.width = 32;
        this.heigth = 48;
        this.Sprite = playerSpriteRespawn;
        this.frame_count = 4;
        break;
      case "attack":
        this.Sprite = playerSpriteAttack;
        this.width = 104;
        this.heigth = 46;
        this.canvas_w = 150;
        this.frame_count = 8;
        break;
      default:
        break;
    }
  }
}
