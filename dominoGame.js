const stock = [];
const desktop = [];
const player1 = [];
const player2 = [];

//  create stock
for (let i = 0; i < 7; i++) {
  for (let j = i; j < 7; j++) {
    stock.push([i, j]);
  }
}

//   get random tile
const getRandomTile = (arr) => {
  const randomNum = Math.floor(Math.random() * arr.length);
  const randomTile = arr[randomNum];
  arr.splice(randomNum, 1);
  return randomTile;
};
console.log(getRandomTile(stock));
//   push random tile to desktop
desktop.unshift(getRandomTile(stock));
console.log(desktop);

const pickTiles = (player) => {
  for (let i = 0; i < 7; i++) {
    player.push(getRandomTile(stock));
  }
};
console.log(desktop);
pickTiles(player1);
pickTiles(player2);

console.log(desktop);
console.log(player1);
console.log(player2);
console.log(stock.length);
desktop.push(getRandomTile(stock));
console.log(desktop);
const deskB = desktop[0][0];
const deskE = desktop[desktop.length - 1][1];

console.log(player1.length);

const checkFit = (player) => {
  const canFit = player
    .filter(
      (p) => p[0] == deskB || p[0] == deskE || p[1] == deskB || p[1] == deskE
    )
    .find((el) => el);
  return canFit;
};
console.log(checkFit(player1));

const checkPlayer = (desk, player) => {
  if (checkFit(player)) {
    console.log(`Player A plays < ${checkFit(player)} > `);
    const n0 = checkFit(player)[0];
    const n1 = checkFit(player)[1];

    if (n0 == deskB) {
      desktop.unshift(checkFit(player).reverse());
      console.log(`Player A plays < ${checkFit(player)} > `);
      player.splice(checkFit(player), 1);
    } else if (n1 == deskB) {
      desktop.unshift(checkFit(player));
      console.log(console.log(`Player A plays < ${checkFit(player)} > `));
      player.splice(checkFit(player), 1);
    } else if (n0 == deskE) {
      desktop.push(checkFit(player));
      console.log(console.log(`Player A plays < ${checkFit(player)} > `));
      player.splice(checkFit(player), 1);
    } else if (n1 == deskE) {
      console.log(checkFit(player));
      desktop.push(checkFit(player).reverse());
      console.log(console.log(`Player A plays < ${checkFit(player)} > `));
    }

    return true;
  } else {
    player.push(getRandomTile(stock));
    return false;
  }
};

isGameOver();
const turn = (player) => {
  let success;
  do {
    success = checkPlayer(desktop, player);
  } while (!success);
};

function isGameOver() {
  if (player1.length === 0 || player2.length === 0) {
    if (player1.length > player2.length) {
      console.log("player2 Wins");
    } else {
      console.log("player1 Wins");
    }
    console.log(player1);
    console.log(player2);
    console.log(stock);
    console.log(desktop);
    console.log("Game Over");

    return true;
  } else {
    return false;
  }
}
let currentPlayer = 1;

do {
  if (currentPlayer === 1) {
    turn(player1);
    currentPlayer = 2;
  } else {
    turn(player2);
    currentPlayer = 1;
  }
} while (!isGameOver());
