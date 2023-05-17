// Player factory
const playerFactory = (nick, marker) => {
  const whatMarker = () => console.log("marker", marker);
  return { nick, marker, whatMarker };
};

// Game board module IIFE
const gameBoard = (() => {
  console.log("gameboard run");
  const gameHtml = document.querySelector("#gameBoard");
  let gameBoardArray = [];

  for (let i = 0; i < 9; i++) {
    gameBoardArray.push("");
  }

  gameBoardArray.forEach((item, index) => {
    const gameCell = document.createElement("div");
    gameCell.classList.add("gameCell");
    gameCell.textContent = item;
    gameCell.dataset.index = index;
    gameHtml.appendChild(gameCell);
  });

  gameHtml.addEventListener("click", (item) => {
    let indexCell = item.target.dataset.index;
    console.log(item);
    gameBoardArray[indexCell] = gameController.defaultPlayer.marker;
    item.target.textContent = gameController.defaultPlayer.marker;
    console.log(gameBoardArray)

  });

  return {
    gameBoardArray,
  };
})();

// Game controller module IIFE
const gameController = (() => {
  console.log("gameController run");

  const playerO = playerFactory("playerO", "O");
  const playerX = playerFactory("playerX", "X");

  const defaultPlayer = playerO;

  return {
    defaultPlayer
  }
})();
