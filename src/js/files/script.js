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
  
      tabs.forEach(tab => {
        tab.classList.remove("tab-active");
        tab.setAttribute("hidden", "true");
      });
  
      tabs[index].classList.add("tab-active");
      tabs[index].removeAttribute("hidden");
    });
  });
  
  // ===============================================
  
  // == update height elements ================
  function updateOrderCheckoutElHeights(e) {
    const mainCart = document.querySelector('.orders-checkout__cart_main');
    if (!mainCart) return;

    const spoller = mainCart.querySelector('.orders-checkout__spoller');
    const head = spoller.querySelector('.orders-checkout__head');
    const total = mainCart.querySelector('.orders-checkout__total');
    const wrapper = spoller.querySelector('.orders-checkout__wrapper');
    const body = spoller.querySelector('.orders-checkout__body');

    if (!head || !total || !wrapper || !body) return;

    const viewportHeight = window.innerHeight;
    const cartHeight = mainCart.offsetHeight;
    const headHeight = head.offsetHeight;
    const totalHeight = total.offsetHeight;

    if (window.matchMedia('(min-width: 56.311em)').matches) {
        spoller.style.setProperty('--height', `${totalHeight}px`);

        if (cartHeight > (viewportHeight - 260)) {
            const newHeight = viewportHeight - 260 - headHeight - totalHeight;
            body.style.height = `${newHeight}px`;
            wrapper.classList.add('_more-content');
        } else {
            body.style.height = '';
            wrapper.classList.remove('_more-content');
        }
    } else {
        body.style.height = '';
        wrapper.classList.remove('_more-content');
        spoller.style.removeProperty('--height');
    }
  }

  const mediaQuery900min = window.matchMedia('(min-width: 56.311em)');
  mediaQuery900min.addEventListener('change', updateOrderCheckoutElHeights);

  updateOrderCheckoutElHeights();


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

  
  // == drag popup elements ==========================================
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

  // == drag spollerPopup elements ==========================================

  function initDragSpoiler() {
    const spollerPopup = document.querySelectorAll("[data-spollers-popup]");
    spollerPopup.forEach((popup) => {
      const ordersHead = popup.querySelector(".orders-checkout__head");
      const ordersBody = popup.querySelector(".orders-checkout__body");
      const ordersMobWr = popup.parentElement.closest(".orders-checkout__mob-wr");
  
      let startY = 0;
      let currentY = 0;
      let isDragging = false;
      let initialHeightBody = 0;
  
      ordersHead.addEventListener("touchstart", (e) => {
        const spollerBlock = ordersHead.closest("details");
        if (!spollerBlock || !spollerBlock.open) return;
  
        startY = e.touches[0].clientY;
        currentY = startY;
        isDragging = true;
        initialHeightBody = ordersBody.offsetHeight;
      });
  
      ordersHead.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        currentY = e.touches[0].clientY;
        let deltaY = currentY - startY;
  
        if (deltaY > 50) {
          const spollerBlock = ordersHead.closest("details");
          if (spollerBlock) {
            const spollerTitle = spollerBlock.querySelector("summary");
            if (spollerTitle) {
              spollerTitle.click();
            }
          }
          
          setTimeout(() => {
            ordersBody.style.height = "";
          }, 300);
        } else {
          let newHeightBody = initialHeightBody - deltaY;
          ordersBody.style.height = `${newHeightBody}px`;
        }
      });
  
      ordersHead.addEventListener("touchend", () => {
        isDragging = false;
        // let deltaY = currentY - startY;
        // if (deltaY > 100) {
        //   const spollerBlock = ordersHead.closest("details");
        //   if (spollerBlock) {
        //     const spollerTitle = spollerBlock.querySelector("summary");
        //     if (spollerTitle) {
        //       spollerTitle.click();
        //     }
        //   }
          
        //   setTimeout(() => {
        //     ordersBody.style.height = "";
        //   }, 300);
        // }
      });
    });
  }
  initDragSpoiler();

  const mediaQuery900max = window.matchMedia('(max-width: 56.311em)');
  mediaQuery900max.addEventListener('change', initDragSpoiler);
  
  

  // == Обработка клика элементов Хедера cabinet-header__button ====================
    const popupButtons = document.querySelectorAll('.cabinet-header__button');
    if (popupButtons.length > 0) {
      const cardCabinet = document.querySelector('.card-cabinet');

      function toggleModalShow(button) {
        const parentElement = button.parentElement;
        if (button.classList.contains('_modal-show')) {
          button.classList.remove('_modal-show');
          parentElement.classList.remove('_modal-show');
        } else {
          document.querySelectorAll('._modal-show').forEach(el => {
            el.classList.remove('_modal-show');
            el.parentElement.classList.remove('_modal-show');
          });
          button.classList.add('_modal-show');
          parentElement.classList.add('_modal-show');
        }
      }
  
      popupButtons.forEach(button => {
        button.addEventListener('click', function (e) {
          toggleModalShow(button);
        });
      });
  
      // Глобальный обработчик для закрытия модальных окон
      document.addEventListener('click', function (e) {
        if (!Array.from(popupButtons).some(button => button.contains(e.target))) {
          document.querySelectorAll('._modal-show').forEach(el => {
            el.classList.remove('_modal-show');
            el.parentElement.classList.remove('_modal-show');
          });
        }
      });
    }
    // =================================
  
  

}); // end DOMContentLoaded

