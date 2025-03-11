/* 
Thoughts:
Create a gameboard object that has 9 squares
have a Game factory which starts a game. It creates a game board
*/

function Gameboard() {
    let gameboard = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
    let gameOver = false;
    let winner = '';

    function makeMove(player, row, col) {
        if (gameboard[row][col] === 0) {
            gameboard[row][col] = player.marker;
            console.log(gameboard);
        } else {
            console.log("Already Occupied!");
        }
    }

    function checkArray(player, arr) {
        if (arr.every(b => b === player.marker)) {
            console.log(`${player.name} wins!`);
            gameOver = true;
            winner = player.name;
        }
    }
    function checkRows(player) {
        for (let i = 0; i<3; i++) {
            let arr = gameboard[i];
            checkArray(player, arr);
        }
    }   

    function checkColumns(player) {
        for (let i = 0; i < 3; i++) {
            let arr = [gameboard[0][i], gameboard[1][i], gameboard[2][i]];
            checkArray(player, arr)
        }
    }

    function checkDiagonals(player) {
        let diag1 = [gameboard[0][0], gameboard[1][1], gameboard[2][2]];
        let diag2 = [gameboard[0][2], gameboard[1][1], gameboard[2][0]];
        checkArray(diag1);
        checkArray(diag2)
    }

    function checkBoard(players) {
        for (player in players) {
            checkColumns(player);
            console.log()
            checkRows(player);
            checkDiagonals(player);
            if (gameOver) {
                return winner
            }
        }
    }
    return {
        makeMove,
        checkBoard,
        gameOver
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
console.log(game.gameboard);