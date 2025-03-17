// Функції для роботи з cookies
function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Функції для роботи з localStorage
function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getLocalStorage(key) {
    return localStorage.getItem(key);
}

// Базова функція для обробки сповіщень
function handleNotification({
    notificationSelector, 
    buttonSelector, 
    storageKey,
    onHide = function() {},
    additionalElements = {},
    useCookies = false
}) {
    const notification = document.querySelector(notificationSelector);
    const closeButton = notification?.querySelector(buttonSelector);
    
    if (!notification || !closeButton) return;
    
    const isClosed = useCookies 
        ? getCookie(storageKey) === 'true'
        : getLocalStorage(storageKey) === 'true';
    
    if (isClosed) {
        notification.style.display = 'none';
        onHide();
        return;
    }
    
    function hideNotification() {
        notification.style.opacity = '0';
        
        setTimeout(function() {
            notification.style.display = 'none';
            onHide();

            if (useCookies) {
                setCookie(storageKey, 'true');
            } else {
                setLocalStorage(storageKey, 'true');
            }
        }, 300);
    }
    
    closeButton.addEventListener('click', hideNotification);
}

// Ініціалізація сповіщення про cookie
export function initCookieNotification() {
    handleNotification({
        notificationSelector: '.cookie-notification',
        buttonSelector: '.cookie-notification__button',
        storageKey: 'cookiesAccepted',
        useCookies: true 
    });
}

// Ініціалізація промо-сповіщення
export function initPromoNotification() {
    const promoContainer = document.querySelector('.corporate-promo__container');
    
    handleNotification({
        notificationSelector: '.notification',
        buttonSelector: '.notification__close',
        storageKey: 'notificationClosed',
        onHide: function() {
            if (promoContainer) {
                promoContainer.style.paddingTop = 0;
            }
        }
    });
}

// Експортуємо функцію ініціалізації всіх сповіщень
export function initAllNotifications() {
    initCookieNotification();
    initPromoNotification();
} 