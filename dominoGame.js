const stock = [];
const desktop = [];
const player1 = [];
const player2 = [];
var deskB = null;
var deskE = null;
var gameOver = false;
//  create stock
function generateStock() {
  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      stock.push([i, j]);
    }
  }
}
generateStock();
//   get random tile
const getRandomTile = (arr) => {
  const randomNum = Math.floor(Math.random() * arr.length);
  const randomTile = arr[randomNum];
  arr.splice(randomNum, 1);
  return randomTile;
};
// console.log(getRandomTile(stock));
//   push 7 random tile to players
const pickTiles = (player) => {
  for (let i = 0; i < 7; i++) {
    player.push(getRandomTile(stock));
  }
};
pickTiles(player1);
pickTiles(player2);
// filters matched tiles then returns a valid tile
function checkFit(player) {
  const canFit = player
    .filter(
      (p) => p[0] == deskB || p[0] == deskE || p[1] == deskB || p[1] == deskE
    )
    .find((el) => el);
  // console.log("canFit:",canFit);
  return canFit;
}
function checkStockFit(stock) {
  const canStockFit = stock
    .filter(
      (p) => p[0] == deskB || p[0] == deskE || p[1] == deskB || p[1] == deskE
    )
    .find((el) => el);
  const index = stock.indexOf(canStockFit);
  stock.splice(index, 1);
  console.log("=====:", canStockFit);
  return canStockFit;
}
function startGame() {
  //   push random tile to desktop
  desktop.unshift(getRandomTile(player1));
  console.log("desktop", desktop);
  deskB = desktop[0][0];
  deskE = desktop[desktop.length - 1][1];
}
startGame();
// checkFit(player2);
while (!gameOver) {
  play(player2, "P2");
  if (!gameOver) {
    play(player1, "P1");
  }
  console.log("desktop", desktop);
}
// push/unshift  valid tile to desktop
function play(player, playerName) {
  let canFit = checkFit(player);
  if (canFit) {
    putToDesktop(playerName, player, canFit);
  } else {
    console.log(`${playerName} has no fit`);
    if (stock.length != 0) {
      do {
        console.log("getting from stock");
        console.log(stock);
        console.log("deskB", deskB);
        console.log("deskE", deskE);
        canFit = checkStockFit(stock);
        if (canFit == undefined) {
          console.log("GAME OVER!");
          console.log(`${playerName} lost!`);
          gameOver = true;
          break;
        }
        console.log("stockFit:", canFit);
      } while (canFit.length == 0);
      if (canFit != undefined) {
        putToDesktop(playerName, player, canFit);
      }
    } else {
      console.log(`No tiles available in the stock, opponent wins`);
      gameOver = true;
    }
  }
}
function putToDesktop(playerName, player, cardFitted) {
  const n0 = cardFitted[0];
  const n1 = cardFitted[1];
  if (n0 == deskB) {
    desktop.unshift(cardFitted.reverse());
    console.log(playerName, cardFitted);
    player.splice(cardFitted, 1);
    deskB = n1;
  } else if (n1 == deskB) {
    desktop.unshift(cardFitted);
    console.log(playerName, cardFitted);
    player.splice(cardFitted, 1);
    deskB = n0;
  } else if (n0 == deskE) {
    desktop.push(cardFitted);
    console.log(playerName, cardFitted);
    player.splice(cardFitted, 1);
    deskE = n1;
  } else if (n1 == deskE) {
    desktop.push(cardFitted.reverse());
    console.log(playerName, cardFitted);
    player.splice(cardFitted, 1);
    deskE = n0;
  }
}
