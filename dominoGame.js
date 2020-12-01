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

//   push 7 random tile to players
const pickTiles = (player) => {
  for (let i = 0; i < 7; i++) {
    player.push(getRandomTile(stock));
  }
};
pickTiles(player1);
pickTiles(player2);
//   push random tile to desktop
desktop.unshift(getRandomTile(player1));
console.log(`Game starts with first tile`, getRandomTile(player1));

const deskB = desktop[0][0];
const deskE = desktop[desktop.length - 1][1];
//filters matched tiles then returns a valid tile
const checkFit = (player) => {
  const canFit = player
    .filter(
      (p) => p[0] == deskB || p[0] == deskE || p[1] == deskB || p[1] == deskE
    )
    .find((el) => el);
  return canFit;
};
// push/unshift  valid tile to desktop
const checkPlayer = (desk, player) => {
  if (checkFit(player)) {
    const n0 = checkFit(player)[0];
    const n1 = checkFit(player)[1];

    if (n0 == deskB) {
      desktop.unshift(checkFit(player).reverse());

      player.splice(checkFit(player), 1);
    } else if (n1 == deskB) {
      desktop.unshift(checkFit(player));

      player.splice(checkFit(player), 1);
    } else if (n0 == deskE) {
      desktop.push(checkFit(player));

      player.splice(checkFit(player), 1);
    } else if (n1 == deskE) {
      desktop.push(checkFit(player).reverse());
    }

    return true;
  } else {
    player.push(getRandomTile(stock));
    return false;
  }
};

function isGameOver() {
  if (stock.length === 0) {
    console.log(`No tiles available in the stock, opponent wins`);
  } else {
    if (player1.length === 0 || player2.length === 0) {
      if (player1.length > player2.length) {
        console.log("player2 Wins");
      } else {
        console.log("player1 Wins");
      }
      console.log(player1);
      console.log(player2);
      console.log(stock.length);
      console.log(desktop);
      console.log("Game Over");
      return true;
    } else {
      return false;
    }
  }
}

isGameOver();
let currentPlayer = 2;
do {
  if (currentPlayer === 2) {
    checkPlayer(desktop, player1);
    console.log(`Player2 plays <${checkFit(player2)}>`);
    console.log(`desktop is now`, desktop);
    currentPlayer = 1;
  } else {
    checkPlayer(desktop, player1);
    console.log(`Player1 plays <${checkFit(player1)}>`);
    console.log(`desktop is now`, desktop);
    currentPlayer = 2;
  }
} while (!isGameOver());
