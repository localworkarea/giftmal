/**
 * Notifications module for handling various site notifications
 * Including the mobile app advertisement
 */

// Functions for working with cookies
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

// Functions for working with localStorage
function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getLocalStorage(key) {
    return localStorage.getItem(key);
}

// Base function for handling notifications
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

// Initialization of cookie notification
export function initCookieNotification() {
    handleNotification({
        notificationSelector: '.cookie-notification',
        buttonSelector: '.cookie-notification__button',
        storageKey: 'cookiesAccepted',
        useCookies: true 
    });
}

// Initialization of promo notification
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

// Local storage key to check if ad was shown/closed
const APP_AD_SHOWN_KEY = 'giftmall_app_ad_shown';

/**
 * Initialize the mobile app advertisement
 * Shows the advertisement only once per user
 */
function initMobileAppAd() {
    if (localStorage.getItem(APP_AD_SHOWN_KEY) === 'true') {
        return;
    }
    
    const adNotification = document.getElementById('appAdNotification');
    const adCloseButton = document.getElementById('appAdClose');
    const adButton = document.getElementById('appAdButton');
    
    if (!adNotification || !adCloseButton) {
        return;
    }
    
    // Show the ad with a slight delay for better UX
    setTimeout(() => {
        adNotification.classList.add('active');
    }, 500);
    
    adCloseButton.addEventListener('click', () => {
        closeAppAd();
    });
    
    if (adButton) {
        adButton.addEventListener('click', () => {
            window.location.href = '#app-download'; // Replace with actual app store link
            closeAppAd();
        });
    }
    
    window.addEventListener('beforeunload', () => {
        localStorage.setItem(APP_AD_SHOWN_KEY, 'true');
    });
}

/**
 * Close the app advertisement 
 */
function closeAppAd() {
    const adNotification = document.getElementById('appAdNotification');
    
    if (adNotification) {
        adNotification.classList.remove('active');
        localStorage.setItem(APP_AD_SHOWN_KEY, 'true');
    }
}

/**
 * Initialize all notification systems
 */
export function initAllNotifications() {
    initCookieNotification();
    initPromoNotification();
    initMobileAppAd();
}

export default {
    initAllNotifications,
    initCookieNotification,
    initPromoNotification,
    initMobileAppAd,
    closeAppAd
}; 