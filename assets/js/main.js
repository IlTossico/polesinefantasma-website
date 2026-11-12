(() => {
  const themeToggle = document.querySelector('#theme-toggle');
  const syncTheme = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Attiva modalità chiara' : 'Attiva modalità scura');
  };
  syncTheme();
  themeToggle.hidden = false;
  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    syncTheme();
    try { localStorage.setItem('polesine-theme', theme); } catch {}
  });

  const search = document.querySelector('#search');
  const searchToggle = search.querySelector('.search-toggle');
  const searchPanel = search.querySelector('.search-panel');
  const searchInput = search.querySelector('input');
  const navigation = document.querySelector('#navigation');
  const mobile = window.matchMedia('(max-width: 1199px)');

  const closeSearch = (restoreFocus = false) => {
    search.classList.remove('is-open');
    searchPanel.inert = true;
    searchToggle.setAttribute('aria-expanded', 'false');
    searchToggle.setAttribute('aria-label', 'Apri ricerca');
    if (restoreFocus) searchToggle.focus();
  };

  search.hidden = false;
  searchToggle.addEventListener('click', () => {
    if (search.classList.contains('is-open')) {
      closeSearch(true);
      return;
    }
    if (mobile.matches) navigation.open = false;
    searchPanel.inert = false;
    search.classList.add('is-open');
    searchToggle.setAttribute('aria-expanded', 'true');
    searchToggle.setAttribute('aria-label', 'Chiudi ricerca');
    searchInput.focus({ preventScroll: true });
  });
  search.addEventListener('focusout', (event) => {
    if (!search.contains(event.relatedTarget)) closeSearch();
  });
  document.addEventListener('click', (event) => {
    if (!search.contains(event.target)) closeSearch();
    if (mobile.matches && !navigation.contains(event.target)) navigation.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (search.classList.contains('is-open')) closeSearch(true);
    if (mobile.matches && navigation.open) {
      navigation.open = false;
      navigation.querySelector('summary').focus();
    }
  });
  navigation.addEventListener('toggle', () => {
    if (mobile.matches && navigation.open) closeSearch();
  });
  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobile.matches) navigation.open = false;
    });
  });
  // Allinea lo stato nativo di details alla versione desktop, anche dopo un resize.
  const syncNavigation = () => { navigation.open = !mobile.matches; };
  syncNavigation();
  mobile.addEventListener('change', syncNavigation);
  const emailButton = document.querySelector('#email-feedback');
  const status = document.querySelector('.copy-status');
  let statusTimeout;
  emailButton.addEventListener('click', () => {
    clearTimeout(statusTimeout);
    status.textContent = 'Copiato!';
    statusTimeout = setTimeout(() => { status.textContent = ''; }, 2000);
  });
})();
