// Player factory
const playerFactory = (nick, marker) => {
  return { nick, marker };
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
    if (!indexCell) return; // Return if user click outside
    if(gameBoardArray[indexCell] === 'X' || gameBoardArray[indexCell] === 'O') {
      return
    }
    gameBoardArray[indexCell] = gameController.getPlayer().marker;
    item.target.textContent = gameController.getPlayer().marker;
    gameController.switchPlayerMarker();
    console.log(gameBoardArray)

    gameController.checkWinner();
    
  });

  return {
    gameBoardArray,
  };
})();

// Game controller module IIFE
const gameController = (() => {
  console.log("gameController run");

  let winCells = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const playerO = playerFactory("playerO", "O");
  const playerX = playerFactory("playerX", "X");

  let defaultPlayer = playerO;

  // Get value from the IIFE. Return variable from IIFE.
  const getPlayer = () => defaultPlayer;

  const switchPlayerMarker = () => {
    defaultPlayer === playerO
      ? defaultPlayer = playerX
      : defaultPlayer = playerO;
    console.log("default func", defaultPlayer);
    console.log(defaultPlayer)
  };

  // function switchPlayerMarker(){
  //   this.defaultPlayer === playerO
  //     ? this.defaultPlayer = playerX
  //     : this.defaultPlayer = playerO;
  //   console.log("default func", defaultPlayer);
  //   console.log(defaultPlayer.nick)
  // }

  const checkWinner = () => {
    let array = gameBoard.gameBoardArray;
    for (const [a,b,c] of winCells) {
      if(array[a] && array[b] && array[c] === 'X'){
        console.log("win x")
      }
    }
  }


  return {
    checkWinner,
    getPlayer,
    switchPlayerMarker
  };
})();
