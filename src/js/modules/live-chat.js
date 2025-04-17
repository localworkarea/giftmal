/**
 * Initializes the live chat functionality.
 */
function initLiveChat() {
  const liveChat = document.getElementById('live-chat');
  if (!liveChat) return;

  const chatButton = document.getElementById('live-chat-button');
  const chatModal = document.getElementById('live-chat-modal');
  const openIcon = chatButton?.querySelector('.live-chat__button-icon--open');
  const closeIcon = chatButton?.querySelector('.live-chat__button-icon--close');

  if (!chatButton || !chatModal || !openIcon || !closeIcon) {
    console.error('Live chat elements not found.');
    return;
  }

  chatModal.hidden = true;
  chatModal.classList.remove('live-chat__modal--active');
  chatButton.setAttribute('aria-expanded', 'false');

  const toggleModal = () => {
    const isExpanded = chatButton.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;

    chatButton.setAttribute('aria-expanded', newState);
    chatModal.hidden = isExpanded;
    chatModal.classList.toggle('live-chat__modal--active', newState);

    if (newState) {
      const firstFocusable = chatModal.querySelector('a[href], button');
      firstFocusable?.focus();
    }
  };

  chatButton.addEventListener('click', toggleModal);

  document.addEventListener('click', (event) => {
    if (!liveChat.contains(event.target) && chatButton.getAttribute('aria-expanded') === 'true') {
      toggleModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && chatButton.getAttribute('aria-expanded') === 'true') {
      toggleModal();
    }
  });
}

export default initLiveChat;

