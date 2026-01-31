const PLAYER_NAME_KEY = 'techLabPlayerName';

const playerModal = document.querySelector('[data-player-modal]');
const playerForm = document.querySelector('[data-player-form]');
const playerInput = document.querySelector('[data-player-input]');
const playerError = document.querySelector('[data-player-error]');
const leaderboardEntry = document.querySelector('[data-player-entry]');
const leaderboardList = document.querySelector('[data-leaderboard-list]');
const playButton = document.querySelector('[data-game-play]');
const leaderboardToggle = document.querySelector('[data-leaderboard-toggle]');
const leaderboardPanel = document.querySelector('[data-leaderboard-panel]');

const setModalVisible = (isVisible) => {
    if (!playerModal) {
        return;
    }
    playerModal.classList.toggle('is-visible', isVisible);
    document.body.classList.toggle('modal-open', isVisible);
    if (isVisible && playerInput) {
        playerInput.focus();
    }
};

const updateLeaderboard = (playerName) => {
    if (leaderboardEntry) {
        leaderboardEntry.hidden = false;
        leaderboardEntry.textContent = `${playerName} — Ready to play`;
        return;
    }
    if (leaderboardList) {
        const listItem = document.createElement('li');
        listItem.textContent = `${playerName} — Ready to play`;
        leaderboardList.prepend(listItem);
    }
};

const handlePlayerReady = (playerName) => {
    updateLeaderboard(playerName);
    document.body.dataset.playerName = playerName;
    document.dispatchEvent(
        new CustomEvent('player:ready', {
            detail: { name: playerName },
        })
    );
};

const existingName = localStorage.getItem(PLAYER_NAME_KEY);
if (existingName) {
    handlePlayerReady(existingName);
    setModalVisible(false);
} else {
    setModalVisible(true);
}

if (playerForm) {
    playerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!playerInput) {
            return;
        }
        const trimmedName = playerInput.value.trim();
        if (!trimmedName) {
            if (playerError) {
                playerError.textContent = 'Please enter your name to continue.';
            }
            playerInput.focus();
            return;
        }
        if (playerError) {
            playerError.textContent = '';
        }
        localStorage.setItem(PLAYER_NAME_KEY, trimmedName);
        setModalVisible(false);
        handlePlayerReady(trimmedName);
    });
}

if (playButton) {
    playButton.addEventListener('click', () => {
        const storedName = localStorage.getItem(PLAYER_NAME_KEY);
        if (!storedName) {
            setModalVisible(true);
        }
    });
}

if (leaderboardToggle && leaderboardPanel) {
    leaderboardToggle.addEventListener('click', () => {
        const isHidden = leaderboardPanel.classList.toggle('is-hidden');
        leaderboardToggle.setAttribute('aria-expanded', String(!isHidden));
        leaderboardToggle.textContent = isHidden ? 'View Leaderboard' : 'Hide Leaderboard';
    });
}
