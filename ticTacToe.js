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
            return 0// Exit this function if invalid move
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

    const playRound = (row, col) => {
        console.log(`${getActivePlayer().name} moved to column ${col},
        row ${row}.`);
        let valid = board.makeMove(row, col, getActivePlayer().value);

        /* Check if game is over */
        
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
        getActivePlayer
    };
}

const game = GameController();