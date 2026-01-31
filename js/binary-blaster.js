const scoreDisplay = document.querySelector('[data-score]');
const binaryDisplay = document.querySelector('[data-binary]');
const feedbackDisplay = document.querySelector('[data-feedback]');
const questionTimerDisplay = document.querySelector('[data-question-timer]');
const totalTimerDisplay = document.querySelector('[data-total-timer]');
const questionFill = document.querySelector('[data-question-fill]');
const decimalInput = document.getElementById('decimal-input');
const modeButtons = document.querySelectorAll('[data-mode-button]');
const modePanels = document.querySelectorAll('[data-mode]');
const fixedDigits = Array.from(document.querySelectorAll('[data-fixed-digit]'));
const fixedWarning = document.querySelector('[data-fixed-warning]');
const endScreen = document.querySelector('[data-end-screen]');
const finalScore = document.querySelector('[data-final-score]');
const playAgainButton = document.querySelector('[data-play-again]');
const isBinaryBlasterPage = Boolean(binaryDisplay);

const TOTAL_TIME = 60;
const QUESTION_TIME = 10;
const PLAYER_NAME_KEY = 'techLabPlayerName';

let score = 0;
let totalRemaining = TOTAL_TIME;
let questionRemaining = QUESTION_TIME;
let totalTimerId = null;
let questionTimerId = null;
let currentBinary = '';
let currentValue = 0;
let currentMode = 'standard';
let fixedIndex = 0;
let gameActive = false;

const updateScore = () => {
    if (scoreDisplay) {
        scoreDisplay.textContent = score.toString();
    }
};

const updateTimers = () => {
    if (questionTimerDisplay) {
        questionTimerDisplay.textContent = questionRemaining.toString();
    }
    if (totalTimerDisplay) {
        totalTimerDisplay.textContent = totalRemaining.toString();
    }
    if (questionFill) {
        const percent = (questionRemaining / QUESTION_TIME) * 100;
        questionFill.style.width = `${Math.max(0, percent)}%`;
    }
};

const setFeedback = (message, status) => {
    if (!feedbackDisplay) {
        return;
    }
    feedbackDisplay.textContent = message;
    feedbackDisplay.classList.remove('is-correct', 'is-wrong');
    if (status) {
        feedbackDisplay.classList.add(status === 'correct' ? 'is-correct' : 'is-wrong');
    }
};

const resetFixedStrip = () => {
    fixedIndex = 0;
    fixedDigits.forEach((digit) => {
        digit.textContent = '0';
        digit.classList.remove('is-filled');
    });
    if (fixedWarning) {
        fixedWarning.textContent = '';
    }
};

const generateBinary = () => {
    currentValue = Math.floor(Math.random() * 256);
    currentBinary = currentValue.toString(2).padStart(8, '0');
    if (binaryDisplay) {
        binaryDisplay.textContent = currentBinary;
    }
};

const resetQuestionTimer = () => {
    questionRemaining = QUESTION_TIME;
    updateTimers();
};

const stopTimers = () => {
    if (totalTimerId) {
        clearInterval(totalTimerId);
    }
    if (questionTimerId) {
        clearInterval(questionTimerId);
    }
    totalTimerId = null;
    questionTimerId = null;
};

const showEndScreen = () => {
    if (!endScreen) {
        return;
    }
    endScreen.classList.add('is-visible');
    endScreen.setAttribute('aria-hidden', 'false');
    if (finalScore) {
        finalScore.textContent = score.toString();
    }
};

const hideEndScreen = () => {
    if (!endScreen) {
        return;
    }
    endScreen.classList.remove('is-visible');
    endScreen.setAttribute('aria-hidden', 'true');
};

const endGame = () => {
    gameActive = false;
    stopTimers();
    showEndScreen();
};

const handleAnswer = (answerValue) => {
    if (!gameActive) {
        return;
    }
    if (answerValue === currentValue) {
        score += 1;
        setFeedback('Correct! ⚡', 'correct');
    } else {
        setFeedback(`Incorrect. The answer was ${currentValue}.`, 'wrong');
    }
    updateScore();
    generateBinary();
    resetQuestionTimer();
    if (decimalInput) {
        decimalInput.value = '';
    }
    resetFixedStrip();
};

const handleTimeout = () => {
    setFeedback(`Time's up! The answer was ${currentValue}.`, 'wrong');
    generateBinary();
    resetQuestionTimer();
    if (decimalInput) {
        decimalInput.value = '';
    }
    resetFixedStrip();
};

