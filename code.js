let player1
let player2
let currPlayer
let gameover = false

function createPlayer(name, logo) {
    return {name, logo}
}

function swapPlayer(){
    if (currPlayer == player1){
        currPlayer = player2
    } else{
        currPlayer = player1
    }
}

function gameWon(){
    const gameOptions = document.createElement("div")
    gameOptions.setAttribute("id", "game-options")
    const endRound = document.getElementById("end-round")
    const gameEnd = document.createElement("h2")
    const score = document.getElementById("score")
    endRound.appendChild(gameOptions)
    gameover = true

    gameEnd.textContent = `Congrats!! ${currPlayer.name} Won`
    endRound.prepend(gameEnd)

    const nextRound = document.createElement("button")
    nextRound.textContent = "New Round?"
    nextRound.addEventListener("click", function(){
        tiles.forEach(tile => {
            tile.innerHTML = "";
        });

        endRound.innerHTML = ""
        gameover = false

        Gameboard.resetBoard()
    })

    const reset = document.createElement("button")
    reset.textContent = "Reset Game?"
    reset.addEventListener("click", function(){
        startScreen.classList.add("active")
        gameScreen.classList.remove("active")

        tiles.forEach(tile => {
            tile.innerHTML = "";
        });

        score.innerHTML = ""
        endRound.innerHTML = ""
        gameover = false

        Gameboard.resetBoard()
    })

    gameOptions.appendChild(nextRound)
    gameOptions.appendChild(reset)


}

function gameDraw(){
    const gameOptions = document.createElement("div")
    gameOptions.setAttribute("id", "game-options")
    const endRound = document.getElementById("end-round")
    const gameEnd = document.createElement("h2")
    const score = document.getElementById("score")
    endRound.appendChild(gameOptions)
    gameover = true

    gameEnd.textContent = `Game Tied`
    endRound.prepend(gameEnd)

    const nextRound = document.createElement("button")
    nextRound.textContent = "New Round?"
    nextRound.addEventListener("click", function(){
        tiles.forEach(tile => {
            tile.innerHTML = "";
        });

        endRound.innerHTML = ""
        gameover = false

        Gameboard.resetBoard()
    })

    const reset = document.createElement("button")
    reset.textContent = "Reset Game?"
    reset.addEventListener("click", function(){
        startScreen.classList.add("active")
        gameScreen.classList.remove("active")

        tiles.forEach(tile => {
            tile.innerHTML = "";
        });

        score.innerHTML = ""
        endRound.innerHTML = ""
        gameover = false

        Gameboard.resetBoard()
    })

    gameOptions.appendChild(nextRound)
    gameOptions.appendChild(reset)
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
        ]

        return winPatterns.some(pattern =>
            pattern.every(index =>
                gamearray[index] !== "" &&
                gamearray[index] === gamearray[pattern[0]]
            )
        )
    }
    const checkDraw = () => {
        return gamearray.every(cell => cell !== "")
    }
    const resetBoard = () => {
    gamearray.fill("")
    }

    return {edit, getBoard, checkWin, checkDraw, resetBoard}
})()

const startForm = document.getElementById("start-form");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const tiles = document.querySelectorAll(".tile");

startForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name1 = document.getElementById("player1").value;
    const name2 = document.getElementById("player2").value;

    player1 = createPlayer(name1, "X");
    player2 = createPlayer(name2, "O");
    currPlayer = player1

    startScreen.classList.remove("active")
    gameScreen.classList.add("active")

    const score = document.getElementById("score")
    const playerscore = document.createElement("h1")
    playerscore.textContent = `${player1.name} vs ${player2.name}`
    const turn = document.createElement("h2")
    turn.id = "turn"
    turn.textContent = `${currPlayer.name}'s turn`
    score.appendChild(playerscore)
    score.appendChild(turn)
});

tiles.forEach(tile => {
    tile.addEventListener("click", function(e) {
        e.preventDefault()

        if (Gameboard.getBoard()[e.target.dataset.index] !== "") return;
        if (gameover) return

        if (currPlayer == player1){
            const cross = document.createElement("img")
            cross.src = "Images/close-thick.svg"
            cross.width = 120
            cross.style.backgroundColor = "white"
            tile.appendChild(cross)
        } else if (currPlayer == player2){
            const circle = document.createElement("img")
            circle.src = "Images/circle-outline.svg"
            circle.width = 120
            circle.style.backgroundColor = "white"
            circle.style.border = "black"
            tile.appendChild(circle)
        }

        Gameboard.edit(e.target.dataset.index, currPlayer.logo)
        console.log(Gameboard.getBoard())

        if (Gameboard.checkWin()){
            console.log("win")
            gameWon()
            return
        }

        if (Gameboard.checkDraw()){
            console.log("draw")
            gameDraw()
            return
        }

        swapPlayer()
        const turn = document.getElementById("turn")
        turn.textContent = `${currPlayer.name}'s turn`

    });
});

window.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  startScreen.classList.add("active");
});

