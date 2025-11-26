const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const statusDot = document.querySelector('.status-dot');
const statusText = document.querySelector('.status-text');
const newsletterForm = document.querySelector('.newsletter__form');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    cards.forEach((card) => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const hours = [
  { days: [1, 2, 3, 4], open: [9, 0], close: [19, 0] },
  { days: [5, 6], open: [9, 0], close: [20, 30] },
  { days: [0], open: [10, 0], close: [18, 0] },
];

function checkOpenStatus() {
  if (!statusDot || !statusText) return;

  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  const todaySchedule = hours.find((slot) => slot.days.includes(day));
  if (!todaySchedule) {
    statusDot.style.background = '#f25c54';
    statusText.textContent = 'Closed today';
    return;
  }

  const openMinutes = todaySchedule.open[0] * 60 + todaySchedule.open[1];
  const closeMinutes = todaySchedule.close[0] * 60 + todaySchedule.close[1];
  const isOpen = minutes >= openMinutes && minutes < closeMinutes;

  statusDot.style.background = isOpen ? 'var(--mint)' : '#f25c54';
  statusText.textContent = isOpen ? 'Open now' : 'Closed right now';
}

checkOpenStatus();

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(newsletterForm);
    const contact = formData.get('contact');
    if (!contact) return;

    newsletterForm.reset();
    const button = newsletterForm.querySelector('button');
    if (button) {
      const original = button.textContent;
      button.textContent = 'You’re on the list!';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
      }, 2400);
    }
  });
}
