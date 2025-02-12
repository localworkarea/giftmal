// Підключення функціоналу "Чертоги Фрілансера"
// import { tr } from "intl-tel-input/i18n";
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


// import AirDatepicker from 'air-datepicker';
// import 'air-datepicker/air-datepicker.css';
// import localeEn from 'air-datepicker/locale/en';
// import localeRu from 'air-datepicker/locale/ru';
// import localeUk from 'air-datepicker/locale/uk';


document.addEventListener("DOMContentLoaded", () => {

  // ITEM-DROPDOWN ===================================================
  const itemDropdowns = document.querySelectorAll(".item-dropdwn");
  const itemButtons = document.querySelectorAll(".item-dropdwn__btn");

  itemDropdowns.forEach(dropdown => {
    const items = dropdown.querySelectorAll(".item-dropdwn__item");
    if (items.length === 0) {
        dropdown.classList.add("_no-el");
    }
  });

  itemButtons.forEach(button => {
      button.addEventListener("click", (event) => {
          const dropdown = event.currentTarget.closest(".item-dropdwn");
          
          if (dropdown.classList.contains("_no-el")) {
            return;
          }
        
          dropdown.classList.toggle("_active");
      });
  });

  // Закрытие при клике вне dropdown
  document.addEventListener("click", (event) => {
    itemDropdowns.forEach(dropdown => {
          if (!dropdown.contains(event.target) && dropdown.classList.contains("_active")) {
              dropdown.classList.remove("_active");
          }
      });
  });
  // ==============================================


  // TABS ================================================================
  const stepButtons = document.querySelectorAll(".steps-checkout__btn");
  const tabs = document.querySelectorAll(".checkout__tab");

  stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      stepButtons.forEach(btn => btn.classList.remove("step-active"));
      button.classList.add("step-active");

      tabs.forEach(tab => tab.classList.remove("tab-active"));
      tabs[index].classList.add("tab-active");
    });
  });
  // ===============================================
  
  // == update height elements ================
  function updateOrderCheckoutElHeights() {
    const mainCart = document.querySelector('.orders-checkout__cart_main');
    if (mainCart) {
        const spoller = mainCart.querySelector('.orders-checkout__spoller');
        if (spoller) {
            const head = spoller.querySelector('.orders-checkout__head');
            const total = mainCart.querySelector('.orders-checkout__total');
            const wrapper = spoller.querySelector('.orders-checkout__wrapper');
            const body = spoller.querySelector('.orders-checkout__body');

            if (head && total && wrapper && body) {
                const viewportHeight = window.innerHeight;
                const cartHeight = mainCart.offsetHeight;
                const headHeight = head.offsetHeight;
                const totalHeight = total.offsetHeight;

                spoller.style.setProperty('--height', `${totalHeight}px`);

                if (cartHeight > (viewportHeight - 260)) {
                    const newHeight = viewportHeight - 260 - headHeight - totalHeight;
                    body.style.height = `${newHeight}px`;
                    wrapper.classList.add('_more-content');
                } else {
                    body.style.height = ''; 
                    wrapper.classList.remove('_more-content');
                }
            }
        }
    }
}

updateOrderCheckoutElHeights();


  // function updateOrderCheckoutElHeights() {
  //   const cart = document.querySelector('.orders-checkout__cart_main');
  //   if (cart) {
  //     const cartSpoller = document.querySelector('.orders-checkout__spoller');
  //     const head = document.querySelector('.orders-checkout__head');
  //     const total = document.querySelector('.orders-checkout__total');
  //     const wrapper = document.querySelector('.orders-checkout__wrapper');
  //     const body = document.querySelector('.orders-checkout__body');
  
  
  //       if (cart && head && total && wrapper) {
  //         const viewportHeight = window.innerHeight;
  //         const cartHeight = cart.offsetHeight;
  //         const headHeight = head.offsetHeight;
  //         const totalHeight = total.offsetHeight;
          
  //         cartSpoller.style.setProperty('--height', `${totalHeight}px`);
  
  //         if (cartHeight > (viewportHeight - 260)) {
  //           const newHeight = viewportHeight - 260 - headHeight - totalHeight;
  //           body.style.height = `${newHeight}px`;
  //           wrapper.classList.add('_more-content');
  //         } else {
  //           body.style.height = ''; 
  //           wrapper.classList.remove('_more-content');
  //         }
  //       }
       
  //   }
  //   }
  //   updateOrderCheckoutElHeights();


    // == card-slider елементи =============================================
    const slidersCheckout = document.querySelectorAll(".slider-checkout");

    slidersCheckout.forEach(slider => {
        const cardSliders = slider.querySelectorAll(".card-slider");
    
        if (cardSliders.length > 0) {
            cardSliders.forEach(card => {
                card.addEventListener("click", function (event) {
                    const isQuantity = event.target.closest(".quantity, .select_type-3");
                    
                    if (isQuantity) {
                        return;
                    }
                    
                    if (!card.classList.contains("checked")) {
                        cardSliders.forEach(item => item.classList.remove("checked"));
                        card.classList.add("checked");
                    }
                });
            });
        }
    });
    
    // =======================================
    
  
    let lastWidth = window.innerWidth;
    let resizeTimeout;
    window.addEventListener('resize', () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== lastWidth) {
        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
  
          updateOrderCheckoutElHeights();
          
          lastWidth = currentWidth;
        }, 0);
      }
    });

  
  

});

