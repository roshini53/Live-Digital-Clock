let is24Hour = true;

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  let ampm = '';

  if (!is24Hour) {
    ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
  }

  const hourStr = String(hours).padStart(2, '0');
  const timeString = `${hourStr}:${minutes}:${seconds}${ampm}`;

  const timeElem = document.getElementById('time');
  timeElem.style.opacity = 0;
  setTimeout(() => {
    timeElem.textContent = timeString;
    timeElem.style.opacity = 1;
  }, 100);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  const year = now.getFullYear();

  const dateString = `${day}, ${month} ${date}, ${year}`;
  document.getElementById('date').textContent = dateString;
}

function toggleFormat() {
  is24Hour = !is24Hour;
  document.getElementById('toggleFormat').textContent =
    is24Hour ? 'Switch to 12-hour' : 'Switch to 24-hour';
  updateClock();
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

function init() {
  // Set saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }

  // Button event listeners
  document.getElementById('toggleFormat').addEventListener('click', toggleFormat);
  document.getElementById('toggleTheme').addEventListener('click', toggleTheme);

  // Start clock
  updateClock();
  setInterval(updateClock, 1000);
}

document.addEventListener('DOMContentLoaded', init);
