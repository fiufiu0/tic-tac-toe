console.log("hello JS");

const gameBoard = (() => {
  console.log("gameboard");
  let gameBoardArray = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

  const showBoard = () => {
    const gameHtml = document.querySelector("#gameBoard");

    gameBoardArray.forEach((item, index) => {
        const gameCell = document.createElement("div");
        gameCell.classList.add("gameCell")
        gameCell.textContent = item;
        gameHtml.appendChild(gameCell)
    })
}
  
  return {
    showBoard
  }
})();

gameBoard.showBoard();


const playerFactory = (nick, marker) => {
    const whatMarker = () => console.log("marker", marker);
    return {nick, marker, whatMarker}
}


const gameController = (() => {
    console.log("gameController")
})



const playerO = playerFactory('playerO', 'O');
const playerX = playerFactory('playerX', 'X');

playerO.whatMarker();
playerX.whatMarker();
