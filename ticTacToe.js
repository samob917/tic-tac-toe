/* 
Following the *Building a House from Inside Out* Guide, the way this will
work is I will create a Gameboard object that maintains the state of the 
gameboard, the way to make a move, and a way to display the board.
Each cell of the board will be held in a Cell object which has two 
mehtods, essentially a getter and setter method, one is set Cell value
the other is get Cell value. 

I will then have a game controller object that plays the game, i.e. says
who's turn it is and makes a move and checks if the game is over.

After this is complete, I will add a screen controller object that allows
interaction from the DOM.
*/

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i=0; i<rows; i++) {
        board[i] = [];
        for (let j=0; j<columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const makeMove = (row, col, value) => {
        if (board[row][col].getValue() === 0) {
            board[row][col].setValue(value);
            return 1
        } else {
            return 0 // If invalid move, return 0
        }
    }

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithValues);
    }

    return {
        getBoard,
        makeMove,
        printBoard
    }
}

function Cell() {
    let value = 0;

    const setValue = (symbol) => {
        value = symbol;
    }

    const getValue = () => value;

    return {
        setValue,
        getValue
    };
}

function GameController(
    playerOneName= "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();
    let tie = false;

    const players = [
        {
            name: playerOneName,
            value: "X"
        },
        {
            name:playerTwoName,
            value: "O"
        }
    ];

    let activePlayer = players[0];

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s Turn.`)
    }

    /* 
    To check if the game is over, check if any rows all have the same symbol,
    then check columns, then the two diagonals, then check if any valid moves are left.
    If no valid moves, declare tie, otherwise declare winner
    */
    const checkGameOver = () => {
        const boardToCheck = board.getBoard().map((row) => row.map((cell) => cell.getValue()));
        const checkValue = getActivePlayer().value;
        // Rows
        for (let i = 0; i < boardToCheck.length; i++) {
            if (boardToCheck[i].every( (col) => col === checkValue)) {
                return true
            }
        }
        // Columns
        for (let j = 0; j < boardToCheck.length; j++) {
            let colArr = [boardToCheck[0][j], boardToCheck[1][j], boardToCheck[2][j]];
            if (colArr.every( (row) => row === checkValue)) {
                return true
            }
        }
        // Diags
        let diagArr1 = [boardToCheck[0][0], boardToCheck[1][1], boardToCheck[2][2]];
        let diagArr2 = [boardToCheck[0][2], boardToCheck[1][1], boardToCheck[0][2]];
        if (diagArr1.every( (elem) => elem === checkValue)) {
            return true
        }
        if (diagArr2.every( (elem) => elem === checkValue)) {
            return true
        }
        // Any Valid Moves?
        function containsZero(arr) {
            return arr.includes(0)
        }
        if (boardToCheck.filter(containsZero).length === 0) {
            tie = true;
            return true
        }
    }

    const playRound = (row, col) => {
        console.log(`${getActivePlayer().name} moved to column ${col},
        row ${row}.`);
        let valid = board.makeMove(row, col, getActivePlayer().value);

        /* Check if game is over */
        if(checkGameOver()) {
            if (tie) {
                console.log("Tie!");
                return 
            } else {
                console.log((`${getActivePlayer().name} Wins!`));
                return
            }
        }

        // if move is invalid dont switch active player have board.makeMove return validity
        if (valid === 1) {
            switchActivePlayer();
        } else {
            console.log("Invalid move. Try again.")
        }
        printNewRound();
    }

    printNewRound(); // Initialize Game

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}


function screenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        for (let i = 0; i<board.length; i++) {
            for (let j=0; j<board[i].length; j++) {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = i;
                cellButton.dataset.col = j;
                cellButton.textContent = board[i][j].getValue()
                boardDiv.appendChild(cellButton);
            }
        }
    }
    function handleClick(e) {
        const selectedRow = e.target.dataset.row;
        const selectedCol = e.target.dataset.col;
        if (!selectedRow) return;

        game.playRound(selectedRow, selectedCol);
        updateScreen();
    }
    boardDiv.addEventListener("click", handleClick);

    updateScreen();
}

screenController();