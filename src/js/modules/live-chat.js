/**
 * Initializes the live chat functionality.
 */
function initLiveChat() {
  const liveChat = document.getElementById('live-chat');
  if (!liveChat) {
    return;
  }

  const chatButton = document.getElementById('live-chat-button');
  const chatModal = document.getElementById('live-chat-modal');
  const openIcon = chatButton.querySelector('.live-chat__button-icon--open');
  const closeIcon = chatButton.querySelector('.live-chat__button-icon--close');

  if (!chatButton || !chatModal || !openIcon || !closeIcon) {
    console.error('Live chat elements not found.');
    return;
  }

  // Function to toggle the modal visibility
  const toggleModal = () => {
    const isExpanded = chatButton.getAttribute('aria-expanded') === 'true';
    chatButton.setAttribute('aria-expanded', !isExpanded);
    chatModal.hidden = isExpanded;
    chatModal.classList.toggle('live-chat__modal--active', !isExpanded);

    // Toggle icon visibility
    openIcon.hidden = !isExpanded;
    closeIcon.hidden = isExpanded;

    if (!isExpanded) {
      const firstFocusable = chatModal.querySelector('a[href], button');
      if (firstFocusable) {
        firstFocusable.focus();
      }
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

  // Initial setup: ensure modal and close icon are hidden correctly on load
  chatModal.hidden = true;
  closeIcon.hidden = true;
  openIcon.hidden = false;
  chatButton.setAttribute('aria-expanded', 'false');
  chatModal.classList.remove('live-chat__modal--active');
}


export default initLiveChat;

