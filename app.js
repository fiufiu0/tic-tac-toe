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
    gameController.rounds(); // decrement rounds
    gameController.checkWinner();


    if(gameController.gameOver() === false){ // if gameOver is false, switch markers until win / 0 cells
      if(gameController.howRounds() > 0){
        console.log("playing")
        gameController.switchPlayerMarker();
        console.log(gameController.howRounds())
      } else if (gameController.howRounds() === 0){
        console.log("zero cells")
        gameController.showTie();
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

  const playerO = playerFactory("Player O", "O");
  const playerX = playerFactory("Player X", "X");

  const playerInfo = document.getElementById("playerInfo");
  const restartBtn = document.getElementById("restartBtn");
  const gameCells = document.querySelectorAll(".gameCell")

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

  let defaultPlayer = playerO;
  let winner = false;
  let lastCells = 9;

  // Get value from the IIFE. Return variable from IIFE.
  const getPlayer = () => defaultPlayer;
  

  const switchPlayerMarker = () => {
    defaultPlayer === playerO
      ? defaultPlayer = playerX
      : defaultPlayer = playerO;
      showCurrentPlayer();
  };


  const resetBoard = (array) => {
    for (let i = 0; i < 9; i++) {
      array[i] = '';
    }
  }

  const restartGame = () => {
    resetBoard(gameBoard.gameBoardArray);

    gameCells.forEach(cell => {
      cell.textContent = '';
    })

    winner = false;
    lastCells = 9;
    defaultPlayer = playerO;
    showCurrentPlayer();
  }

  const rounds = () => { // decrement rounds
    lastCells--;
  }

  const howRounds = () => { // return updated value
    return lastCells;
  }

  restartBtn.onclick = restartGame;

  const checkWinner = () => {
    let array = gameBoard.gameBoardArray;
    for (const [a,b,c] of winCells) {
      if(array[a] === 'X' && array[b] === 'X' && array[c] === 'X'){
        console.log('x win')
        showWinner();
        winner = true;
      } else if (array[a] === 'O' && array[b] === 'O' && array[c] === 'O'){
        console.log('o win')
        winner = true;
        showWinner();
      }
    }
  }

  const gameOver = () => {
    return winner;
  }

  const showCurrentPlayer = () => {
    playerInfo.textContent = `${defaultPlayer.nick}'s move!`
  }

  const showWinner = () => {
    playerInfo.textContent = `${defaultPlayer.nick} win!`
  }

  const showTie = () => {
    playerInfo.textContent = `Tie!`
  }

  showCurrentPlayer(); // set default player move when game starts

  return {
    showTie,
    rounds,
    howRounds,
    gameOver,
    checkWinner,
    getPlayer,
    switchPlayerMarker
  };
})();
