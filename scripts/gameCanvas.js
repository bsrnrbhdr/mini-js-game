import Demon from "/demon.js";
import Player from "/player.js";
import Nightmare from "/nightmare.js";
import { Color, Coin } from "/coins.js";
import * as gameFunctions from "/gamefunctions.js";
//--------------------------------------------------------------------
export default class gameCanvas {
  constructor() {
    (this.coin_points = 0),
      (this.enemy_kill = 0),
      (this.is_game_over = false),
      (this.gravity = 5),
      (this.player = new Player()),
      (this.enemies = [new Demon(), new Demon()]),
      (this.coins = []),
      (this.to_Destruct = []),
      (this.canvas = document.getElementById("canvas1")),
      (this.ctx = this.canvas.getContext("2d")),
      (this.canvas.width = 800),
      (this.canvas.heigth = 500);
    (this.background = new Image()),
      (this.background.src = "/mini-js-game/assets/background.png");
  }
  //--------------------------------------------------------------------
  createCoins() {
    if (this.coins.length < 4) {
      this.coins.push(new Coin(Color.RED));
      this.coins.push(new Coin(Color.BLUE));
      this.coins.push(new Coin(Color.GREEN));
      this.coins.push(new Coin(Color.YELLOW));
      this.coins.push(new Coin(Color.RED));
      this.coins.push(new Coin(Color.BLUE));
      this.coins.push(new Coin(Color.GREEN));
      this.coins.push(new Coin(Color.YELLOW));
    }
  }
  //--------------------------------------------------------------------
  createEnemies() {
    if (this.enemies.length < 3) {
      for (let i = 0; i < 3; ++i) {
        this.enemies.push(new Nightmare());
      }
      this.enemies.push(new Demon());
    }
  }
  //--------------------------------------------------------------------
  collectPoints() {
    this.coins.forEach((element) => {
      if (gameFunctions.checkDist(this.player, element, 10)) {
        element.x++;
      }
      if (gameFunctions.Collider2d(this.player, element)) {
        this.coin_points += 10;
        this.to_Destruct.push(element);
      }
      if (element.x < 0) {
        this.to_Destruct.push(element);
      }
    });
    this.createCoins();
  }
  //--------------------------------------------------------------------
  nearEnemy() {
    this.enemies.forEach((enemy) => {
      if (enemy.x < 0) {
        this.to_Destruct.push(enemy);
      }
      if (
        enemy.constructor == Demon &&
        gameFunctions.checkDist(this.player, enemy, 300) &&
        enemy.anim != "attack" &&
        enemy.alive
      ) {
        enemy.anim = "attack";
      } else if (
        enemy.constructor == Demon &&
        !gameFunctions.checkDist(this.player, enemy, 300) &&
        enemy.anim != "idle"
      ) {
        enemy.anim = "idle";
      }
    });
  }
  //--------------------------------------------------------------------
  destuctElements() {
    if (this.to_Destruct.length > 0) {
      this.to_Destruct.forEach((element) => {
        switch (element.constructor) {
          case Nightmare:
            element.anim_count++;
            if (element.anim_count > 3) {
              this.enemies = this.enemies.filter((item) => item !== element);
              this.to_Destruct = this.to_Destruct.filter(
                (item) => item !== element
              );
            }
            break;
          case Demon:
            element.anim_count++;
            if (element.anim_count > 3) {
              this.enemies = this.enemies.filter((item) => item !== element);
              this.to_Destruct = this.to_Destruct.filter(
                (item) => item !== element
              );
            }
            break;
          case Coin:
            this.coins = this.coins.filter((item) => item !== element);
            this.to_Destruct = this.to_Destruct.filter(
              (item) => item !== element
            );
            break;

          default:
            break;
        }
      });
    }
    this.createEnemies();
  }
  //--------------------------------------------------------------------
  gameOver() {
    if (this.player.lives <= 0) {
      this.is_game_over = true;
      this.player.moving = false;
      this.player.anim = "dead";
    } else if (this.player.lives > 0) {
      this.enemies.forEach((enemy) => {
        if (!this.to_Destruct.includes(enemy)) {
          if (!gameFunctions.Attack(this.player, enemy)) {
            this.player.lives--;
          } else if (
            gameFunctions.Attack(this.player, enemy) &&
            gameFunctions.Collider2d(this.player, enemy)
          ) {
            enemy.anim = "dead";
            enemy.alive = false;
            this.enemy_kill++;
            this.to_Destruct.push(enemy);
          }
        }
      });
    }
  }
  //--------------------------------------------------------------------
  drawScore() {
    this.ctx.font = "12px Consolas";
    this.ctx.fillStyle = "#00000";
    this.ctx.fillText("Score: " + this.coin_points, 0, 10);
    this.ctx.fillText("Enemy kill: " + this.enemy_kill, 0, 20);
    this.ctx.fillText("Enemy kill: " + this.enemy_kill, 0, 20);
  }
  //--------------------------------------------------------------------

  drawClearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth);
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.background.width,
      this.background.height, // source rectangle
      0,
      0,
      this.canvas.width,
      this.canvas.height
    ); // destination rectangle
  }
  //--------------------------------------------------------------------
  drawEnemies() {
    this.enemies.forEach((enemy) => {
      switch (enemy.constructor) {
        case Demon:
          enemy.setDemonSprite();
          break;
        case Nightmare:
          enemy.setNightmareSprite();
          break;
        default:
          break;
      }

      gameFunctions.handleFrameX(enemy);
      gameFunctions.drawSprite(
        this.ctx,
        enemy.Sprite,
        enemy.width * enemy.frameX,
        enemy.heigth * enemy.frameY,
        enemy.width,
        enemy.heigth,
        enemy.x,
        enemy.y,
        enemy.canvas_w,
        enemy.canvas_h
      );
    });
  }
  //--------------------------------------------------------------------
  drawPlayer() {
    this.player.movePlayer();
    this.player.handlePlayerFrame();
    this.player.setPlayerSprite();
    gameFunctions.drawSprite(
      this.ctx,
      this.player.Sprite,
      this.player.width * this.player.frameX,
      this.player.heigth * this.player.frameY,
      this.player.width,
      this.player.heigth,
      this.player.x,
      this.player.y,
      this.player.canvas_w,
      this.player.canvas_h
    );
  }
  //--------------------------------------------------------------------
  //--------------------------------------------------------------------
  drawCoins() {
    this.coins.forEach((coin) => {
      coin.setCoinSprite();
      coin.handleCoinFrame();
      gameFunctions.drawSprite(
        this.ctx,
        coin.Sprite,
        coin.width * coin.frameX,
        coin.heigth * coin.frameY,
        coin.width,
        coin.heigth,
        coin.x,
        coin.y,
        coin.canvas_w,
        coin.canvas_h
      );
    });
  }
  //--------------------------------------------------------------------
  start() {
    this.drawClearCanvas();
    this.drawEnemies();
    this.nearEnemy();
    this.drawPlayer();
    this.drawCoins();
    this.collectPoints();
    this.drawScore();
    this.destuctElements();
    this.gameOver();
  }
}
