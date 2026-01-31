const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const dropdownTrigger = document.querySelector('.dropdown-trigger');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isExpanded));
        navLinks.classList.toggle('open', !isExpanded);
    });
}

if (dropdownTrigger) {
    dropdownTrigger.addEventListener('click', () => {
        const isExpanded = dropdownTrigger.getAttribute('aria-expanded') === 'true';
        dropdownTrigger.setAttribute('aria-expanded', String(!isExpanded));
        dropdownTrigger.parentElement?.classList.toggle('open', !isExpanded);
    });
}

const adminUnlock = document.querySelector('[data-admin-unlock]');
const adminPanels = document.querySelectorAll('[data-admin-panel]');

if (adminUnlock && adminPanels.length) {
    adminUnlock.addEventListener('click', () => {
        adminPanels.forEach((panel) => {
            panel.classList.remove('locked');
            panel.classList.add('unlocked');
        });
        adminUnlock.textContent = 'Unlocked';
    });
}

const gameData = {
    cs: {
        title: 'Computer Science Games',
        description: 'Logic, algorithms, and coding challenges designed for CS students.',
        games: [
            {
                id: 'cs-wordle',
                name: 'CS Wordle',
                description: 'Guess CS vocabulary words using a Wordle-style grid.',
                instructions: 'Guess the word in six tries using the color hints.',
                skills: ['Vocabulary', 'Problem solving'],
                href: 'game-cs-wordle.html',
            },
            {
                id: 'binary-blaster',
                name: 'Binary Blaster',
                description: 'Convert binary numbers to decimal before time runs out.',
                instructions: 'Translate the binary number and hit submit to score points.',
                skills: ['Binary', 'Number systems'],
            },
            {
                id: 'algorithm-shuffle',
                name: 'Algorithm Shuffle',
                description: 'Put algorithm steps in the correct order.',
                instructions: 'Drag each step into the correct sequence.',
                skills: ['Algorithms', 'Logic'],
            },
            {
                id: 'data-structures-dash',
                name: 'Data Structures Dash',
                description: 'Match problems with the best data structure to solve them.',
                instructions: 'Choose the correct structure before the timer ends.',
                skills: ['Data structures', 'Critical thinking'],
            },
            {
                id: 'logic-gate-lab',
                name: 'Logic Gate Lab',
                description: 'Build simple circuits by combining logic gates.',
                instructions: 'Select gates that create the required output.',
                skills: ['Boolean logic', 'Circuits'],
            },
            {
                id: 'debugging-sprint',
                name: 'Debugging Sprint',
                description: 'Find and fix the bug in short code snippets.',
                instructions: 'Spot the issue and choose the best fix.',
                skills: ['Debugging', 'Syntax'],
            },
        ],
    },
    it: {
        title: 'Information Technology Games',
        description: 'Networking, hardware, and IT fundamentals with fast practice loops.',
        games: [
            {
                id: 'port-match',
                name: 'Port Match',
                description: 'Match common services with their default ports.',
                instructions: 'Select the correct port for each service to earn points.',
                skills: ['Networking', 'Ports'],
            },
            {
                id: 'top-ten-tech',
                name: 'Top Ten Tech Quiz',
                description: 'Quick quiz on popular devices, tools, and IT concepts.',
                instructions: 'Answer each prompt before the timer runs out.',
                skills: ['IT basics', 'Hardware'],
            },
            {
                id: 'network-cable-match',
                name: 'Network Cable Match',
                description: 'Identify the right cable for each networking task.',
                instructions: 'Match cables to the correct devices or scenarios.',
                skills: ['Networking', 'Hardware'],
            },
            {
                id: 'device-detective',
                name: 'Device Detective',
                description: 'Identify hardware components from hints and diagrams.',
                instructions: 'Choose the hardware part that matches each clue.',
                skills: ['Hardware', 'Systems'],
            },
            {
                id: 'cloud-quest',
                name: 'Cloud Quest',
                description: 'Sort tasks into SaaS, PaaS, or IaaS categories.',
                instructions: 'Assign each task to the correct cloud model.',
                skills: ['Cloud computing', 'IT services'],
            },
            {
                id: 'helpdesk-hero',
                name: 'Helpdesk Hero',
                description: 'Pick the best troubleshooting step for a user issue.',
                instructions: 'Select the most helpful support response.',
                skills: ['Support', 'Troubleshooting'],
            },
        ],
    },
    cyber: {
        title: 'Cybersecurity Games',
        description: 'Security awareness games for spotting threats and safe practices.',
        games: [
            {
                id: 'phishing-or-legit',
                name: 'Phishing or Legit?',
                description: 'Decide whether a message is safe or suspicious.',
                instructions: 'Read each message and choose the safest option.',
                skills: ['Phishing awareness', 'Email safety'],
            },
            {
                id: 'password-strength',
                name: 'Password Strength Tester',
                description: 'Build a strong password and watch the meter rise.',
                instructions: 'Add characters until the meter turns green.',
                skills: ['Password hygiene', 'Security'],
            },
            {
                id: 'secure-or-not',
                name: 'Secure vs Not Secure (URLs)',
                description: 'Identify secure and unsafe links at a glance.',
                instructions: 'Sort each URL into the correct security bucket.',
                skills: ['Web safety', 'Threat detection'],
            },
            {
                id: 'firewall-forge',
                name: 'Firewall Forge',
                description: 'Choose the rule that blocks risky traffic.',
                instructions: 'Pick the firewall rule that best protects the network.',
                skills: ['Network defense', 'Policies'],
            },
            {
                id: 'malware-maze',
                name: 'Malware Maze',
                description: 'Identify suspicious behaviors from device logs.',
                instructions: 'Flag any actions that look like malware.',
                skills: ['Threat detection', 'Log reading'],
            },
            {
                id: 'safe-share',
                name: 'Safe Share',
                description: 'Decide how to safely share files and data.',
                instructions: 'Choose the most secure sharing option.',
                skills: ['Data protection', 'Privacy'],
            },
        ],
    },
};

