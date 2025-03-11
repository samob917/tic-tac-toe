/* 
Thoughts:
Create a gameboard object that has 9 squares
have a Game factory which starts a game. It creates a game board
*/

function Gameboard() {
    let gameboard = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
    function makeMove(player, row, col) {
        if (gameboard[row][col] === 0) {
            gameboard[row][col] = player.marker;
            console.log(gameboard);
        } else {
            console.log("Already Occupied!");
        }
    }
    return {
        makeMove
    }
}

function User(name, marker) {
    this.name = name;
    this.marker = marker;
}

let player1 = new User("p1", "X")
let player2 = new User("p2", "O")
let game = new Gameboard();

game.makeMove(player1, 0, 0);