const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const CS_WORDS = [
    'ARRAY',
    'STACK',
    'QUEUE',
    'INPUT',
    'BYTES',
    'LOGIC',
    'DEBUG',
    'WHILE',
    'LOOPS',
    'CLASS',
    'FLOAT',
    'PRINT',
    'CACHE',
    'SHIFT',
    'MERGE',
    'FRAME',
    'TOKEN',
    'INDEX',
    'NODES',
    'ROUTE',
    'PIXEL',
    'QUERY',
    'RANGE',
    'SHELL',
    'FORKS',
    'PIPES',
    'HEAPS',
    'TREES',
    'GRAPH',
    'LOGIN',
    'RESET',
    'RETRY',
    'ABORT',
    'START',
    'BEGIN',
    'ORDER',
    'GROUP',
    'LIMIT',
    'VALUE',
    'WIDTH',
    'DEPTH',
    'ROUND',
    'PATCH',
    'FETCH',
    'STORE',
    'WRITE',
    'READS',
    'LEVEL',
    'ALERT',
    'AGENT',
    'ALIGN',
    'ASCII',
    'BATCH',
    'BOUND',
    'CHAIN',
    'CLICK',
    'CLOSE',
    'COUNT',
    'CRYPT',
    'DELTA',
    'DIGIT',
    'DRIVE',
    'EMAIL',
    'FILES',
    'FLOPS',
    'GATES',
    'GHOST',
    'HYPER',
    'ICONS',
    'MEDIA',
    'MOUSE',
    'PORTS',
    'TRACE',
    'TYPES',
    'VIRUS',
    'MODEL',
    'LOGON',
    'MODAL',
    'ROBOT',
    'STATE',
    'CLOUD',
    'PROXY',
    'RECUR',
    'SCOPE',
    'MACRO',
    'HACKS',
    'DATUM',
    'CODES',
    'CHUNK',
    'VECTR',
    'SERVO',
    'BOARD',
    'NIBBL',
    'GLYFS',
    'PROMT',
    'ARRAY2',
    'MUXER',
    'LINKS',
    'LOOPS',
    'INPUT',
    'LOGIC',
    'BYTES',
    'CLASS',
    'WHILE',
    'PRINT',
    'FLOAT',
    'CACHE',
    'ROUTE',
    'DEBUG',
    'MERGE',
    'SHIFT',
    'FRAME',
    'TOKEN',
    'NODES',
    'INDEX',
];

const KEY_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

let secretWord = '';
let currentGuess = '';
let currentRow = 0;
let gameOver = false;

const chooseSecretWord = () => {
    const index = Math.floor(Math.random() * CS_WORDS.length);
    secretWord = CS_WORDS[index];
};

const createBoard = () => {
    const board = document.getElementById('board');
    if (!board) {
        return;
    }
    board.innerHTML = '';

    for (let row = 0; row < MAX_GUESSES; row += 1) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('wordle-row');

        for (let col = 0; col < WORD_LENGTH; col += 1) {
            const tile = document.createElement('div');
            tile.classList.add('wordle-tile');
            tile.setAttribute('data-row', row.toString());
            tile.setAttribute('data-col', col.toString());
            rowDiv.appendChild(tile);
        }

        board.appendChild(rowDiv);
    }
};

const createKeyboard = () => {
    const keyboard = document.getElementById('keyboard');
    if (!keyboard) {
        return;
    }
    keyboard.innerHTML = '';

    KEY_ROWS.forEach((row) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('key-row');

        row.forEach((key) => {
            const keyBtn = document.createElement('button');
            keyBtn.type = 'button';
            keyBtn.textContent = key;
            keyBtn.classList.add('key');
            keyBtn.setAttribute('data-key', key);
            rowDiv.appendChild(keyBtn);
        });

        keyboard.appendChild(rowDiv);
    });
};

const addLetter = (letter) => {
    if (currentGuess.length >= WORD_LENGTH) {
        return;
    }
    currentGuess += letter;
    const tile = document.querySelector(
        `.wordle-tile[data-row="${currentRow}"][data-col="${currentGuess.length - 1}"]`
    );
    if (tile) {
        tile.textContent = letter;
    }
};

const deleteLetter = () => {
    if (currentGuess.length === 0) {
        return;
    }
    const col = currentGuess.length - 1;
    currentGuess = currentGuess.slice(0, -1);
    const tile = document.querySelector(`.wordle-tile[data-row="${currentRow}"][data-col="${col}"]`);
    if (tile) {
        tile.textContent = '';
    }
};

