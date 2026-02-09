function createPlayer(name, logo) {
    return {name, logo}
}

const Gameboard = (function(position, tile){

    const gamearray = ["","","","","","","","",""]

    const edit = () => gamearray[position] = tile
    const getBoard = () => gamearray
    const checkWin = () => {

    }

    return {edit, getBoard, checkWin}
})()