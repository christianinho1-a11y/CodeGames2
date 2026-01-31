const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const rootElement = document.documentElement;

const storedTheme = localStorage.getItem('techlab-theme');
if (storedTheme) {
    rootElement.setAttribute('data-theme', storedTheme);
}

const updateIcon = (theme) => {
    if (!themeIcon) {
        return;
    }
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
};

updateIcon(rootElement.getAttribute('data-theme'));

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = rootElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        rootElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('techlab-theme', nextTheme);
        updateIcon(nextTheme);
    });
}
