function createPlayer(name) {
    return {name}
}

const Gameboard = (function(position, tile){

    const gamearray = ["","","","","","","","",""]

    const edit = (position, tile) => gamearray[position] = tile
    const getBoard = () => gamearray

    return {edit, getBoard}
})()

function checkWin (gamearray) {

}