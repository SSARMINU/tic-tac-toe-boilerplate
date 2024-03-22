
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];


let currentPlayer = 'X';


function checkWinner() {
    
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
            return true;
        }
    }
    
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
            return true;
        }
    }
    
    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return true;
    }
    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return true;
    }
    return false;
}


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


function makeMove(row, col) {
    
    if (board[row][col] === '' && !checkWinner() && !checkTie()) {
    
        board[row][col] = currentPlayer;
        document.getElementById(row * 3 + col + 1).innerText = currentPlayer;
        if (checkWinner()) {
            document.getElementById('message').innerText = 'Player ' + currentPlayer + ' wins!';
            document.getElementById('result').style.visibility = 'visible';
        } else if (checkTie()) {
            document.getElementById('message').innerText = 'It\'s a tie!';
            document.getElementById('result').style.visibility = 'visible';
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
    }
}


function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    
    for (let i = 1; i <= 9; i++) {
        document.getElementById(i).innerText = '';
    }
    currentPlayer = 'X';
    document.getElementById('result').style.visibility = 'hidden';
}


document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', function() {
        
        const id = parseInt(this.id);
        const row = Math.floor((id - 1) / 3);
        const col = (id - 1) % 3;
        
        makeMove(row, col);
    });
});


document.getElementById('button').addEventListener('click', resetGame);
