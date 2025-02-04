// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";
// import intlTelInput from "intl-tel-input";
// import { ru, uk } from "intl-tel-input/i18n"

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


tippy('[data-tippy-content]', {
  placement: 'bottom',
});