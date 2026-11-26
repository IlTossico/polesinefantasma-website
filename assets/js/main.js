(() => {
  const headings = document.querySelectorAll('.exploration-story h1:not(.sr-only)');
  if (!headings.length) return;
  const measure = () => headings.forEach((heading) => {
    const lines = [];
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    while (walker.nextNode()) {
      range.selectNodeContents(walker.currentNode);
      for (const rect of range.getClientRects()) {
        if (!rect.width || !rect.height) continue;
        const line = lines.find((item) => Math.min(item.bottom, rect.bottom) - Math.max(item.top, rect.top) > Math.min(item.height, rect.height) / 2);
        if (line) {
          line.left = Math.min(line.left, rect.left);
          line.right = Math.max(line.right, rect.right);
        } else lines.push({ top: rect.top, bottom: rect.bottom, height: rect.height, left: rect.left, right: rect.right });
      }
    }
    const width = Math.max(0, ...lines.map((line) => line.right - line.left));
    heading.style.setProperty('--heading-line-width', `${width}px`);
  });
  let frame;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(measure);
  };
  const observer = new ResizeObserver(schedule);
  headings.forEach((heading) => observer.observe(heading));
  measure();
  document.fonts.ready.then(schedule);
  window.addEventListener('resize', schedule);
})();

(() => {
  const button = document.querySelector('.back-to-top');
  const hero = document.querySelector('.hero');
  if (!button || !hero) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const observer = new IntersectionObserver(([entry]) => {
    const visible = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
    button.inert = !visible;
    button.classList.toggle('is-visible', visible);
  });
  observer.observe(hero);

  button.addEventListener('click', () => {
    hero.querySelector('.brand').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: motion.matches ? 'instant' : 'smooth' });
  });
})();

(() => {
  const root = document.documentElement;
  const heading = document.querySelector('[data-fit-title]');
  if (heading) {
    const mobile = window.matchMedia('(max-width: 767px)');
    const words = heading.querySelector('.title-ink').textContent.match(/\S+/g) || [];
    const fit = () => {
      heading.style.removeProperty('font-size');
      if (!mobile.matches || !words.length) return;
      const style = getComputedStyle(heading);
      const available = heading.clientWidth;
      if (!available) return;
      // Misura parole intere con il font reale, senza alterare l'animazione del titolo.
      const probe = document.createElement('span');
      probe.style.cssText = 'position:fixed;visibility:hidden;white-space:nowrap;pointer-events:none;';
      probe.style.font = style.font;
      probe.style.letterSpacing = style.letterSpacing;
      probe.setAttribute('aria-hidden', 'true');
      document.body.append(probe);
      const fits = (size) => {
        probe.style.fontSize = `${size}px`;
        return words.every((word) => {
          probe.textContent = word;
          return probe.getBoundingClientRect().width <= available;
        });
      };
      const original = parseFloat(style.fontSize);
      if (!fits(original)) {
        let low = 0;
        let high = original;
        while (high - low > .1) {
          const middle = (low + high) / 2;
          if (fits(middle)) low = middle;
          else high = middle;
        }
        heading.style.fontSize = `${low}px`;
      }
      probe.remove();
    };
    fit();
    document.fonts.ready.then(fit);
    window.addEventListener('resize', fit);
  }
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