/* таймер обратного отсчета */
function startCountdown() {
  const timerElement = document.querySelector("[data-timer]");
  if (!timerElement) return;

  const totalMinutes = parseFloat(timerElement.getAttribute('data-timer'));
  let totalSeconds = Math.floor(totalMinutes * 60);

  // форматирования времени в формате MM : SS
  function formatTime(seconds) {
      const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
      const secs = String(seconds % 60).padStart(2, '0');
      return `${mins} : ${secs}`;
  }

  //  начальное значение 
  timerElement.textContent = formatTime(totalSeconds);

  // Запускаем обратный отсчет
  const interval = setInterval(() => {
      totalSeconds--;

      if (totalSeconds <= 0) {
          clearInterval(interval);
          timerElement.textContent = "00 : 00";
          return;
      }

      // Обновляем отображение времени
      timerElement.textContent = formatTime(totalSeconds);
  }, 1000);
}
startCountdown();


// === International Telephone Input ========================== 

// switch (siteLang) {
//   case 'ar':
//     language = ar;
//     break;
//   case 'bg':
//       language = bg;
//       break;
//   case 'bn':
//     language = bn;
//     break;
//   case 'bs':
//     language = bs;
//     break;
//   case 'ca':
//     language = ca;
//     break;
//   case 'cs':
//     language = cs;
//     break;
//   case 'da':
//     language = da;
//     break;
//   case 'de':
//     language = de;
//     break;
//   case 'el':
//     language = el;
//     break;
//   case 'en':
//     language = en;
//     break;
//   case 'es':
//     language = es;
//     break;
//   case 'fa':
//     language = fa;
//     break;
//   case 'fi':
//     language = fi;
//     break;
//   case 'fr':
//     language = fr;
//     break;
//   case 'hi':
//     language = hi;
//     break;
//   case 'hr':
//     language = hr;
//     break;
//   case 'hu':
//     language = hu;
//     break;
//   case 'id':
//     language = id;
//     break;
//   case 'it':
//     language = it;
//     break;
//   case 'ja':
//     language = ja;
//     break;
//   case 'ko':
//     language = ko;
//     break;
//   case 'mr':
//     language = mr;
//     break;
//   case 'nl':
//     language = nl;
//     break;
//   case 'no':
//     language = no;
//     break;
//   case 'pl':
//     language = pl;
//     break;
//   case 'pt':
//     language = pt;
//     break;
//   case 'ro':
//     language = ro;
//     break;
//   case 'ru':
//     language = ru;
//     break;
//   case 'sk':
//     language = sk;
//     break;
//   case 'sv':
//     language = sv;
//     break;
//   case 'te':
//     language = te;
//     break;
//   case 'th':
//     language = th;
//     break;
//   case 'tr':
//     language = tr;
//     break;
//   case 'uk':
//     language = uk;
//     break;
//   case 'ur':
//     language = ur;
//     break;
//   case 'vi':
//     language = vi;
//     break;
//   case 'zh':
//     language = zh;
//     break;
//   default:
//     language = null; // Английский будет по умолчанию
// }

/* 
  *International Telephone Input v25.3.0
 *https://github.com/jackocnr/intl-tel-input.git
*/
const intlTelInputs = document.querySelectorAll("[data-intl-number]");
if (intlTelInputs.length > 0) {
  
  const siteLang = document.documentElement.lang.slice(0, 2); // Определяем язык сайта
  let language;
  
  switch (siteLang) {
    case 'ru':
      language = ru;
      break;
    case 'uk':
      language = uk;
      break;
    default:
      language = null; // Английский будет по умолчанию
  }
  
  intlTelInputs.forEach(input => {
    window.intlTelInput(input, {
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
      i18n: language,
    });
  });

}


/* tippy settins */
// ==============================================================
tippy('[data-tippy-content]', {
  placement: 'bottom',
});




/* Календарь, переключение между двумя плагинами по ширине 480рх (30.061em): air-datepicker и Rolldate-full 

https://air-datepicker.com/ru/docs
mobile date picker: https://www.npmjs.com/package/rolldate-full?activeTab=readme

*/
const timeFormatsAir = {
  'en': 'hh:mm AA',  // 12-часовой формат с AM/PM
  'uk': 'HH:MM',     // 24-часовой формат
  'ru': 'HH:MM'      // 24-часовой формат
};

const currentLang = document.documentElement.lang || 'en';
const timeFormatAir = timeFormatsAir[currentLang] || timeFormatsAir['en']; // Если нет настроек — используем формат 'en'

const datepickerSelector = '[data-datepicker]';
const timepickerSelector = '[data-datepicker-time]';
let dp = null, tp = null;
let rd = null, rt = null;