const gamesGrid = document.querySelector('#games-grid');
if (gamesGrid) {
    const categoryTitle = document.querySelector('#category-title');
    const categoryLabel = document.querySelector('#category-label');
    const categoryDescription = document.querySelector('#category-description');

    const renderGames = () => {
        const hash = window.location.hash.replace('#', '') || 'cs';
        const category = gameData[hash] ?? gameData.cs;

        if (categoryTitle) {
            categoryTitle.textContent = category.title;
        }
        if (categoryLabel) {
            categoryLabel.textContent = hash.toUpperCase();
        }
        if (categoryDescription) {
            categoryDescription.textContent = category.description;
        }

        gamesGrid.innerHTML = category.games
            .map(
                (game) => `
                <article class="game-tile">
                    <h3><a class="game-link" href="${game.href ?? `game.html?game=${game.id}`}">${game.name}</a></h3>
                    <p>${game.description}</p>
                    <a class="button ghost" href="${game.href ?? `game.html?game=${game.id}`}">Play</a>
                </article>
            `
            )
            .join('');
    };

    window.addEventListener('hashchange', renderGames);
    renderGames();
}

const gameTitle = document.querySelector('#game-title');
if (gameTitle) {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('game');
    const categoryKeys = Object.keys(gameData);
    let selectedGame = null;
    let selectedCategory = 'cs';

    categoryKeys.forEach((key) => {
        const found = gameData[key].games.find((game) => game.id === gameId);
        if (found) {
            selectedGame = found;
            selectedCategory = key;
        }
    });

    const fallback = {
        name: 'Game Coming Soon',
        description: 'This game is still being built. Check back soon!',
        instructions: 'Return to the games list and choose another activity.',
        skills: ['Exploration'],
    };

    const gameInfo = selectedGame ?? fallback;
    const categoryInfo = gameData[selectedCategory] ?? gameData.cs;

    gameTitle.textContent = gameInfo.name;
    const description = document.querySelector('#game-description');
    if (description) {
        description.textContent = gameInfo.description;
    }

    const categoryChip = document.querySelector('#game-category');
    if (categoryChip) {
        categoryChip.textContent = categoryInfo.title;
    }

    const instructions = document.querySelector('#game-instructions');
    if (instructions) {
        instructions.textContent = gameInfo.instructions;
    }

    const skillsList = document.querySelector('#game-skills');
    if (skillsList) {
        skillsList.innerHTML = gameInfo.skills.map((skill) => `<li>${skill}</li>`).join('');
    }

    const backLink = document.querySelector('#back-link');
    if (backLink) {
        backLink.setAttribute('href', `games.html#${selectedCategory}`);
    }
}
