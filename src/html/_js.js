// === International Telephone Input ========================== 
/* 
  *International Telephone Input v25.3.0
 *https://github.com/jackocnr/intl-tel-input.git
*/

const intlTelInp = document.querySelector("#intlTelInp");
if (intlTelInp) {
  const siteLang = document.documentElement.lang.slice(0, 2); // Определяем язык сайта
  let i18nData;

  switch (siteLang) {
    case 'ru':
      i18nData = ru;
      break;
    case 'uk':
      i18nData = uk;
      break;
    default:
      i18nData = null; // Английский будет по умолчанию
  }

  window.intlTelInput(intlTelInp, {
    initialCountry: 'auto',
    geoIpLookup: callback => {
      fetch("https://ipapi.co/json")
        .then(res => res.json())
        .then(data => callback(data.country_code))
        .catch(() => callback("us"));
    },
    strictMode: true,
    separateDialCode: true,
    nationalMode: true,
    formatOnDisplay: true,
    i18n: i18nData,
  });
}




// https://air-datepicker.com/ru/docs
// mobile date picker: https://www.cssscript.com/mobile-ios-date-picker-rolldate/
const currentLang = document.documentElement.lang || 'en';
const datepickerSelector = '[data-datepicker]';
let dp = null;
let rd = null;

function toggleDatepicker(e) {
  if (e.matches) {
    // Если активен AirDatepicker, уничтожаем его
    if (dp) {
      dp.destroy();
      dp = null;
    }
    // Включаем Rolldate, если он еще не активен
    if (!rd && document.querySelector(datepickerSelector)) {
      rd = new Rolldate({
        el: datepickerSelector,
        format: 'YYYY-MM-DD',
        beginYear: 1920,
        endYear: 2050,
        minStep: 1,
        lang: { title: 'Select date' },
        trigger: 'tap',
        init: function () {
          console.log('Rolldate started');
        },
        moveEnd: function (scroll) {
          console.log('Rolldate scroll ended');
        },
        confirm: function (date) {
          console.log('Rolldate confirmed:', date);
        },
        cancel: function () {
          console.log('Rolldate canceled');
        }
      });
    }
  } else {
    // Если активен Rolldate, отключаем его
    if (rd) {
      rd.destroy(); // У Rolldate нет метода destroy(), можно просто обнулить
      rd = null;
    }
    // Включаем AirDatepicker, если он еще не активен
    if (!dp && document.querySelector(datepickerSelector)) {
      dp = new AirDatepicker(datepickerSelector, {
        dateFormat: 'dd.MM.yyyy',
        minDate: '01.01.1900',
        autoClose: true,
        locale: locales[currentLang] || locales.en
      });
    }
  }
}

const mediaQuery = window.matchMedia('(max-width: 30.061em)');
mediaQuery.addEventListener('change', toggleDatepicker);
toggleDatepicker(mediaQuery);





const spollerPopup = document.querySelectorAll("[data-spollers-popup]");
spollerPopup.forEach(popup => {
  const ordersHead = popup.querySelector('.orders-checkout__head');
  const ordersBody = popup.querySelector('.orders-checkout__body');
  let startY = 0;
  let currentY = 0;
  let isDragging = false;

    // Обработчик начала касания
  ordersHead.addEventListener("touchstart", (e) => {
      startY = e.touches[0].clientY;
      currentY = startY;
      isDragging = true;

  });

  
});