function getLocalizedMonths(lang) {
  const defaultMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (locales[lang] && locales[lang].months) || defaultMonths;
}

function getLocalizedRolldateText(lang) {
  const translations = {
    'uk': { title: 'Вибрати дату', cancel: 'Відмінити', confirm: 'Вибрати' },
    'ru': { title: 'Выбрать дату', cancel: 'Отменить', confirm: 'Выбрать' },
    'en': { title: 'Select date', cancel: 'Cancel', confirm: 'Confirm' }
  };
  return translations[lang] || translations['en']; // Если нет перевода — используем 'en'
}

function toggleDatepicker(e) {
  if (e.matches) {
    if (dp) { dp.destroy(); dp = null; }
    if (tp) { tp.destroy(); tp = null; }

    if (!rd && document.querySelector(datepickerSelector)) {
      rd = new Rolldate({
        el: datepickerSelector,
        format: 'DD/MM/YYYY',
        beginYear: 1920,
        endYear: 2050,
        minStep: 1,
        typeMonth: 'text',
        localeMonth: getLocalizedMonths(currentLang),
        lang: getLocalizedRolldateText(currentLang),
        trigger: 'tap'
      });
    }

    if (!rt && document.querySelector(timepickerSelector)) {
      const timeFormat = ['ru', 'uk'].includes(currentLang) ? 'hh:mm' : 'hh:mm A';

      rt = new Rolldate({
          el: timepickerSelector,
          format: timeFormat,
          minStep: 1,
          trigger: 'tap'
      });
    }
  } else {
    if (rd) { rd = null; }
    if (rt) { rt = null; }

    if (!dp && document.querySelector(datepickerSelector)) {
      dp = new AirDatepicker(datepickerSelector, {
        dateFormat: 'dd.MM.yyyy',
        minDate: '01.01.1900',
        autoClose: true,
        locale: locales[currentLang] || locales['en']
      });
    }

    if (!tp && document.querySelector(timepickerSelector)) {
      tp = new AirDatepicker(timepickerSelector, {
        timepicker: true,
        onlyTimepicker: true,
        autoClose: true,
        timeFormat: timeFormatAir,  // Локализованный формат времени (с резервом на en)
        locale: locales[currentLang] || locales['en']
      });
    }
  }
}

const mediaQuery = window.matchMedia('(max-width: 30.061em)');
mediaQuery.addEventListener('change', toggleDatepicker);
toggleDatepicker(mediaQuery);

// === END DATE PICKER ============================================




const illustrationInput = document.getElementById("customImageInput");
if (illustrationInput) {
  illustrationInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const previewContainer = document.querySelector(".illustrations__item--add .illustrations__img");
        previewContainer.innerHTML = `<img class="ibg" src="${e.target.result}" alt="Uploaded Image">`;
        document.querySelector('.illustrations__item--add').classList.add('_added');
  
        // Снимаем выбор со всех radio-инпутов
        document.querySelectorAll('.illustrations__input[type="radio"]').forEach(radio => {
          radio.checked = false;
        });
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Снимаем выбор с пользовательского инпута, если кликнули на любой radio-инпут
  document.querySelectorAll('.illustrations__input[type="radio"]').forEach(radio => {
    radio.addEventListener("change", function () {
      document.getElementById("customImageInput").value = ""; // Сбрасываем input file
      document.querySelector('.illustrations__item--add').classList.remove('_added'); // Убираем класс _added
      document.querySelector(".illustrations__item--add .illustrations__img").innerHTML = ""; // Очищаем превью
    });
  });
}







document.addEventListener("DOMContentLoaded", () => {
  // Получаем все попапы на странице
  const popups = document.querySelectorAll(".popup");

  popups.forEach(popup => {
    const popupContent = popup.querySelector(".popup__content");
    const popupTop = popup.querySelector(".popup__close");
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let initialHeight = popupContent.offsetHeight;

    // Обработчик начала касания
    popupTop.addEventListener("touchstart", (e) => {
        startY = e.touches[0].clientY;
        currentY = startY;
        isDragging = true;

        // Обновляем начальную высоту, чтобы она была актуальной
        initialHeight = popupContent.offsetHeight;
    });

    // Обработчик перемещения
    popupTop.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        currentY = e.touches[0].clientY;
        let deltaY = currentY - startY;

        if (deltaY > 50) {
            // Закрываем попап
            flsModules.popup.close(); 
            setTimeout(() => {
              popupContent.style.height = "";
            }, 300);
        } else {
            // Потягивание вверх (увеличение высоты)
            let newHeight = initialHeight - deltaY;
            popupContent.style.height = `${newHeight}px`;
        }
    });

    // Обработчик завершения касания
    popupTop.addEventListener("touchend", () => {
        isDragging = false;
        let deltaY = currentY - startY;

        if (deltaY > 100) {
            // Закрытие попапа
            setTimeout(() => {
              popupContent.style.transform = "";
              popupContent.style.height = "";
            }, 300);
        } else {
            // Возвращаем высоту контента
            popupContent.style.height = `${initialHeight - deltaY}px`;
        }
    });
  });
});




