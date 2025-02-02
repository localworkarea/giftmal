// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


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

  
    
    // const inputSms = document.querySelector(".input-sms");
    // const charElements = document.querySelectorAll(".input__sms-char");

    // function updateDisplaySms() {
    //     const value = inputSms.value.replace(/\D/g, "").slice(0, charElements.length);
    //     inputSms.value = value;

    //     charElements.forEach((charEl, index) => {
    //         charEl.textContent = value[index] || "X";
    //         charEl.classList.toggle("sms-placeholder", !value[index]);
    //         charEl.classList.remove("sms-cursor");
    //     });

    //     // Добавляем мигающий курсор к следующему пустому символу
    //     if (value.length < charElements.length) {
    //         charElements[value.length].classList.add("sms-cursor");
    //     }
    // }

    // inputSms.addEventListener("input", updateDisplaySms);
    // inputSms.addEventListener("focus", updateDisplaySms);
    // inputSms.addEventListener("click", updateDisplaySms);


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
