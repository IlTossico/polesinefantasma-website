(() => {
  const archive = document.querySelector('#archivio');
  const sidebar = document.querySelector('.archive-sidebar');
  const options = [...sidebar.querySelectorAll('[data-filter]')];
  const cards = [...archive.querySelectorAll('.post-preview')].map(node => ({
    node,
    luogo: node.dataset.luogo,
    periodo: node.dataset.periodo,
    tags: JSON.parse(node.dataset.tags) || []
  }));
  const keys = ['luogo', 'periodo', 'tag'];
  const matches = (card, key, value) => {
    if (key === 'tag') return card.tags.includes(value);
    if (key === 'periodo') return card.periodo.startsWith(value);
    return card.luogo === value;
  };

  function render() {
    const url = new URL(location.href);
    const active = new Map();
    for (const key of keys) {
      const value = url.searchParams.get(key);
      const valid = options.some(link => link.dataset.filter === key && link.dataset.value === value);
      if (valid) active.set(key, value);
      url.searchParams.delete(key);
      if (valid) url.searchParams.set(key, value);
    }
    // Normalizza i valori non validi e i duplicati dei filtri nella voce corrente.
    if (url.href !== location.href) history.replaceState(null, '', url);
    const fits = (card, except) => [...active].every(([key, value]) => key === except || matches(card, key, value));
    let count = 0;
    for (const card of cards) {
      card.node.hidden = !fits(card);
      if (!card.node.hidden) count++;
    }
    document.querySelector('#archive-results').textContent = count === 1 ? '1 articolo' : count + ' articoli';
    document.querySelector('#archive-empty').hidden = count > 0;
    for (const link of options) {
      const {filter, value} = link.dataset;
      const selected = active.get(filter) === value;
      const total = cards.filter(card => fits(card, filter) && matches(card, filter, value)).length;
      const next = new URL(url);
      if (selected) next.searchParams.delete(filter);
      else next.searchParams.set(filter, value);
      link.href = next.href;
      link.hidden = total === 0 && !selected;
      link.querySelector('span').textContent = total;
      if (selected) {
        link.setAttribute('aria-current', 'true');
        link.setAttribute('aria-label', 'Rimuovi filtro ' + value);
      } else {
        link.removeAttribute('aria-current');
        link.removeAttribute('aria-label');
      }
      const year = link.closest('details');
      if (year && value.length === 4) {
        const containsSelection = active.get(filter)?.startsWith(value);
        year.hidden = total === 0 && !containsSelection;
        year.querySelector('summary span').textContent = total;
        if (containsSelection) year.open = true;
      }
    }
    for (const link of document.querySelectorAll('[data-reset]')) {
      const reset = new URL(url);
      keys.forEach(key => reset.searchParams.delete(key));
      link.href = reset.href;
    }
  }

  document.querySelector('.exploration').addEventListener('click', event => {
    const link = event.target.closest('[data-filter], [data-reset]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    history.pushState(null, '', link.href);
    render();
  });
  window.addEventListener('popstate', render);
  render();
})();
