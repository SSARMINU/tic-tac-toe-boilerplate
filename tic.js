// Initialize the game board
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Variable to keep track of current player (X starts)
let currentPlayer = 'X';

// Function to check if there's a winner
function checkWinner() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
            return true;
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
            return true;
        }
    }
    // Check diagonals
    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return true;
    }
    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return true;
    }
    return false;
}

// Function to check if the board is full (tie)
function checkTie() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

// Function to handle a player's move
function makeMove(row, col) {
    // Check if the cell is empty and the game is still ongoing
    if (board[row][col] === '' && !checkWinner() && !checkTie()) {
        // Place the current player's mark on the board
        board[row][col] = currentPlayer;
        // Update the HTML display
        document.getElementById(row * 3 + col + 1).innerText = currentPlayer;
        // Check if the current player has won
        if (checkWinner()) {
            document.getElementById('message').innerText = 'Player ' + currentPlayer + ' wins!';
            document.getElementById('result').style.visibility = 'visible';
        } else if (checkTie()) {
            document.getElementById('message').innerText = 'It\'s a tie!';
            document.getElementById('result').style.visibility = 'visible';
        } else {
            // Switch to the other player
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
    }
}

// Function to reset the game
function resetGame() {
    // Clear the board
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    // Clear the HTML display
    for (let i = 1; i <= 9; i++) {
        document.getElementById(i).innerText = '';
    }
    // Reset game state
    currentPlayer = 'X';
    document.getElementById('result').style.visibility = 'hidden';
}

// Add event listeners to each box
document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', function() {
        // Get row and column indices of the clicked box
        const id = parseInt(this.id);
        const row = Math.floor((id - 1) / 3);
        const col = (id - 1) % 3;
        // Make a move
        makeMove(row, col);
    });
});

// Add event listener to play again button
document.getElementById('button').addEventListener('click', resetGame);
