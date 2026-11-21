(() => {
  const root = document.documentElement;
  if (root.dataset.typewriter !== 'pending') return;

  const title = document.querySelector('.hero .title-ink');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!title?.textContent.trim()) {
    delete root.dataset.typewriter;
    return;
  }

  const text = title.textContent;
  let timer;
  const finish = () => {
    clearTimeout(timer);
    delete root.dataset.typewriter;
    title.textContent = text;
    motion.removeEventListener('change', onMotionChange);
  };
  const onMotionChange = () => { if (motion.matches) finish(); };
  motion.addEventListener('change', onMotionChange);
  if (motion.matches) {
    finish();
    return;
  }

  const letters = Array.from(text, (letter) => {
    const span = document.createElement('span');
    span.textContent = letter;
    return span;
  });
  title.replaceChildren(...letters);
  let index = 0;
  const type = () => {
    if (root.dataset.typewriter !== 'pending') return;
    letters[index].classList.add('is-typed');
    index += 1;
    if (index === letters.length) {
      finish();
      return;
    }
    // Battute secche e piccole esitazioni, soprattutto tra le due parole.
    const pause = letters[index - 1].textContent === ' ' || index === 3 || index === 12;
    timer = setTimeout(type, pause ? 300 : 100 + Math.random() * 54);
  };
  const start = () => {
    if (root.dataset.typewriter === 'pending') timer = setTimeout(type, 450);
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();

(() => {
  const navigation = document.querySelector('#navigation');
  const mobile = window.matchMedia('(max-width: 1199px)');

  document.addEventListener('click', (event) => {
    if (mobile.matches && !navigation.contains(event.target)) navigation.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (mobile.matches && navigation.open) {
      navigation.open = false;
      navigation.querySelector('summary').focus();
    }
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
  if (emailButton && navigator.clipboard?.writeText) {
    const status = emailButton.parentElement.querySelector('.copy-status');
    const tooltip = document.querySelector('#email-tooltip');
    const email = emailButton.getAttribute('href').slice('mailto:'.length);
    let statusTimeout;
    emailButton.setAttribute('role', 'button');
    emailButton.setAttribute('aria-label', `Copia ${email} negli appunti`);
    emailButton.setAttribute('aria-describedby', tooltip.id);
    tooltip.hidden = false;
    emailButton.addEventListener('focus', () => { tooltip.hidden = false; });
    emailButton.parentElement.addEventListener('pointerleave', () => { tooltip.hidden = false; });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') tooltip.hidden = true;
    });
    emailButton.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        event.preventDefault();
        emailButton.click();
      }
    });
    emailButton.addEventListener('click', async (event) => {
      event.preventDefault();
      tooltip.hidden = true;
      clearTimeout(statusTimeout);
      status.textContent = '';
      try {
        await navigator.clipboard.writeText(email);
        status.textContent = 'Copiato!';
      } catch {
        status.textContent = 'Copia non riuscita';
      }
      statusTimeout = setTimeout(() => { status.textContent = ''; }, 2000);
    });
  }
})();
