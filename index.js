import readlineSync from 'readline-sync';

let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

let currentPlayer = 'X';

const printBoard = () => {
    for (let i = 0; i < 3; i++) {
        console.log(board[i].join(' | '));
        if (i < 2) console.log('---------');
    }
}

const checkWinner = () => {
    // Проверка рядов
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') {
            return board[i][0];
        }
    }

    // Проверка колонок
    for (let j = 0; j < 3; j++) {
        if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== ' ') {
            return board[0][j];
        }
    }

    // Проверка диагоналей 
    if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ')) {
        return board[1][1];
    }

    // Проверка на ничью
    if (!board.flat().includes(' ')) {
        return 'draw';
    }

    return null;
}

const nextMove = () => {
    printBoard();
    const row = readlineSync.questionInt(`Player ${currentPlayer}, enter row (1-3): `) - 1;
    const col = readlineSync.questionInt(`Player ${currentPlayer}, enter column (1-3): `) - 1;

    if (board[row][col] === ' ') {
        board[row][col] = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            if (winner === 'draw') {
                console.log("It's a draw!");
            } else {
                console.log(`Player ${winner} wins!`);
            }
            process.exit();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            nextMove();
        }
    } else {
        console.log('This cell is already occupied!');
        nextMove();
    }
}

nextMove();