/* таймер обратного отсчета */
function startCountdown(timerElement, callback) {
  if (!timerElement) return;

  const totalMinutes = parseFloat(timerElement.getAttribute('data-timer'));
  let totalSeconds = Math.floor(totalMinutes * 60);

  function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins} : ${secs}`;
  }

  timerElement.textContent = formatTime(totalSeconds);

  const interval = setInterval(() => {
    totalSeconds--;

    if (totalSeconds <= 0) {
      clearInterval(interval);
      timerElement.textContent = "00 : 00";
      if (callback) {
        callback();
      }
      return;
    }

    timerElement.textContent = formatTime(totalSeconds);
  }, 1000);
}

document.querySelectorAll('[data-timer]').forEach(timerElement => {
  startCountdown(timerElement);
});

// Запуск таймеров при загрузке страницы
document.querySelectorAll("[data-timer-set]").forEach(element => {
  const timerElement = element.querySelector("[data-timer]");
  
  if (timerElement) {
    element.classList.add("_timer-active");
    startCountdown(timerElement, () => {
      setTimeout(() => {
        element.classList.remove("_timer-active");
      }, 2000); // Удаление класса через 2 секунды после окончания таймера
    });
  }
});

// Вешаем обработчики на кнопки
document.querySelectorAll("[data-timer-set]").forEach(element => {
  const button = element.querySelector("[data-timer-btn]");
  const timerElement = element.querySelector("[data-timer]");
  
  if (button && timerElement) {
    button.addEventListener("click", function () {
      startCountdown(timerElement, () => {
        setTimeout(() => {
          element.classList.remove("_timer-active");
        }, 2000);
      });
      element.classList.add("_timer-active");
    });
  }
});

// === International Telephone Input ========================== 

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
    const iti = window.intlTelInput(input, {
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
      useFullscreenPopup: window.innerWidth <= 900.98,
    });

    //  Проверяем, нужно ли вставлять дропдаун в попап
     if (iti.options.useFullscreenPopup) {
        const popupBody = document.querySelector("#popupIti .popup__body");
        if (popupBody) {
          iti.options.dropdownContainer = popupBody;
        }
      
        let dropdownOpened = false;
      
        if (typeof iti._openDropdown === "function" && typeof iti._closeDropdown === "function") {
          // Сохраняем оригинальные методы
          const originalShowDropdown = iti._openDropdown;
          const originalCloseDropdown = iti._closeDropdown;
        
          iti._openDropdown = function () {
            if (!dropdownOpened) {
              dropdownOpened = true;
              flsModules.popup.open('#popupIti');
            
              setTimeout(() => {
                originalShowDropdown.call(iti);
              }, 50);
            }
          };
        
          iti._closeDropdown = function () {
            if (dropdownOpened) {
              dropdownOpened = false;
              originalCloseDropdown.call(iti);
              flsModules.popup.close('#popupIti');
            }
          };
        
          // Обработчик закрытия попапа
          const handlePopupClose = (event) => {
            const currentPopup = event.detail.popup;
            if (currentPopup?.targetOpen?.selector === "#popupIti") {
              iti._closeDropdown();
            }
          };
        
          document.addEventListener("beforePopupClose", handlePopupClose);
          document.addEventListener("afterPopupClose", handlePopupClose);
        
          // Очищаем обработчики при уничтожении iti (если поддерживается)
          if (typeof iti.destroy === "function") {
            const originalDestroy = iti.destroy;
            iti.destroy = function () {
              document.removeEventListener("beforePopupClose", handlePopupClose);
              document.removeEventListener("afterPopupClose", handlePopupClose);
              originalDestroy.call(iti);
            };
          }
        }
      
    }
  });

}



/* tippy settins */
// ==============================================================
const tooltipElements = document.querySelectorAll("[data-tippy-content]");
if (tooltipElements.length > 0) {
  tippy(tooltipElements, {
    placement: "bottom",
  });
}


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
        trigger: 'tap',
        init: function() {
          flsModules.popup.open('#popupRolldate');
        },
        cancel: function() {
            flsModules.popup.close('#popupRolldate');
        },
        confirm: function(date) {
            flsModules.popup.close('#popupRolldate');
        },
      });
    }

    
    
    if (!rt && document.querySelector(timepickerSelector)) {
      const timeFormat = ['ru', 'uk'].includes(currentLang) ? 'hh:mm' : 'hh:mm A';
      if (rt) {
        rt.destroy(); // Если плагин поддерживает метод destroy, используйте его
      }
      rt = new Rolldate({
          el: timepickerSelector,
          format: timeFormat,
          minStep: 1,
          lang: getLocalizedRolldateText(currentLang),
          trigger: 'tap',
          init: function() {
            flsModules.popup.open('#popupRolldate');
          },
          cancel: function() {
              flsModules.popup.close('#popupRolldate');
          },
          confirm: function(date) {
              flsModules.popup.close('#popupRolldate');
          },
        });
      }
      
      document.addEventListener("beforePopupClose", (event) => {
        if (event.detail.popup.targetOpen.selector === "#popupRolldate") {
          rd?.hide();
          rt?.hide();
        }
      });

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



// == Add picture to the radio button =============================================
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
      document.getElementById("customImageInput").value = "";
      document.querySelector('.illustrations__item--add').classList.remove('_added');
      document.querySelector(".illustrations__item--add .illustrations__img").innerHTML = "";
    });
  });
}


// == SEARCH INPUTS BRANDS ============================
const brands = [
  { name: "Nails&Cocktails", logo: "img/search/nails.png" },
  { name: "Фокстрот", logo: "img/search/foxtrot.png" },
  { name: "Сільпо", logo: "img/search/silpo.png" },
  { name: "Winetime", logo: "img/search/winetime.png" },
  { name: "The Cake", logo: "img/search/thecake.png" },
  { name: "Nails&Cocktails дублікат", logo: "img/search/nails.png" },
  { name: "Фокстрот дублікат для тесту", logo: "img/search/foxtrot.png" },
  { name: "Сільпо дублікат", logo: "img/search/silpo.png" },
  { name: "Winetime тестуємо", logo: "img/search/winetime.png" },
  { name: "The Cake тест", logo: "img/search/thecake.png" },
  { name: "Apollo", logo: "img/search/apollo.png", isTop: true },
  { name: "Comfy", logo: "img/search/comfy.png", isTop: true },
  { name: "Diesel", logo: "img/search/diesel.png", isTop: true },
  { name: "Eva", logo: "img/search/eva.png", isTop: true },
  { name: "Springfield", logo: "img/search/springfield.png" },
  { name: "Фора", logo: "img/search/fora.png" },
  { name: "Фонтант", logo: "img/search/fontan.png" }
];

// Історія пошуку для всіх інпутів загальна
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

document.querySelectorAll('.search').forEach(searchElement => {
  const searchInput = searchElement.querySelector('.search__input');
  const searchList = searchElement.querySelector('.search__list');
  const searchHeader = searchElement.querySelector('.search__header');
  const searchBox = searchElement.querySelector('.search__box');
  const searchNull = searchElement.querySelector('.search__null');

  function updateUI(type) {
    searchList.innerHTML = "";
    searchHeader.innerHTML = "";
    searchNull.style.display = "none";

    if (type === "history" && searchHistory.length > 0) {
      searchHeader.innerHTML = `
        <div class="search__history">
          Історія пошуку 
          <button type="button" class="search__clear-btn">Очистити</button>
        </div>
      `;
      searchHeader.querySelector('.search__clear-btn').addEventListener("click", clearHistory);
      renderList(searchHistory);
    } else if (type === "top") {
      searchHeader.innerHTML = `
        <div class="search__top">
          Топ запитів 
          <a href="#" class="search__top-link">Інші рекомендації</a>
        </div>
      `;
      renderList(brands.filter(brand => brand.isTop), true);
    }
  }

  function renderList(items, isTop = false) {
    // Если список пуст – показываем блок с сообщением
    searchNull.style.display = items.length === 0 ? "block" : "none";

    items.forEach(brand => {
      const item = document.createElement("button");
      item.classList.add("search__item");
      if (isTop) item.classList.add("search__item--top");
      item.innerHTML = `
        <img src="${brand.logo}" width="37" height="24" class="search__logo" alt="${brand.name}">
        <span class="search__name">${brand.name}</span>
        <span class="search__icon icon-search"></span>
      `;
      item.addEventListener("click", () => {
        // Записываем выбранное значение в инпут
        searchInput.value = brand.name;
        searchList.innerHTML = "";
        searchHeader.innerHTML = "";
        searchNull.style.display = "none";
        addToHistory(brand);
      });
      searchList.appendChild(item);
    });
  }

  function addToHistory(brand) {
    if (!searchHistory.some(item => item.name === brand.name)) {
      searchHistory.unshift(brand);
      if (searchHistory.length > 7) searchHistory.pop();
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
  }

  function clearHistory() {
    searchHistory = [];
    localStorage.removeItem("searchHistory");
    updateUI("top");
  }

  // При фокусе на инпут добавляем класс _input-focus и включаем pointerEvents для блока
  // Если в инпуте уже есть значение – запускаем фильтрацию (как при событии input)
  searchInput.addEventListener("focus", () => {
    searchInput.classList.add("_input-focus");
    searchElement.classList.add("_input-focus");
    searchBox.style.pointerEvents = "all";
    if (searchInput.value) {
      // Запускаем обработчик input, чтобы отобразить список совпадений или сообщение searchNull
      searchInput.dispatchEvent(new Event("input"));
    } else {
      updateUI(searchHistory.length > 0 ? "history" : "top");
    }
  });

  // Обработчик ввода: фильтруем бренды по введённому запросу и выводим список или сообщение
  searchInput.addEventListener("input", () => {
    searchHeader.innerHTML = "";
    searchList.innerHTML = "";
    searchNull.style.display = "none";

    const query = searchInput.value.toUpperCase();
    if (query.length > 0) {
      const filteredBrands = brands.filter(brand => brand.name.toUpperCase().includes(query));
      renderList(filteredBrands);
    } else {
      updateUI(searchHistory.length > 0 ? "history" : "top");
    }
  });

  // При потере фокуса скрываем список и удаляем классы
  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      searchList.innerHTML = "";
      searchHeader.innerHTML = "";
      searchNull.style.display = "none";
      searchBox.style.pointerEvents = "none";
    }, 350);
    setTimeout(() => {
      searchInput.classList.remove("_input-focus");
      searchElement.classList.remove("_input-focus");
    }, 0);
  });
});

// == END OF SEARCH INPUTS BRANDS ============================