const scoreGuess = (guess, answer) => {
    const result = Array(WORD_LENGTH).fill('absent');
    const answerLetters = answer.split('');

    for (let i = 0; i < WORD_LENGTH; i += 1) {
        if (guess[i] === answer[i]) {
            result[i] = 'correct';
            answerLetters[i] = null;
        }
    }

    for (let i = 0; i < WORD_LENGTH; i += 1) {
        if (result[i] === 'correct') {
            continue;
        }
        const index = answerLetters.indexOf(guess[i]);
        if (index !== -1) {
            result[i] = 'present';
            answerLetters[index] = null;
        }
    }

    return result;
};

const updateKeyboardKey = (letter, status) => {
    const keyBtn = document.querySelector(`.key[data-key="${letter}"]`);
    if (!keyBtn) {
        return;
    }

    if (status === 'correct') {
        keyBtn.classList.remove('present', 'absent');
        keyBtn.classList.add('correct');
    } else if (status === 'present' && !keyBtn.classList.contains('correct')) {
        keyBtn.classList.remove('absent');
        keyBtn.classList.add('present');
    } else if (!keyBtn.classList.contains('correct') && !keyBtn.classList.contains('present')) {
        keyBtn.classList.add('absent');
    }
};

const revealResult = (result) => {
    for (let i = 0; i < WORD_LENGTH; i += 1) {
        const tile = document.querySelector(`.wordle-tile[data-row="${currentRow}"][data-col="${i}"]`);
        if (tile) {
            tile.classList.add(result[i]);
        }
        updateKeyboardKey(currentGuess[i], result[i]);
    }

    const isWin = result.every((status) => status === 'correct');
    if (isWin) {
        showMessage('Nice! You got it! 🎉');
        gameOver = true;
        return;
    }

    if (currentRow === MAX_GUESSES - 1) {
        showMessage(`Out of tries! The word was ${secretWord}.`);
        gameOver = true;
        return;
    }

    currentRow += 1;
    currentGuess = '';
};

const submitGuess = () => {
    if (currentGuess.length !== WORD_LENGTH) {
        showMessage('Enter a 5-letter guess.');
        showMessage('Not enough letters');
        return;
    }

    const guessUpper = currentGuess.toUpperCase();
    if (!CS_WORDS.includes(guessUpper)) {
        showMessage('Not in CS word list');
        return;
    }

    const result = scoreGuess(guessUpper, secretWord);
    revealResult(result);
};

const handlePhysicalKey = (event) => {
    if (gameOver) {
        return;
    }
    const key = event.key.toUpperCase();

    if (key === 'ENTER') {
        submitGuess();
    } else if (key === 'BACKSPACE') {
        deleteLetter();
    } else if (/^[A-Z]$/.test(key)) {
        addLetter(key);
    }
};

const handleOnscreenKey = (event) => {
    if (gameOver) {
        return;
    }

    const target = event.target.closest('.key');
    if (!target) {
        return;
    }

    const key = target.getAttribute('data-key');
    if (key === 'ENTER') {
        submitGuess();
    } else if (key === '⌫') {
        deleteLetter();
    } else {
        addLetter(key);
    }
};

const setupInput = () => {
    document.addEventListener('keydown', handlePhysicalKey);
    const keyboard = document.getElementById('keyboard');
    if (keyboard) {
        keyboard.addEventListener('click', handleOnscreenKey);
    }
};

const showMessage = (text) => {
    const msg = document.getElementById('message');
    if (!msg) {
        return;
    }
    msg.textContent = text;
    msg.classList.add('show');

    setTimeout(() => {
        msg.classList.remove('show');
    }, 2000);
};

const resetGame = () => {
    currentGuess = '';
    currentRow = 0;
    gameOver = false;
    chooseSecretWord();
    createBoard();
    createKeyboard();
};

const setupNewWordButton = () => {
    const button = document.getElementById('new-word');
    if (!button) {
        return;
    }
    button.addEventListener('click', () => {
        resetGame();
    });
};

document.addEventListener('DOMContentLoaded', () => {
    chooseSecretWord();
    createBoard();
    createKeyboard();
    setupNewWordButton();
    const storedName = localStorage.getItem('techLabPlayerName');
    if (storedName) {
        setupInput();
    } else {
        document.addEventListener(
            'player:ready',
            () => {
                setupInput();
            },
            { once: true }
        );
    }
});
