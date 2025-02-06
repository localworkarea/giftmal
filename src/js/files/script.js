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



  // const spollers = document.querySelectorAll('[data-spoller]');
  // if (spollers.length) {
  //   spollers.forEach(spoller => {
  //     const spollerItems = spoller.querySelectorAll('[data-spoller-item]');
  //     if (spollerItems.length) {
  //       spollerItems.forEach(item => {
  //         const spollerBody = item.querySelector('[data-spoller-body]');
  //         if (spollerBody) {
  //             // Вычисляем высоту содержимого spoller-body
  //             const updateHeight = () => {
  //                 const bodyHeight = spollerBody.scrollHeight;
  //               item.style.setProperty('--height-item', `${bodyHeight}px`);
  //           };
  //           item.addEventListener('click', () => {
  //             const isActive = item.classList.contains('_active');
  //             // Закрываем все остальные элементы, если нужно
  //             spollerItems.forEach(otherItem => {
  //                 if (otherItem !== item) {
  //                     otherItem.classList.remove('_active');
  //                     otherItem.style.setProperty('--height-item', `0px`);
  //                 }
  //             });
  //             // Переключаем состояние текущего элемента
  //             if (isActive) {
  //                 item.classList.remove('_active');
  //                 item.style.setProperty('--height-item', `0px`);
  //             } else {
  //                 updateHeight();
  //                 item.classList.add('_active');
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // }

  
  // == update height elements ================
  function updateOrderCheckoutElHeights() {
    const cart = document.querySelector('.orders-checkout__cart');
    const cartSpoller = document.querySelector('.orders-checkout__spoller');
    const head = document.querySelector('.orders-checkout__head');
    const total = document.querySelector('.orders-checkout__total');
    const wrapper = document.querySelector('.orders-checkout__wrapper');
    const body = document.querySelector('.orders-checkout__body');


      if (cart && head && total && wrapper) {
        const viewportHeight = window.innerHeight;
        const cartHeight = cart.offsetHeight;
        const headHeight = head.offsetHeight;
        const totalHeight = total.offsetHeight;
        
        cartSpoller.style.setProperty('--height', `${totalHeight}px`);

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
    updateOrderCheckoutElHeights();
    
  
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

tippy("[data-tippy-content]", {
  placement: "bottom"
});

// function trackStickyElement() {
//   const spoller = document.querySelector('.orders-checkout__spoller');

//   if (!spoller) return;

//   let isSticky = false;

//   function checkSticky() {
//     const { bottom } = spoller.getBoundingClientRect();

//     if (bottom >= window.innerHeight) {
//       if (!isSticky) {
//         console.log('orders-checkout__spoller зафиксировался (sticky)');
//         isSticky = true;
//       }
//     } else {
//       if (isSticky) {
//         console.log('orders-checkout__spoller отлип (unstuck)');
//         isSticky = false;
//       }
//     }
//   }

//   window.addEventListener('scroll', checkSticky);
//   checkSticky(); // Проверяем сразу при загрузке
// }

// trackStickyElement();




// https://air-datepicker.com/ru/docs

// const currentLang = document.documentElement.lang || 'en';
// const datepickerSelector = '[data-datepicker]';
// let dp = null;

// function toggleDatepicker(e) {
//   if (e.matches) {
//     // Отключаем datepicker, если он существует
//     if (dp) {
//       dp.destroy();
//       dp = null;
//     }
//   } else {
//     // Включаем datepicker, если он ещё не инициализирован
//     if (!dp && document.querySelector(datepickerSelector)) {
//       dp = new AirDatepicker(datepickerSelector, {
//         dateFormat: 'dd.MM.yyyy',
//         minDate: '01.01.1900',
//         autoClose: true,
//         locale: locales[currentLang] || locales.en
//       });
//     }
//   }
// }

// const mediaQuery = window.matchMedia('(max-width: 30.061em)');
// mediaQuery.addEventListener('change', toggleDatepicker);
// toggleDatepicker(mediaQuery);


// // mobile date picker: https://www.cssscript.com/mobile-ios-date-picker-rolldate/
// let rd = new Rolldate({
//   el: '[data-datepicker]',
//   format: 'YYYY-MM-DD',
//   beginYear: 2000,
//   endYear: 2100,
//   minStep:1,
//   lang:{title:'Select date'},
//   trigger:'tap',
//   init: function() {
//     console.log('plugin start');
//   },
//   moveEnd: function(scroll) {
//     console.log('End of scroll');
//   },
//   confirm: function(date) {
//     console.log('OK button trigger');
//   },
//   cancel: function() {
//     console.log('Plug-in canceled');
//   }
// });
// rd.show();
// rd.hide();

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

