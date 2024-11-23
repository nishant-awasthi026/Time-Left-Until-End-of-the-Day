function updateTimer() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const timeDifference = endOfDay - now;

    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    document.getElementById('timer').textContent = `${hours} hr ${minutes} min ${seconds} sec`;
}

updateTimer();
setInterval(updateTimer, 1000);

const darkModeToggle = document.getElementById('darkModeToggle');
const toggleIcon = document.getElementById('toggleIcon');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popupText');
const popupOk = document.getElementById('popupOk');

function updatePopupText(isDarkMode) {
    popupText.textContent = isDarkMode 
        ? "Switch to light mode for a brighter experience!" 
        : "Try dark mode for a better night-time experience!";
}

// Load saved dark mode preference
const isDarkModeSaved = localStorage.getItem('darkMode') === 'true';
if (isDarkModeSaved) {
    document.body.classList.add('dark-mode');
    toggleIcon.src = '/public/icons/moon.svg';
    updatePopupText(true);
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    toggleIcon.src = isDarkMode
        ? '/public/icons/moon.svg'
        : '/public/icons/sun.svg';
    updatePopupText(isDarkMode);
    
    // Show popup when theme changes
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
});

// Initial popup display
setTimeout(() => {
    updatePopupText(isDarkModeSaved);
    popup.style.display = 'block';
}, 3000);

popupOk.addEventListener('click', () => {
    popup.style.display = 'none';
});
