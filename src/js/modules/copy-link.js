// copy-link.js
export default function initCopyLinks(root = document) {
  const buttons = Array.from(root.querySelectorAll('.copy-link'));
  if (!buttons.length) return { destroy() {} };

  const messages = {
    uk: { copied: 'Посилання скопійовано', failed: 'Не вдалося скопіювати' },
    ru: { copied: 'Ссылка скопирована', failed: 'Не удалось скопировать' },
    en: { copied: 'Link copied', failed: 'Failed to copy' },
  };

  const getLang = () => {
    const raw = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
    const short = raw.split('-')[0];
    return messages[short] ? short : 'en';
  };

  const textForCopy = (btn) => {
    // Если когда-то нужно копировать не текущий URL:
    // <button class="copy-link" data-copy="https://...">
    const fromAttr = btn.getAttribute('data-copy');
    if (fromAttr) return fromAttr;
    return window.location.href;
  };

  const writeClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    // Fallback для старых браузеров / небезопасного контекста
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    if (!ok) throw new Error('execCommand copy failed');
  };

  const showToast = (btn, text) => {
    // Один тултип на кнопку
    let toast = btn.parentElement?.querySelector('.copy-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'copy-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.setAttribute('aria-atomic', 'true');

      // Чтобы позиционирование было предсказуемым:
      // li.share-post__item { position: relative; }
      (btn.parentElement || btn).appendChild(toast);
    }

    toast.textContent = text;
    toast.classList.add('is-visible');

    // Сброс таймера
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 1800);
  };

  const handlers = new Map();

  buttons.forEach((btn) => {
    const onClick = async (e) => {
      e.preventDefault();

      const lang = getLang();
      const msg = messages[lang] || messages.en;

      try {
        await writeClipboard(textForCopy(btn));
        showToast(btn, msg.copied);
      } catch (err) {
        showToast(btn, msg.failed);
        // console.warn(err);
      }
    };

    btn.addEventListener('click', onClick);
    handlers.set(btn, onClick);
  });

  return {
    destroy() {
      handlers.forEach((fn, btn) => btn.removeEventListener('click', fn));
      handlers.clear();
    },
  };
}

