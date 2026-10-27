const copyButton = document.getElementById('copy-email');
const toast = document.getElementById('toast');
const toastText = document.getElementById('toast-text');
let toastTimeout;

function showToast(message) {
  clearTimeout(toastTimeout);
  toastText.textContent = message;
  toast.classList.remove('visible');
  void toast.offsetWidth;
  toast.classList.add('visible');
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2800);
}

copyButton.addEventListener('click', async () => {
  const email = 'polesinefantasma@gmail.com';
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
    } else {
      const field = document.createElement('textarea');
      field.value = email;
      field.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.appendChild(field);
      field.select();
      let copied;
      try { copied = document.execCommand('copy'); }
      finally { field.remove(); copyButton.focus(); }
      if (!copied) throw new Error('Copy unavailable');
    }
    showToast('copiato!');
  } catch {
    showToast('Copia non riuscita');
    window.prompt('Copia questo indirizzo email:', email);
  }
});
