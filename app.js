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
    if(gameController.gameOver()) return; // if gameOver is true, then do nothing

    gameBoardArray[indexCell] = gameController.getPlayer().marker;
    item.target.textContent = gameController.getPlayer().marker;
    gameController.lastCells -= 1;

    gameController.checkWinner();

    if(gameController.gameOver() === false){ // if gameOver is false, switch markers until win / 0 cells
      if(gameController.lastCells > 0){
        console.log("playing")
        gameController.switchPlayerMarker();
        console.log(gameController.lastCells)
      } else if (gameController.lastCells === 0){
        console.log("zero cells")
      }
    } 
    
  });

  return {
    gameHtml,
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
  let winner = false;
  let lastCells = 9;

  // Get value from the IIFE. Return variable from IIFE.
  const getPlayer = () => defaultPlayer;

  const switchPlayerMarker = () => {
    defaultPlayer === playerO
      ? defaultPlayer = playerX
      : defaultPlayer = playerO;
    console.log(defaultPlayer)
  };


  const resetBoard = (array) => {
    for (let i = 0; i < 9; i++) {
      array[i] = '';
    }
  }

  const checkWinner = () => {
    let array = gameBoard.gameBoardArray;
    for (const [a,b,c] of winCells) {
      if(array[a] === 'X' && array[b] === 'X' && array[c] === 'X'){
        console.log('x win')
        resetBoard(array);
        // resetInterface();
        winner = true;
      } else if (array[a] === 'O' && array[b] === 'O' && array[c] === 'O'){
        console.log('o win')
        resetBoard(array);
        winner = true;
      }
    }
  }

  const gameOver = () => {
    return winner;
  }

  return {
    lastCells,
    gameOver,
    checkWinner,
    getPlayer,
    switchPlayerMarker
  };
})();