const startTimers = () => {
    stopTimers();
    totalTimerId = setInterval(() => {
        if (!gameActive) {
            return;
        }
        totalRemaining -= 1;
        if (totalRemaining <= 0) {
            totalRemaining = 0;
            updateTimers();
            endGame();
        } else {
            updateTimers();
        }
    }, 1000);

    questionTimerId = setInterval(() => {
        if (!gameActive) {
            return;
        }
        questionRemaining -= 1;
        if (questionRemaining <= 0) {
            questionRemaining = 0;
            updateTimers();
            handleTimeout();
        } else {
            updateTimers();
        }
    }, 1000);
};

const startGame = () => {
    score = 0;
    totalRemaining = TOTAL_TIME;
    questionRemaining = QUESTION_TIME;
    updateScore();
    updateTimers();
    generateBinary();
    resetFixedStrip();
    setFeedback('Convert the binary to decimal.', null);
    hideEndScreen();
    gameActive = true;
    startTimers();
    if (decimalInput) {
        decimalInput.focus();
    }
};

const submitStandardAnswer = () => {
    if (!decimalInput || !decimalInput.value) {
        setFeedback('Enter a number to submit.', 'wrong');
        return;
    }
    const answerValue = Number(decimalInput.value);
    if (Number.isNaN(answerValue)) {
        setFeedback('Numbers only!', 'wrong');
        return;
    }
    handleAnswer(answerValue);
};

const submitFixedAnswer = () => {
    const answerValue = Number(fixedDigits.map((digit) => digit.textContent).join(''));
    handleAnswer(answerValue);
};

const handleDecimalInput = (event) => {
    if (event.key === 'Enter') {
        submitStandardAnswer();
    }
};

const handleFixedInput = (event) => {
    if (currentMode !== 'fixed' || !gameActive) {
        return;
    }
    if (event.key === 'Enter') {
        submitFixedAnswer();
        return;
    }
    if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        return;
    }
    if (!/^\d$/.test(event.key)) {
        return;
    }
    if (fixedIndex >= fixedDigits.length) {
        if (fixedWarning) {
            fixedWarning.textContent = 'All digits filled.';
        }
        return;
    }
    fixedDigits[fixedIndex].textContent = event.key;
    fixedDigits[fixedIndex].classList.add('is-filled');
    fixedIndex += 1;
    if (fixedWarning) {
        fixedWarning.textContent = fixedIndex >= fixedDigits.length ? 'All digits filled.' : '';
    }
};

const setMode = (mode) => {
    currentMode = mode;
    modeButtons.forEach((button) => {
        const isActive = button.dataset.modeButton === mode;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', String(isActive));
    });
    modePanels.forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.mode === mode);
    });
    if (mode === 'standard' && decimalInput) {
        decimalInput.focus();
    }
};

if (isBinaryBlasterPage) {
    modeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            setMode(button.dataset.modeButton);
        });
    });

    if (decimalInput) {
        decimalInput.addEventListener('input', () => {
            decimalInput.value = decimalInput.value.replace(/[^\d]/g, '');
        });
        decimalInput.addEventListener('keydown', handleDecimalInput);
    }

    document.addEventListener('keydown', handleFixedInput);

    if (playAgainButton) {
        playAgainButton.addEventListener('click', () => {
            startGame();
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        setMode('standard');
        const storedName = localStorage.getItem(PLAYER_NAME_KEY);
        if (storedName) {
            startGame();
        } else {
            document.addEventListener(
                'player:ready',
                () => {
                    startGame();
                },
                { once: true }
            );
        }
    });
}
modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setMode(button.dataset.modeButton);
    });
});

if (decimalInput) {
    decimalInput.addEventListener('input', () => {
        decimalInput.value = decimalInput.value.replace(/[^\d]/g, '');
    });
    decimalInput.addEventListener('keydown', handleDecimalInput);
}

document.addEventListener('keydown', handleFixedInput);

if (playAgainButton) {
    playAgainButton.addEventListener('click', () => {
        startGame();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setMode('standard');
    const storedName = localStorage.getItem(PLAYER_NAME_KEY);
    if (storedName) {
        startGame();
    } else {
        document.addEventListener(
            'player:ready',
            () => {
                startGame();
            },
            { once: true }
        );
    }
});
