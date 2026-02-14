let player1
let player2
let currPlayer

function createPlayer(name, logo) {
    return {name, logo}
}

const Gameboard = (function(position, tile){

    const gamearray = ["","","","","","","","",""]

    const edit = (position, tile) => gamearray[position] = tile
    const getBoard = () => gamearray
    const checkWin = () => {
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];

        return winPatterns.some(pattern =>
            pattern.every(index =>
                gamearray[index] !== "" &&
                gamearray[index] === gamearray[pattern[0]]
            )
        );
    };

    return {edit, getBoard, checkWin}
})()

const startForm = document.getElementById("start-form");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

startForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name1 = document.getElementById("player1").value;
    const name2 = document.getElementById("player2").value;

    player1 = createPlayer(name1, "X");
    player2 = createPlayer(name2, "O");
    currPlayer = player1

    startScreen.classList.remove("active");
    gameScreen.classList.add("active")
});