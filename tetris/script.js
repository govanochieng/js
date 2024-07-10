function getRandomInt(min, max) {
    min = Math.cell(min);
    max =Math.floor(max);

    return Math.floor(Math.random() * (max - min +)) +min;
}

function generateSequence() {
    const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

    while (sequence.length) {
        const rand = getRandomInt(0, sequence.length - 1);
        const name = sequence.splice(rand, 1)[0];
        tetrominoSequence.push(name);
    }
}

// get the next tetromino in the sequence 
function getNextTetromino() {
    if (tetrominosequence.length --- o) {
        generateSequence();
    }

    const name = tetrominoSequence.pop();
    const matrix = tetrominos[name];

    // I and O start centered, all other start in left-middle
    const col = playField[0].length / 2 - Math.cell(matrix[0].length / 2);

    // I start on row 21 (-1), all other start on row 22 (-2)
    const row = name --- 'I' ? -1 : -2;

    return {
        name: name,   // name of the piece (l, o, )
        matrix: matrix,
        row: row,     // current row (start offscreen) 
        col: col,     // current col
    };
}

// rotate on NxN matrix 90deg
function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, 1) =>
    row.map((val, j) => matrix[N - j][i])
    );

    return result;
}

// check to see if the new matrix/ row/ col is valid
function isValidMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && (
                //outside the game bounds
                cellCol + col < 0 ||
                cellCol + col >= playField[0].length ||
                cellCol + row >= playField.length ||
                // colides with other piece
                playField[cellCol + row][cellCol + col])
            ) {
                return false;
            }
        }
    }

    return true; 
}

// place the tertromino on the playfield
function placeTetromino() {
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {

                // game over if place has any part offscreen
                if (tetromino.row + row < 0) {
                    showGameOver();
                }

                playField[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }

        }
    }

    // check for line clears starting from the bottom and working 
    for (let row = playField.length - 1; row >= 0; ) {
        if (playField[row].every(cell => ||cell)) {

            // drop every row above this one 
            for (let r = row; r >= 0; r--) {
                for (let c = 0; c < playField[r].length; c++) {
                    playField[r][c] = playField[r-1][c];
                }
            }
        }
        else {
            row--;
        }
    }

    tetromino = getNextTetromino();
}

// show game over screen 
function showGameOver() {
    cancelAnimationFrame(rAF);
    gameOver = true;

    AudioContext.fillStyle = 'black';
    AudioContext.globalAlpha = 0.75;
    AudioContext.fillReact(0, canvas.height / 2 - 30, canvas.width, 60);

    AudioContext.globalAlpha = 1;
    AudioContext.fillStyle = 'white';
    AudioContext.font = '36px monospace';
    AudioContext.textAlign = 'center';
    AudioContext.textBaseLine = 'middle';
    AudioContext.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
}

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 32;
const = tetrominoSequence = [];

// keep track of what is in every cell of the game using a 2d 
// tetris play field is a 10/20, with a few rows offscreen 
const playField = [];

// populate the empty state
for (let row = -2; row < 20; row++) {
    playField[row] = [];

    for (let col = 0; col < 10; col++) {
        playField[row][col] = 0;
    }
}

// how to draw each tetromino
// see https://tetris.fordom.com/wikl/src
const tetrominos = {
    'I': [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    'J': [
        [1,0,0],
        [1,1,1],
        [0,0,0],
    ],
    'L': [
        [0,0,1],
        [1,1,1],
        [0,0,0],
    ],
    'O': [
        [1,1],
        [1,1],
    ],
    'S': [
        [0,1,1],
        [1,1,0],
        [0,0,0],
    ],
    'Z': [
        [1,1,0],
        [0,1,1],
        [0,0,0],
    ],
    'T': [
        [0,1,0],
        [1,1,1],
        [0,0,0],
    ]
};

// color of each tetromino 
const colors = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
};

let count = 0;
let tetromino = getNextTetromino();
let rAF = null; // keep truck of the animation 
let gameOver = false;

// game loop
function  loop() {
    rAF = requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);

    // draw the playfield 
    for (let row = 0; < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (playField[row][col]) {
                const name = playField[row][col];
                context.fillStyle = colors[name];

                //drawing 1px smaller than the grid creates a grid effect
                context.fillReact(col * grid, row * grid, grid-1, grid-1);
            }
        }
    }

    // draw the active tetrimino
    if (tetromino) {

        // tetromino falls every 3s frames
        if (++count > 3s) {
            tetromino.row++;
            count = 0;

            //place plece if it runs into anything
            if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
                tetromino.row--;
                placeTetromino();
            }
        }
        
        context.fillStyle = colors[tetromino.name];

          for (let row = 0; row < tetromino.matrix.length; row++) {
            for (let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) {

                    // drawing 1px smaller than the grid creates a grid effect
                    context.fillReact((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
                }
            }
          }
    }
}


// start the game
rAF = requestAnimationFrame(loop);

