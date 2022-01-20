import * as gameFunctions from "./gamefunctions.js";

const coin_blue = new Image();
coin_blue.src = "assets/spr_coin_azu.png";
const coin_red = new Image();
coin_red.src = "assets/spr_coin_roj.png";
const coin_green = new Image();
coin_green.src = "assets/spr_coin_strip4.png";
const coin_yellow = new Image();
coin_yellow.src = "assets/spr_coin_ama.png";
//--------------------------------------------------------------------
const canvas = document.getElementById("canvas1");
//--------------------------------------------------------------------

export const Color = {
  RED: coin_red,
  BLUE: coin_blue,
  GREEN: coin_green,
  YELLOW: coin_yellow,
};
Object.freeze(Color);

export class Coin {
  // Create new instances of the same class as static attributes
  constructor(choice) {
    //horizontal position
    (this.x =
      canvas.width - gameFunctions.randomIntFromInterval(0, canvas.width / 4)),
      //vertical position
      (this.y = gameFunctions.randomIntFromInterval(0, canvas.height)),
      (this.width = 16),
      (this.heigth = 16),
      (this.canvas_w = 16),
      (this.canvas_h = 8),
      (this.frameX = 0),
      (this.frameY = 0),
      (this.anim = "idle"),
      (this.Sprite = choice),
      this.frame_count;
  }

  //--------------------------------------------------------------------
  handleCoinFrame() {
    if (this.frameX < this.frame_count) {
      this.frameX++;
      this.x -= 10;
    } else {
      this.frameX = 0;
    }
  }
  //--------------------------------------------------------------------

  setCoinSprite() {
    switch (this.anim) {
      case "idle":
        this.frame_count = 3;
        break;
      case "gone":
        break;
      default:
        break;
    }
  }
  //--------------------------------------------------------------------
}
