const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');

const themeStorageKey = 'altajweed-theme';
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem(themeStorageKey);

function preferredTheme() {
  return localStorage.getItem(themeStorageKey) || (systemTheme.matches ? 'dark' : 'light');
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  const dark = theme === 'dark';
  toggle.setAttribute('aria-label', dark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن');
  toggle.setAttribute('title', dark ? 'الوضع الفاتح' : 'الوضع الداكن');
  toggle.setAttribute('aria-pressed', String(dark));
  toggle.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
  toggle.querySelector('.theme-label').textContent = dark ? 'فاتح' : 'داكن';
}

const themeToggle = document.createElement('button');
themeToggle.type = 'button';
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<span class="theme-icon" aria-hidden="true"></span><span class="theme-label"></span>';
document.body.append(themeToggle);
applyTheme(savedTheme || preferredTheme());

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(themeStorageKey, nextTheme);
  applyTheme(nextTheme);
});

systemTheme.addEventListener('change', () => {
  if (!localStorage.getItem(themeStorageKey)) applyTheme(preferredTheme());
});
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navigation.classList.toggle('open', !open);
});
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
