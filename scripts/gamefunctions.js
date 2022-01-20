//--------------------------------------------------------------------
export function Collider2d(player, object) {
  if (
    player.x > object.x + object.canvas_w ||
    player.x + player.canvas_w < object.x ||
    player.y > object.y + object.canvas_h ||
    player.y + player.canvas_h < object.y
  ) {
    return false;
  } else {
    return true;
  }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
export function checkDist(player, object, choice) {
  let dist = choice;
  if (
    player.x > object.x + object.canvas_w + dist ||
    player.x + player.canvas_w < object.x - dist ||
    player.y > object.y + object.canvas_h + dist ||
    player.y + player.canvas_h < object.y - dist
  ) {
    return false;
  } else {
    return true;
  }
}
//--------------------------------------------------------------------
export function Attack(player, enemy) {
  let collision = Collider2d(player, enemy);
  if (collision && player.anim == "attack") {
    //enemy died
    return true;
  } else if (collision && player.anim != "attack") {
    //player died
    return false;
  }
  return true;
}

//--------------------------------------------------------------------
export function drawSprite(ctx, img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
//--------------------------------------------------------------------
export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
export function handleFrameX(element) {
  if (element.frameX < element.frame_count) {
    element.frameX++;
  } else {
    element.frameX = 0;
  }
}
//--------------------------------------------------------------------
