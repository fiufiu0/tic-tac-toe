console.log("hello");

const gameBoard = (() => {
  console.log("gameboard");
  let gameBoardArray = [];
})();


const playerFactory = (nick, marker) => {
    const whatMarker = () => console.log("marker", marker);
    return {nick, marker, whatMarker}
}

const playerO = playerFactory('playerO', 'O');
const playerX = playerFactory('playerX', 'X');

playerO.whatMarker();
playerX.whatMarker();
