// Підключення функціоналу "Чертоги Фрілансера"
// import { tr } from "intl-tel-input/i18n";
import { isMobile, bodyLockToggle, _slideToggle, _slideUp, _slideDown } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


// import AirDatepicker from 'air-datepicker';
// import 'air-datepicker/air-datepicker.css';
// import localeEn from 'air-datepicker/locale/en';
// import localeRu from 'air-datepicker/locale/ru';
// import localeUk from 'air-datepicker/locale/uk';


document.addEventListener("DOMContentLoaded", () => {

  const mediaQuery900min = window.matchMedia('(min-width: 56.311em)');
  const mediaQuery900max = window.matchMedia('(max-width: 56.311em)');
  const mediaQuery700max = window.matchMedia('(max-width: 43.811em)');
  const mediaQuery700min = window.matchMedia('(min-width: 43.811em)');
  const mediaQuery480max = window.matchMedia('(max-width: 30.061em)');
  const mediaQuery480min = window.matchMedia('(min-width: 30.061em)');

  const checkoutPage = document.querySelector('.checkout');
  if (checkoutPage) {
    document.documentElement.classList.add('checkout-page');
  }

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
  mediaQuery900max.addEventListener('change', initDragSpoiler);
  
  

  // == Обработка клика элементов Хедера cabinet-header__button ====================
  const popupButtons = document.querySelectorAll('.cabinet-header__button');

  function toggleModalShow(button) {
    const parentElement = button.parentElement;
    if (button.classList.contains('_modal-show')) {
      button.classList.remove('_modal-show');
      parentElement.classList.remove('_modal-show');
    } else {
      document.querySelectorAll('._modal-show').forEach(el => {
        el.classList.remove('_modal-show');
        if (el.parentElement) {
          el.parentElement.classList.remove('_modal-show');
        }
      });
      button.classList.add('_modal-show');
      parentElement.classList.add('_modal-show');
    }
  }

  popupButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      const popupValue = button.dataset.popup; // например "#popupCabinet" или "#popupCart"

      if (popupValue === "#popupCabinet") {
        if (window.matchMedia('(min-width: 30.061em)').matches) {
          e.stopPropagation();
        }
        toggleModalShow(button);

      } else if (popupValue === "#popupCart") {
        toggleModalShow(button);
      }
    });
  });

  document.addEventListener('click', function (e) {
    const clickInsideButton = Array.from(popupButtons).some(button => button.contains(e.target));
    const openModalElements = document.querySelectorAll('._modal-show');
    const clickInsideModal = Array.from(openModalElements).some(el => el.contains(e.target));

    if (!clickInsideButton && !clickInsideModal) {
      openModalElements.forEach(el => {
        el.classList.remove('_modal-show');
        if (el.parentElement) {
          el.parentElement.classList.remove('_modal-show');
        }
      });
    }
  });
    // =================================
  


  // == Работа с фильтрами на странице data-filters =================
  const filterSections = document.querySelectorAll('[data-filters]')
  filterSections.forEach(section => {
      const filterSpollers = section.querySelector('.filters-spoller');

      const filterType = section.getAttribute('data-filters');
      if (filterType) {
          section.classList.add(`filters_${filterType}`);
      }
  
      const spollers = section.querySelectorAll('[data-filters-spoller]');
      spollers.forEach(spoller => {
          const spollerBody = spoller.nextElementSibling;
          _slideUp(spollerBody, 0);
  
          spoller.addEventListener('click', function() {
              const isOpening = spollerBody.hidden || spollerBody.style.height === '0px';
              _slideToggle(spollerBody, 300, 0, 200);
  
              if (isOpening) {
                  spollerBody.classList.add('is-open');
              } else {
                  spollerBody.classList.remove('is-open');
              }
          });
      });
  
      const button = section.querySelector('[data-filters-title]');
      const wrapper = section.querySelector('[data-filters-wrapper]');
      const input = section.querySelector('[data-filters-input]');

  
      button.addEventListener('click', (event) => {
          // Если  есть `search` и клик был по `input`, не закрываем `wrapper`
          if (section.hasAttribute('data-filters-search') && event.target === input) {
              return;
          }
  
          wrapper.classList.toggle('is-open');
          button.classList.toggle('is-open');
  
          const openSpollerBodies = wrapper.querySelectorAll('[data-filters-spoller-body].is-open');
          openSpollerBodies.forEach(spollerBody => {
              _slideUp(spollerBody, 300);
              spollerBody.classList.remove('is-open');
          });
  
          if (wrapper.classList.contains('is-open')) {
            if (mediaQuery480min.matches) {
              adjustWrapperMaxHeight(wrapper);
              adjustWrapperPosition(wrapper);
            }
          }

          if (filterSpollers && mediaQuery480max.matches) {
              _slideToggle(filterSpollers, 300, 0, 140);
          }
      });
  
      if (input) {
          input.addEventListener('focus', () => {
              if (!wrapper.classList.contains('is-open')) {
                  wrapper.classList.add('is-open');
                  button.classList.add('is-open');
                  
                  if (mediaQuery480min.matches) {
                    adjustWrapperMaxHeight(wrapper);
                    adjustWrapperPosition(wrapper);
                }
              }
          });
      }

      function handleMediaChange(e) {
        if (e.matches) {
            if (e.media === mediaQuery480max.media) {
              if (filterSpollers) _slideUp(filterSpollers, 0);
            } else if (e.media === mediaQuery480min.media) {
              if (filterSpollers) filterSpollers.hidden = false; 
            }
        }
    }

    handleMediaChange(mediaQuery480max);
    handleMediaChange(mediaQuery480min);

    mediaQuery480max.addEventListener('change', handleMediaChange);
    mediaQuery480min.addEventListener('change', handleMediaChange);
  });
  
      // Фильтрация при вводе в поиске
      document.querySelectorAll('[data-filters-search]').forEach(filterSection => {
          const input = filterSection.querySelector('[data-filters-input]');
          const list = filterSection.querySelector('.filters__list');
      
          if (!input || !list) return;
      
          input.addEventListener('input', () => {
              const searchValue = input.value.trim().toLowerCase();
              const items = list.querySelectorAll('.filters__item');
              let hasResults = false;
      
              items.forEach(item => {
                  const itemText = item.querySelector('.filters__name').textContent.trim().toLowerCase();
                  if (itemText.includes(searchValue)) {
                      item.hidden = false;
                      hasResults = true;
                  } else {
                      item.hidden = true;
                  }
              });
      
              // Удаляем старый блок "ничего не найдено"
              const noResultsItem = list.querySelector('.filters__no-results');
              if (noResultsItem) noResultsItem.remove();
      
              // Если ничего не найдено, добавляем элемент
              if (!hasResults) {
                  const noResults = document.createElement('li');
                  noResults.classList.add('filters__item', 'filters__no-results');
                  noResults.innerHTML = `<div class="filters__label"><span class="filters__name">За вашим запитом нічого не знайдено</span></div>`;
                  list.appendChild(noResults);
              }
          });
      });
      
      // закрытие фильтра при клике вне элемента
      document.addEventListener('click', (event) => {
          filterSections.forEach(section => {
              if (section.hasAttribute('data-filters-close')) {
                  const wrapper = section.querySelector('[data-filters-wrapper]');
                  const button = section.querySelector('[data-filters-title]');
                  const input = section.querySelector('[data-filters-input]');
      
                  // НЕ закрываем, если клик был по input
                  if (input && input.contains(event.target)) {
                      return;
                  }
      
                  if (!section.contains(event.target) && wrapper.classList.contains('is-open')) {
                      wrapper.classList.remove('is-open');
                      button.classList.remove('is-open');
      
                      const openSpollerBodies = wrapper.querySelectorAll('[data-filters-spoller-body].is-open');
                      openSpollerBodies.forEach(spollerBody => {
                          _slideUp(spollerBody, 0);
                          spollerBody.classList.remove('is-open');
                      });
                  }
              }
          });
      
          // Обработка клика на кнопку очистки
          if (event.target.matches('.filters__clear') && !event.target.disabled) {
              const wrapper = event.target.closest('[data-filters-wrapper]');
              clearFilters(wrapper);
          }
      });
    
      let resizeTimeout2;
      let lastWidth2 = window.innerWidth;
      let lastHeight2 = window.innerHeight;

      window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout2);
          requestAnimationFrame(() => {
              const currentWidth = window.innerWidth;
              const currentHeight = window.innerHeight;
              // Если размеры изменяются, обновляем последние значения
              if (currentWidth !== lastWidth2 || currentHeight !== lastHeight2) {
                  lastWidth2 = currentWidth;
                  lastHeight2 = currentHeight;
              }
            
              resizeTimeout2 = setTimeout(() => {
                  const openWrappers = document.querySelectorAll('.filters__wrapper.is-open');
                  openWrappers.forEach(wrapper => {
                      adjustWrapperMaxHeight(wrapper);
                      adjustWrapperPosition(wrapper);
                  });
              }, 300);
          });
      });
      
      document.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox' && event.target.matches('[data-filters-body] input[type="checkbox"]')) {
          const wrapper = event.target.closest('[data-filters-wrapper]');
          updateButtonState(wrapper);
          updateCount(wrapper);
      
          const parentElement = event.target.parentElement;
          if (event.target.checked) {
            parentElement.classList.add('_checked');
          } else {
            parentElement.classList.remove('_checked');
          }
        }
      });

    function adjustWrapperPosition(wrapper) {
      if (!wrapper) return;
  
      const parent = wrapper.closest('[data-filters]');
      if (!parent) return;
  
      const parentRect = parent.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const spaceToRight = viewportWidth - parentRect.right;
  
      if (spaceToRight < 150) {
          wrapper.classList.add('_align-right');
          wrapper.classList.remove('_align-left');
      } else {
          wrapper.classList.add('_align-left');
          wrapper.classList.remove('_align-right');
      }
    }
    
    function adjustWrapperMaxHeight(wrapper) {
      const viewportHeight = window.innerHeight;
      const wrapperRect = wrapper.getBoundingClientRect();
      const spaceBelow = viewportHeight - wrapperRect.top;
  
      const head = wrapper.querySelector('[data-filters-head]');
      const footer = wrapper.querySelector('[data-filters-footer]');
      const body = wrapper.querySelector('[data-filters-body]');
  
      const headHeight = head ? head.offsetHeight : 0;
      const footerHeight = footer ? footer.offsetHeight : 0;
      let availableHeight = spaceBelow - headHeight - footerHeight - 24;
  
      if (body) {
          // Если места меньше 250px, устанавливаем фиксированную max-height
          if (spaceBelow < 250) {
              availableHeight = Math.max(110, availableHeight); // Минимум 110px, чтобы не скрывался контент
          }
  
          body.style.maxHeight = `${availableHeight}px`;
          wrapper.dataset.maxHeight = availableHeight;
  
          // есть ли вложенные элементы, превышающие availableHeight
          let isContentOverflowing = false;
          const childElements = body.querySelectorAll('*');
  
          for (let element of childElements) {
              if (element.scrollHeight > availableHeight) {
                  isContentOverflowing = true;
                  break;
              }
          }
  
          if (isContentOverflowing) {
              body.classList.add('_more-content');
          } else {
              body.classList.remove('_more-content');
          }
      }
    }
  
    function updateButtonState(wrapper) {
      const footer = wrapper.querySelector('[data-filters-footer]');
      const inputs = wrapper.querySelectorAll('[data-filters-body] input[type="checkbox"]');
      
      let anyChecked = Array.from(inputs).some(input => input.checked);
      
      if (footer) {
        const buttons = footer.querySelectorAll('button');
        buttons.forEach(button => {
          button.disabled = !anyChecked;
        });
      }
    }
  
    function clearFilters(wrapper) {
      const inputs = wrapper.querySelectorAll('[data-filters-body] input[type="checkbox"]');
      
      inputs.forEach(input => {
        input.checked = false;
        const parentElement = input.parentElement;
        parentElement.classList.remove('_checked');
      });
    
      updateButtonState(wrapper);
      updateCount(wrapper);
    }
    
    function updateCount(wrapper) {
      const inputs = wrapper.querySelectorAll('[data-filters-body] input[type="checkbox"]');
      const count = Array.from(inputs).filter(input => input.checked).length;
      const countSpanEl = wrapper.querySelector('.filters__count');
      const countSpan = wrapper.querySelector('.filters__count span');
      if (countSpan) {
        countSpan.textContent = `(${count})`;
        if (count > 0) {
          countSpanEl.classList.add('_show');
        } else {
          countSpanEl.classList.remove('_show');
        }
      }
    }
    
  

  

  // =================================

     // == Открыть/закрыть каталог сертификатов на моб. =======================
     const filterButtons = document.querySelectorAll('[data-open-filters]');

     if (filterButtons.length > 0) {
         const mobileFilterWrapper = document.querySelector('.filters__wrapper_mob');
            filterButtons.forEach(button => {
              button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (mediaQuery700max.matches) {
                  adjustWrapperMaxHeight(mobileFilterWrapper);
                   mobileFilterWrapper.classList.toggle('is-open');
                }
              });
            });
     
         mediaQuery700max.addEventListener('change', (e) => {
             if (!e.matches && mobileFilterWrapper.classList.contains('is-open')) {
                 mobileFilterWrapper.classList.remove('is-open');
             }
         });
     }
     
       // ===========================================================


    // sub-header__link_more клик по кнопке "больше"=========
  
      function handleTabletChange(e) {
          if (e.matches) {
              const moreButton = document.querySelector('.sub-header__link_more');
              if (moreButton) {
                  const moreSubMenu = moreButton.nextElementSibling;
                  
                  moreButton.addEventListener('click', function(event) {
                      event.stopPropagation(); // Останавливаем всплытие события
                      moreButton.classList.toggle('is-open');
                      moreSubMenu.classList.toggle('is-open');
                  });
                  
                  document.addEventListener('click', function(event) {
                      if (!moreSubMenu.contains(event.target) && !moreButton.contains(event.target)) {
                          moreButton.classList.remove('is-open');
                          moreSubMenu.classList.remove('is-open');
                      }
                  });
              }
          }
      }
  
      handleTabletChange(mediaQuery700min);
      mediaQuery700min.addEventListener('change', handleTabletChange);


   
      
  
  

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

  // Функция закрытия/очистки выпадающего списка для конкретного блока поиска
  function closeUI() {
    searchList.innerHTML = "";
    searchHeader.innerHTML = "";
    searchNull.style.display = "none";
    searchBox.style.pointerEvents = "none";
    searchInput.classList.remove("_input-focus");
    searchElement.classList.remove("_input-focus");
  }

  function updateUI(type) {
    searchList.innerHTML = "";
    searchHeader.innerHTML = "";
    searchNull.style.display = "none";

    if (type === "history" && searchHistory.length > 0) {
      searchHeader.innerHTML = `
        <div class="search__history">
          Історія пошуку 
          <button class="search__clear-btn">Очистити</button>
        </div>
      `;
      // При клике на "Очистити" вызываем clearHistory, при этом не закрываем список
      searchHeader.querySelector('.search__clear-btn')
        .addEventListener("click", e => clearHistory(e));
      renderList(searchHistory);
    } else if (type === "top") {
      searchHeader.innerHTML = `
        <div class="search__top">
          Топ запитів 
          <button class="search__top-link">Інші рекомендації</button>
        </div>
      `;
      // При клике на "Інші рекомендації" окно не закрывается
      searchHeader.querySelector('.search__top-link')
        .addEventListener("click", e => {
          e.stopPropagation(); // не закрываем окно
          updateUI("top");
        });
      renderList(brands.filter(brand => brand.isTop), true);
    }
  }

  function renderList(items, isTop = false) {
    // Если список пуст – показываем блок с сообщением
    searchNull.style.display = items.length === 0 ? "block" : "none";
  
    items.forEach(brand => {
      const item = document.createElement("button");
      item.setAttribute("type", "button"); // Задаем явный тип
      item.classList.add("search__item");
      if (isTop) item.classList.add("search__item--top");
      item.innerHTML = `
        <img src="${brand.logo}" width="37" height="24" class="search__logo" alt="${brand.name}">
        <span class="search__name">${brand.name}</span>
        <span class="search__icon icon-search"></span>
      `;
      item.addEventListener("click", (e) => {
        e.stopPropagation(); // чтобы клик не всплывал и не влиял на popup
        // Записываем выбранное значение в инпут, закрываем окно и обновляем историю
        searchInput.value = brand.name;
        searchList.innerHTML = "";
        searchHeader.innerHTML = "";
        searchNull.style.display = "none";
        addToHistory(brand);
        // Закрываем окно после выбора элемента
        closeUI();
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

  // Функция теперь принимает событие, чтобы можно было вызвать stopPropagation
  function clearHistory(e) {
    e.stopPropagation();
    searchHistory = [];
    localStorage.removeItem("searchHistory");
    updateUI("top");
    // Переводим фокус обратно в инпут, чтобы окно оставалось открытым
    searchInput.focus();
  }

  // При фокусе на инпут: добавляем классы, включаем pointerEvents и запускаем фильтрацию, если значение уже есть
  searchInput.addEventListener("focus", () => {
    searchInput.classList.add("_input-focus");
    searchElement.classList.add("_input-focus");
    searchBox.style.pointerEvents = "all";
    if (searchInput.value) {
      // Запускаем обработчик input, чтобы отобразить список совпадений або повідомлення searchNull
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
      const filteredBrands = brands.filter(brand =>
        brand.name.toUpperCase().includes(query)
      );
      renderList(filteredBrands);
    } else {
      updateUI(searchHistory.length > 0 ? "history" : "top");
    }
  });

  // Вместо закрытия по blur – закрываем окно, если кликнули вне области текущего блока поиска
  document.addEventListener("click", (e) => {
    // Если клик произошёл вне текущего search-элемента...
    if (!e.target.closest('.search')) {
      closeUI();
    }
  });
});



// == END OF SEARCH INPUTS BRANDS ============================

