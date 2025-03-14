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


    const formatNumb = wNumb({
      thousand: " ", // Разделитель тысячных
      decimals: 0,    // Округление до целых
      mark: "."
  });

  document.querySelectorAll(".numb").forEach((el) => {
      let num = parseFloat(el.textContent.replace(/\s+/g, ""));
      if (!isNaN(num)) {
          el.textContent = formatNumb.to(num);
      }
  });




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

    if (!popupTop) return
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


  // == popup-login scroll content ==========================
  const popupLogin = document.querySelectorAll(".popup-login");
  popupLogin.forEach(popup => {
      const content = popup.querySelector(".popup-login__content");

      if (!content) return;

      content.addEventListener("scroll", function () {
          popup.classList.toggle("_scroll-content", content.scrollTop > 5);
      });
  });

  
  

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
              _slideToggle(spollerBody, 200, 0, 200);
  
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
  
          section.classList.toggle('_open');
          wrapper.classList.toggle('is-open');
          button.classList.toggle('is-open');
  
          const openSpollerBodies = wrapper.querySelectorAll('[data-filters-spoller-body].is-open');
          openSpollerBodies.forEach(spollerBody => {
              _slideUp(spollerBody, 200);
              spollerBody.classList.remove('is-open');
          });
  
          if (wrapper.classList.contains('is-open')) {
            if (mediaQuery480min.matches) {
              adjustWrapperMaxHeight(wrapper);
              adjustWrapperPosition(wrapper);
            }
          }

          if (filterSpollers && mediaQuery480max.matches) {
              _slideToggle(filterSpollers, 200, 0, 140);
          }
      });
  
      if (input) {
          input.addEventListener('focus', () => {
              if (!wrapper.classList.contains('is-open')) {
                  section.classList.add('_open');
                  wrapper.classList.add('is-open');
                  button.classList.add('is-open');
                  
                  if (mediaQuery480min.matches) {
                    adjustWrapperMaxHeight(wrapper);
                    adjustWrapperPosition(wrapper);
                  }
                  if (filterSpollers && mediaQuery480max.matches) {
                    _slideToggle(filterSpollers, 200, 0, 140);
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
      
  document.addEventListener('click', (event) => {
    filterSections.forEach(section => {
        if (section.hasAttribute('data-filters-close')) {
            const wrapper = section.querySelector('[data-filters-wrapper]');
            const button = section.querySelector('[data-filters-title]');
            const input = section.querySelector('[data-filters-input]');
            const filterSpollers = section.querySelector('.filters-spoller');

            if (input && input.contains(event.target)) {
                return;
            }

            if (!section.contains(event.target) && wrapper.classList.contains('is-open')) {
                section.classList.remove('_open');
                wrapper.classList.remove('is-open');
                button.classList.remove('is-open');

                const openSpollerBodies = wrapper.querySelectorAll('[data-filters-spoller-body].is-open');
                openSpollerBodies.forEach(spollerBody => {
                    _slideUp(spollerBody, 0);
                    spollerBody.classList.remove('is-open');
                });
                if (filterSpollers && mediaQuery480max.matches) {
                    _slideUp(filterSpollers, 200);
                }
            }
        }
    });

    // Обработка клика на кнопку очистки
    if (event.target.matches('.filters__clear') && !event.target.disabled) {
        const wrapper = event.target.closest('[data-filters-wrapper]');
        if (wrapper) {
            clearFilters(wrapper);
        }
    }

    // Очистка фильтров в мобильном попапе
    if (event.target.matches('[data-filters-footer-types] .filters__clear') && !event.target.disabled) {
        clearGlobalFilters();
    }
  });

    
  let resizeTimeout2;
  let lastWidth2 = window.innerWidth;
  let lastHeight2 = window.innerHeight
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
    if (event.target.matches('[data-filters-body] input[type="checkbox"], [data-filters-body] input[type="radio"]')) {
        const wrapper = event.target.closest('[data-filters-wrapper]');
        updateButtonState(wrapper);
        updateCount(wrapper);
        updateGlobalFiltersCount();

        const parentElement = event.target.parentElement;

        if (event.target.type === 'checkbox') {
            if (event.target.checked) {
                parentElement.classList.add('_checked');
            } else {
                parentElement.classList.remove('_checked');
            }
        }

        if (event.target.type === 'radio') {
            const groupName = event.target.name;
            const allRadios = wrapper.querySelectorAll(`input[name="${groupName}"]`);

            allRadios.forEach(radio => {
                const radioParent = radio.closest('.filters__item');
                radioParent.classList.remove('_checked');
                radio.dataset.wasChecked = "false";
            });

            if (event.target.checked) {
                event.target.dataset.wasChecked = "true";
                parentElement.classList.add('_checked');
            }
        }
      }
  });

  //  снимаем checked у radio
  document.querySelectorAll('[data-filters-body] input[type="radio"]').forEach((radio) => {
      radio.addEventListener("click", function () {
          if (this.dataset.wasChecked === "true") {
              this.checked = false;
              this.dataset.wasChecked = "false";
              this.closest('.filters__item').classList.remove('_checked');

              updateButtonState(this.closest('[data-filters-wrapper]'));
              updateCount(this.closest('[data-filters-wrapper]'));
              updateGlobalFiltersCount();
          } else {
              const groupName = this.name;
              const wrapper = this.closest('[data-filters-wrapper]');
              const allRadios = wrapper.querySelectorAll(`input[name="${groupName}"]`);
              allRadios.forEach(radio => {
                  radio.closest('.filters__item').classList.remove('_checked');
                  radio.dataset.wasChecked = "false";
              });

              this.dataset.wasChecked = "true";
              this.closest('.filters__item').classList.add('_checked');

              updateButtonState(wrapper);
              updateCount(wrapper);
              updateGlobalFiltersCount();
          }
      });
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
    const inputs = wrapper.querySelectorAll('[data-filters-body] input[type="checkbox"]:checked, [data-filters-body] input[type="radio"]:checked');

    const anyChecked = inputs.length > 0;

    if (footer) {
        const buttons = footer.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = !anyChecked;
        });
    }
  }
  
  function clearFilters(wrapper) {
    if (!wrapper) return;

    // Очищаем чекбоксы
    const checkboxes = wrapper.querySelectorAll('[data-filters-body] input[type="checkbox"]');
    checkboxes.forEach(input => {
        input.checked = false;
        input.parentElement.classList.remove('_checked');
    });

    // Очищаем радио-кнопки
    const radios = wrapper.querySelectorAll('[data-filters-body] input[type="radio"]');
    radios.forEach(radio => {
        radio.checked = false;
        radio.dataset.wasChecked = "false";
        radio.closest('.filters__item').classList.remove('_checked');
    });

    // Обновляем состояние кнопок и счетчиков
    updateButtonState(wrapper);
    updateCount(wrapper);
    updateGlobalFiltersCount();
  }


  function updateCount(wrapper) {
      const inputs = wrapper.querySelectorAll('[data-filters-body] input[type="checkbox"]:checked, [data-filters-body] input[type="radio"]:checked');
      const count = inputs.length;
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
  
  function updateGlobalFiltersCount() {
    const popupFilters = document.querySelector('.popup-body-filters');
    if (!popupFilters) return;

    const allCheckedInputs = popupFilters.querySelectorAll('[data-filters-body] input[type="checkbox"]:checked, [data-filters-body] input[type="radio"]:checked');
    const countElement = popupFilters.querySelector('.popup-body-filters__header .filters__count span');
    const footer = popupFilters.querySelector('[data-filters-footer-types]');
    const clearButton = footer ? footer.querySelector('.filters__clear') : null;
    const showButton = footer ? footer.querySelector('.filters__show') : null;

    const selectedCount = allCheckedInputs.length;
    if (countElement) {
        countElement.textContent = `(${selectedCount})`;
        if (selectedCount > 0) {
            countElement.parentElement.classList.add('_show');
        } else {
            countElement.parentElement.classList.remove('_show');
        }
    }

    if (clearButton) clearButton.disabled = selectedCount === 0;
    if (showButton) showButton.disabled = selectedCount === 0;
  }
  
  updateGlobalFiltersCount();
  
  function clearGlobalFilters() {
      const popupFilters = document.querySelector('.popup-body-filters');
      if (!popupFilters) return;
  
      // Очищаем чекбоксы
      const allInputs = popupFilters.querySelectorAll('[data-filters-body] input[type="checkbox"]');
      allInputs.forEach(input => {
          input.checked = false;
          input.parentElement.classList.remove('_checked');
      });
  
      // Очищаем радио-кнопки
      const allRadios = popupFilters.querySelectorAll('[data-filters-body] input[type="radio"]');
      allRadios.forEach(radio => {
          radio.checked = false;
          radio.dataset.wasChecked = "false";
          radio.closest('.filters__item').classList.remove('_checked');
      });
  
      updateGlobalFiltersCount();
  }
  

   // Инициализация классов _checked для уже выбранных input
  document.querySelectorAll('[data-filters-wrapper]').forEach(wrapper => {
    const selectedInputs = wrapper.querySelectorAll('[data-filters-body] input[type="checkbox"]:checked, [data-filters-body] input[type="radio"]:checked');
    selectedInputs.forEach(input => {
        const parentElement = input.closest('.filters__item');
        parentElement.classList.add('_checked');
        input.dataset.wasChecked = "true"; // Запоминаем, что радио активно
    });

    updateButtonState(wrapper);
    updateCount(wrapper);
  });
  
  

  

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
      let moreButton, moreSubMenu, clickHandler, outsideClickHandler;
      function openPopupFiltersWrapper(e) {
          if (e.matches) {
              moreButton = document.querySelector('.sub-header__link_more');
              if (moreButton) {
                  moreSubMenu = moreButton.nextElementSibling;

                  // Удаляем старые обработчики, если они есть
                  moreButton.removeEventListener('click', clickHandler);
                  document.removeEventListener('click', outsideClickHandler);
              
                  // Создаём новые обработчики с привязкой
                  clickHandler = function(event) {
                      event.stopPropagation();
                      moreButton.classList.toggle('is-open');
                      moreSubMenu.classList.toggle('is-open');
                  };
                
                  outsideClickHandler = function(event) {
                      if (!moreSubMenu.contains(event.target) && !moreButton.contains(event.target)) {
                          moreButton.classList.remove('is-open');
                          moreSubMenu.classList.remove('is-open');
                      }
                  };
                
                  // Добавляем обработчики событий
                  moreButton.addEventListener('click', clickHandler);
                  document.addEventListener('click', outsideClickHandler);
              }
          } else {
              // Если ширина меньше 700px, очищаем обработчики, чтобы они не мешали
              if (moreButton) {
                  moreButton.removeEventListener('click', clickHandler);
                  document.removeEventListener('click', outsideClickHandler);
              }
          }
      }

      openPopupFiltersWrapper(mediaQuery700min);
      mediaQuery700min.addEventListener('change', openPopupFiltersWrapper);




      

      // Подсчет симолов в заголовке CERTIFICATE-CARD =================
      function adjustCardTitleFontSize() {
          const titles = document.querySelectorAll('.card-certificate__title');
      
          titles.forEach(title => {
              if (mediaQuery480max.matches) {
                  if (title.textContent.trim().length > 35) {
                      title.style.fontSize = '11px';
                  } else {
                      title.style.fontSize = ''; 
                  }
              } else {
                  title.style.fontSize = ''; 
              }
          });
      }
      adjustCardTitleFontSize();
      mediaQuery480max.addEventListener('change', adjustCardTitleFontSize);


   
      // == GALLERY -- card page ======================
      const mainGalleryImage = document.querySelector('[data-gallery-main] img');
      const galleryButtons = document.querySelectorAll('[data-gallery-button] img');
      galleryButtons.forEach(button => {
          button.addEventListener('click', function () {
              let currentMainSrc = mainGalleryImage.src;
              mainGalleryImage.src = button.src;
              button.src = currentMainSrc;
          });
      });
      // ============================

      

      // Робота з чекбоксами, кнопками підтвердження, відкриття попапу #popupRules;
      const popupRules = document.getElementById("popupRules");
      const popupBody = popupRules.querySelector(".popup-body-rules");
      const popupMain = popupRules.querySelector(".popup-body-rules__main");
      const popupContent = popupRules.querySelector(".popup-body-rules__content");
      const confirmButton = popupRules.querySelector("[data-card-confirm]");
      const checkboxRules = document.querySelector("[data-checkbox-rules]");
      const addButton = document.querySelector("[data-card-add]");
      let isCheckedThroughPopup = false;
      let isAddButtonHandlerActive = false;
  
      function openPopup(event) {
          event.preventDefault();
          flsModules.popup.open('#popupRules');
      }
  
      function updateAddButtonState() {
          if (!checkboxRules) return
          if (!mediaQuery480max.matches) {
              if (checkboxRules.checked) {
                  addButton.removeAttribute("disabled");
              } else {
                  addButton.setAttribute("disabled", "true");
              }
          }
      }
  
      function handleAddButtonClick(event) {
          if (mediaQuery480max.matches) {
              openPopup(event);
          }
      }
  
      function checkMediaQuery() {
        if (!addButton) return
          if (mediaQuery480max.matches) {
              addButton.removeAttribute("disabled");
              if (!isAddButtonHandlerActive) {
                  addButton.addEventListener("click", handleAddButtonClick);
                  isAddButtonHandlerActive = true;
              }
          } else {
              updateAddButtonState();
          }
      }
  
      if (checkboxRules) {
          checkboxRules.addEventListener("click", function (event) {
              if (!isCheckedThroughPopup) {
                  event.preventDefault();
                  openPopup(event);
              } else {
                  isCheckedThroughPopup = false;
                  updateAddButtonState();
              }
          });
      }
  
      if (popupContent && confirmButton) {
        popupContent.addEventListener("scroll", function () {
            if (popupContent.scrollTop > 5) {
              popupBody.classList.add("_scroll-active");
            } else {
              popupBody.classList.remove("_scroll-active");
            }
    
            const isScrolledToEnd = popupContent.scrollTop + popupContent.clientHeight >= popupContent.scrollHeight - 1;
            if (isScrolledToEnd) {
                confirmButton.removeAttribute("disabled");
                popupBody.classList.add("_scroll-end");
            } else {
              popupBody.classList.remove("_scroll-end");
            }
        });
      }
    
      confirmButton.addEventListener("click", function () {
          if (checkboxRules) {
              checkboxRules.checked = true;
              isCheckedThroughPopup = true;
              updateAddButtonState();
              if (mediaQuery480max.matches) {
                  addButton.removeEventListener("click", handleAddButtonClick);
                  isAddButtonHandlerActive = false;
              }
              setTimeout(() => {
                  flsModules.popup.close('#popupRules');
              }, 100);
          }
      });
  
        mediaQuery480max.addEventListener("change", checkMediaQuery);
        checkMediaQuery(); 
        updateAddButtonState(); 
      // ==================================================================













      
  

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
  const siteLang = document.documentElement.lang.slice(0, 2);
  let language;

  switch (siteLang) {
    case "ru":
      language = ru;
      break;
    case "uk":
      language = uk;
      break;
    default:
      language = null;
  }

  intlTelInputs.forEach((input) => {
    const iti = window.intlTelInput(input, {
      initialCountry: "auto",
      geoIpLookup: (callback) => {
        fetch("https://ipapi.co/json")
          .then((res) => res.json())
          .then((data) => callback(data.country_code))
          .catch(() => callback("us"));
      },
      strictMode: true,
      separateDialCode: true,
      nationalMode: true,
      formatOnDisplay: true,
      i18n: language,
      useFullscreenPopup: window.innerWidth <= 480.98,
      customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
        return selectedCountryPlaceholder.replace(/\d/g, "X").replace(/\s/g, "-");
      }
    });

    function updateNoResultsMessage(searchInput, dropdownContent) {
      if (!dropdownContent) return;

      const countryList = dropdownContent.querySelector(".iti__country-list");
      const noResultsMessage = dropdownContent.querySelector(".iti__a11y-text");

      if (!noResultsMessage || !countryList) return;

      const observer = new MutationObserver(() => {
        const isEmpty = countryList.querySelectorAll(".iti__country").length === 0;
        noResultsMessage.classList.toggle("display-block", isEmpty);
      });

      observer.observe(countryList, { childList: true });

      setTimeout(() => {
        const isEmpty = countryList.querySelectorAll(".iti__country").length === 0;
        noResultsMessage.classList.toggle("display-block", isEmpty);
      }, 0);
    }

    function attachSearchInputListener(itiInstance) {
      setTimeout(() => {
        const dropdownContent = itiInstance.countryList.parentElement; 
        if (!dropdownContent) return;

        const searchInput = dropdownContent.querySelector(".iti__search-input");
        if (searchInput) {
          searchInput.addEventListener("input", () => updateNoResultsMessage(searchInput, dropdownContent));
        }
      }, 100);
    }

    input.addEventListener("countrychange", () => attachSearchInputListener(iti));
    attachSearchInputListener(iti);
    
    


    // кастомный класс если совпадает выбранная страна со странной из списка
    let previousSelectedCountry = null;
    function updateSelectedClass() {
        const selectedCountry = iti.getSelectedCountryData();
        const newSelectedElement = document.querySelector(`.iti__country[data-dial-code="${selectedCountry.dialCode}"]`);

        if (previousSelectedCountry) {
            previousSelectedCountry.classList.remove("_selected");
        }

        if (newSelectedElement) {
            newSelectedElement.classList.add("_selected");
            previousSelectedCountry = newSelectedElement; 
        }
    }

    input.addEventListener("countrychange", updateSelectedClass);
    updateSelectedClass();

    const inputParentPopup = input.closest(".popup");
    let dropdownOpened = false;
    const popupBody = document.querySelector("#popupIti .popup__body");

    if (iti.options.useFullscreenPopup && popupBody) {
      iti.options.dropdownContainer = popupBody;

      if (typeof iti._openDropdown === "function" && typeof iti._closeDropdown === "function") {
        const originalShowDropdown = iti._openDropdown;
        const originalCloseDropdown = iti._closeDropdown;

        iti._openDropdown = function () {
          if (!dropdownOpened) {
            dropdownOpened = true;
            flsModules.popup.open("#popupIti", { keepParentOpen: !!inputParentPopup });

            setTimeout(() => {
              originalShowDropdown.call(iti);
              updateSelectedClass();
            }, 50);
          }
        };

        iti._closeDropdown = function () {
          if (dropdownOpened) {
            dropdownOpened = false;
            originalCloseDropdown.call(iti);

            // Проверяем, открыт ли `#popupIti`, прежде чем его закрыть
            if (document.querySelector("#popupIti.popup_show")) {
              setTimeout(() => {
                flsModules.popup.close("#popupIti", { keepParentOpen: !!inputParentPopup });
              }, 50);
            }
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

        // Очищаем обработчики при уничтожении `iti`
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
let timePickers = [];

function getLocalizedMonths(lang) {
  const defaultMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (locales[lang] && locales[lang].months) || defaultMonths;
}

function getLocalizedRolldateText(lang, isTime = false) {
  const translations = {
    'uk': { title: isTime ? 'Вибрати час' : 'Вибрати дату', cancel: 'Відмінити', confirm: 'Вибрати' },
    'ru': { title: isTime ? 'Выбрать время' : 'Выбрать дату', cancel: 'Отменить', confirm: 'Выбрать' },
    'en': { title: isTime ? 'Select time' : 'Select date', cancel: 'Cancel', confirm: 'Confirm' }
  };
  return translations[lang] || translations['en']; // Если нет перевода — используем 'en'
}


function toggleDatepicker(e) {
  if (e.matches) {
    if (dp) { dp.destroy(); dp = null; }
    if (tp) { tp.destroy(); tp = null; }

    timePickers.forEach(picker => picker?.remove?.());
    timePickers = [];

    if (!rd && document.querySelector(datepickerSelector)) {
      rd = new Rolldate({
        el: datepickerSelector,
        format: 'DD/MM/YYYY',
        beginYear: 1920,
        endYear: 2050,
        minStep: 1,
        typeMonth: 'text',
        localeMonth: getLocalizedMonths(currentLang),
        lang: getLocalizedRolldateText(currentLang, false),
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
      rt = new Rolldate({
          el: timepickerSelector,
          format: timeFormat,
          minStep: 1,
          lang: getLocalizedRolldateText(currentLang, true),
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

    flsModules.popup.close('#popupRolldate');

    if (!dp && document.querySelector(datepickerSelector)) {
      dp = new AirDatepicker(datepickerSelector, {
        // autoClose: true,
        // inline: true,
        dateFormat: 'dd.MM.yyyy',
        minDate: '01.01.1900',
        locale: locales[currentLang] || locales['en'],
        onShow: function(isFinished) {
          if (!isFinished || !dp.$el) return;
          const parent = dp.$el.parentElement; 
          if (parent) parent.classList.add('_show-picker');
        },
        onHide: function(isFinished) {
          if (!isFinished || !dp.$el) return;
          const parent = dp.$el.parentElement; 
          if (parent) parent.classList.remove('_show-picker');
        }
    
      });

    }

    document.querySelectorAll(timepickerSelector).forEach((input) => {
      const format = input.dataset.format === "12" ? 12 : 24;
      const picker = createTimePicker(input, format);
      timePickers.push(picker);
    });
  }
}

const mediaQuery = window.matchMedia('(max-width: 30.061em)');
mediaQuery.addEventListener('change', toggleDatepicker);
toggleDatepicker(mediaQuery);


// timepicker for inputs with data-datepicker-time attribute
function createTimePicker(input, format = 24) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("timepicker");
  
  const body = document.createElement("div");
  body.classList.add("timepicker__body");
  if (format === 12) body.classList.add("_am-pm");

  // Hour block
  const hourBlock = createTimeBlock("hours", format === 12 ? 12 : 24, (value) => {
    updateTime(input, value, "hour", format);
  });

  // Minute block
  const minuteBlock = createTimeBlock("minutes", 60, (value) => {
    updateTime(input, value, "minute", format);
  });

  body.appendChild(hourBlock);
  body.appendChild(createSeparator());
  body.appendChild(minuteBlock);

  // AM/PM block (only for 12-hour format)
  let amPmBlock = null;
  if (format === 12) {
    amPmBlock = createTimeBlock("am-pm", 2, (value) => {
      updateTime(input, value, "ampm", format);
    }, ["AM", "PM"]);
    body.appendChild(createSeparator());
    body.appendChild(amPmBlock);
  }

  wrapper.appendChild(body);
  document.body.appendChild(wrapper);

  input.addEventListener("focus", () => showTimePicker(input, wrapper));
  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target) && e.target !== input) {
      wrapper.style.display = "none";
    }
  });
  window.addEventListener("resize", () => {
    wrapper.style.display = "none";
  });
}

function createTimeBlock(type, max, callback, labels = null) {
  const block = document.createElement("div");
  block.classList.add("timepicker__block", type);

  const item = document.createElement("div");
  item.classList.add("timepicker__item");

  const selected = document.createElement("div");
  selected.classList.add("timepicker__selected");
  selected.textContent = labels ? labels[0] : "00";

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("timepicker__open", "icon-arrow-down");
  button.addEventListener("click", () => toggleList(list, item));

  item.appendChild(selected);
  item.appendChild(button);
  block.appendChild(item);

  const list = document.createElement("ul");
  list.classList.add("timepicker__list");
  list.style.height = "0";
  
  for (let i = 0; i < max; i++) {
    const li = document.createElement("li");
    const value = labels ? labels[i] : i.toString().padStart(2, "0");
    li.textContent = value;
    li.dataset.value = labels ? labels[i] : i;
    li.addEventListener("click", () => {
      callback(li.dataset.value);
      selected.textContent = value;
      list.style.height = "0";
      list.classList.remove("open");
      item.classList.remove("open");
    });
    list.appendChild(li);
  }
  block.appendChild(list);
  return block;
}

function createSeparator() {
  const separator = document.createElement("div");
  separator.classList.add("timepicker__sep");
  separator.textContent = ":";
  return separator;
}

function showTimePicker(input, wrapper) {
  const rect = input.getBoundingClientRect();
  wrapper.style.top = `${rect.bottom + window.scrollY}px`;
  wrapper.style.left = `${rect.left + window.scrollX}px`;
  wrapper.style.display = "block";
}

function toggleList(list, item) {
  list.classList.toggle("open");
  item.classList.toggle("open");
  list.style.height = list.classList.contains("open") ? "148px" : "0";
}

function updateTime(input, value, type, format) {
  let [hours, minutes] = input.value ? input.value.split(":" ).map(num => isNaN(num) ? 0 : Number(num)) : [0, 0];
  let ampm = "AM";

  if (format === 12) {
    const parts = input.value.split(" ");
    if (parts.length === 2) ampm = parts[1];
  }

  if (type === "hour") {
    hours = parseInt(value);
    if (format === 12 && ampm === "PM" && hours !== 12) hours += 12;
    if (format === 12 && ampm === "AM" && hours === 12) hours = 0;
  }
  if (type === "minute") minutes = parseInt(value) || 0;
  if (type === "ampm") ampm = value;

  if (format === 12) {
    let displayHour = hours % 12 || 12;
    input.value = `${displayHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  } else {
    input.value = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }
}
// == end of timepicker


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



// document.addEventListener("DOMContentLoaded", () => {
//   const stickyFooter = document.querySelector("[data-sticky-parent]");
//   const stickyFooterEl = document.querySelector("[data-sticky-el]");
//   const mediaQuery480max = window.matchMedia("(max-width: 30.061em)");

//   if (!stickyFooter || !stickyFooterEl) return;

//   let lastState = null;
//   const threshold = 5;

//   const checkSticky = () => {
//       const footerRect = stickyFooter.getBoundingClientRect();
//       const windowHeight = window.innerHeight;

//       const isBelowViewport = footerRect.bottom > windowHeight + threshold;
//       const isAboveViewport = footerRect.bottom < windowHeight - threshold;
//       const isExactMatch = Math.abs(footerRect.bottom - windowHeight) <= threshold;

//       if (isExactMatch) return;

//       if (isBelowViewport && lastState !== true) {
//           lastState = true;
//           stickyFooterEl.classList.add("_fixed");
//       } else if (isAboveViewport && lastState !== false) {
//           lastState = false;
//           stickyFooterEl.classList.remove("_fixed");
//       }
//   };

//   const handleMediaChange = (event) => {
//       if (event.matches) {
//           window.addEventListener("scroll", checkSticky, { passive: true });
//           checkSticky();
//       } else {
//           window.removeEventListener("scroll", checkSticky);
//           stickyFooterEl.classList.remove("_fixed");
//       }
//   };

//   mediaQuery480max.addEventListener("change", handleMediaChange);
//   handleMediaChange(mediaQuery480max);
// });
