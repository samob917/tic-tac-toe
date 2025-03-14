/* 
Thoughts:
Create a gameboard object that has 9 squares
have a Game factory which starts a game. It creates a game board
*/

function Gameboard() {
    let gameboard = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
    let gameOver = false;
    let winner = '';
    let safeMove = true;

    function makeMove(player, row, col) {
        if (gameboard[row][col] === 0) {
            gameboard[row][col] = player.marker;
            console.log(gameboard);
            safeMove = true;
        } else {
            console.log("Already Occupied!");
            safeMove = false;
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
        checkArray(player, diag1);
        checkArray(player, diag2);
    }

    function checkBoard(players) {
        for (const player of players) {
            checkColumns(player);
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
        gameOver: () => gameOver,
        safeMove: () => safeMove,
    }
}

function createUser(name, marker) {
    return {name, marker};
}

const Game = (function () {
    const gameboard = new Gameboard()
    const p1Name = prompt("Player 1 Name: ");
    const p1Symbol = prompt("Player 1 Symbol: ");
    const p2Name = prompt("Player 2 Name: ");
    const p2Symbol = prompt("Player 2 Symbol: ");
    let player1 = createUser(p1Name, p1Symbol);
    let player2 = createUser(p2Name, p2Symbol);
    let players = [player1, player2];
    let turn = 0

    function takeTurn(turn, player) {
        console.log(`${player.name}, your move`)
        let moveString = prompt(`${player.name}, Row, Column`);
        let moveArr = moveString.split(",")
        gameboard.makeMove(player, Number(moveArr[0]), Number(moveArr[1]));
        gameboard.checkBoard(players);
        return gameboard.safeMove()
    }

    while (!gameboard.gameOver()) {
        if (turn===0) {
            let safe = takeTurn(turn, player1);
            while (!safe) {
                alert("Invalid Move! Try again.")
                safe = takeTurn(turn, player1)
            }
            turn++;
        } else {
            let safe = takeTurn(turn, player2);
            while (!safe) {
                alert("Invalid Move! Try again.")
                safe = takeTurn(turn, player2)
            }
            turn = 0;
        }
    }
    const winner = gameboard.checkBoard(players);
    console.log(`Congratulations, ${winner}`);
})()

