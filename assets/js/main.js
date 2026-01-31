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
const adminPanel = document.querySelector('[data-admin-panel]');

if (adminUnlock && adminPanel) {
    adminUnlock.addEventListener('click', () => {
        adminPanel.classList.add('is-unlocked');
        adminUnlock.textContent = 'Unlocked';
    });
}
