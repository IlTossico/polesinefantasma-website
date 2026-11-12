(() => {
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

  const emailLink = document.querySelector('[data-copy-email]');
  const email = emailLink.dataset.copyEmail;
  const emailButton = document.createElement('button');
  emailButton.type = 'button';
  emailButton.className = emailLink.className;
  emailButton.setAttribute('aria-label', `Copia l’indirizzo email ${email}`);
  emailButton.append(...emailLink.childNodes);
  emailLink.replaceWith(emailButton);
  const status = document.querySelector('.copy-status');
  let statusTimeout;
  let copying = false;

  const copyWithFallback = () => {
    const field = document.createElement('textarea');
    field.value = email;
    field.readOnly = true;
    field.className = 'sr-only';
    field.setAttribute('aria-label', 'Indirizzo email da copiare');
    document.body.append(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand('copy'); }
    finally {
      field.remove();
      emailButton.focus({ preventScroll: true });
    }
    return copied;
  };

  emailButton.addEventListener('click', async () => {
    if (copying) return;
    copying = true;
    clearTimeout(statusTimeout);
    status.textContent = '';
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(email);
          copied = true;
        } catch { copied = copyWithFallback(); }
      } else { copied = copyWithFallback(); }
    } catch { copied = false; }
    copying = false;
    status.textContent = copied ? 'Copiato!' : `Copia manualmente: ${email}`;
    if (copied) statusTimeout = setTimeout(() => { status.textContent = ''; }, 2000);
  });
})();
