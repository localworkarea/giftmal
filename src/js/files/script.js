import { isMobile, bodyLockToggle, bodyUnlock, bodyLock, bodyLockStatus, _slideToggle, _slideUp, _slideDown, closeAllMessages, showMessage} from "./functions.js";

import { flsModules } from "./modules.js";

import { initAllNotifications } from '../modules/notifications.js';

document.addEventListener("DOMContentLoaded", () => {

  const mediaQuery920min = window.matchMedia('(min-width: 57.561em)');
  const mediaQuery920max = window.matchMedia('(max-width: 57.561em)');
  const mediaQuery900min = window.matchMedia('(min-width: 56.311em)');
  const mediaQuery900max = window.matchMedia('(max-width: 56.311em)');
  const mediaQuery700max = window.matchMedia('(max-width: 43.811em)');
  const mediaQuery700min = window.matchMedia('(min-width: 43.811em)');
  const mediaQuery480max = window.matchMedia('(max-width: 30.061em)');
  const mediaQuery480min = window.matchMedia('(min-width: 30.061em)');


    const formatNumb = wNumb({
      thousand: " ", // Разделитель тысячных
      decimals: 0,    // Округление до целых
      mark: "." // Разделитель целой и дробной части
  });

  document.querySelectorAll(".numb").forEach((el) => {
      let num = parseFloat(el.textContent.replace(/\s+/g, ""));
      if (!isNaN(num)) {
          el.textContent = formatNumb.to(num);
      }
  });

  const formatNumbDecimals = wNumb({
    thousand: " ", // Разделитель тысячных
    decimals: 2,   // Округление до копеек
    mark: "."      // Разделитель целой и дробной части
  });

  document.querySelectorAll(".numb-dec").forEach((el) => {
    let num = parseFloat(el.textContent.replace(/\s+/g, ""));
    if (!isNaN(num)) {
        el.textContent = formatNumbDecimals.to(num);
    }
  });



  const checkoutPage = document.querySelector('.checkout');
  const certificateAccount = document.querySelector('.certificate-account');
  const cardPage = document.querySelector('.card');
  const catalogPage = document.querySelector('.catalog');
  if (checkoutPage) {
    document.documentElement.classList.add('checkout-page');
  }
  if (certificateAccount) {
    document.documentElement.classList.add('account-page');
  }
  if (cardPage) {
    document.documentElement.classList.add('card-page');
  }
  if (catalogPage) {
    document.documentElement.classList.add('catalog-page');
  }




  // == Add picture to the radio button Checkout page =============================================
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
  

  // == add class _more-content ----------------------
  const checkoutBodies = document.querySelectorAll('.orders-checkout__body');
  checkoutBodies.forEach(body => {
    const parent = body.closest('.orders-checkout__wrapper_main');
    if (parent) {
      if (body.scrollHeight > body.clientHeight) {
        body.classList.add('_more-content');
      } else {
        body.classList.remove('_more-content');
      }
    }
  });
  





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
    
  
    // let lastWidth = window.innerWidth;
    // let resizeTimeout;
    // window.addEventListener('resize', () => {
    //   const currentWidth = window.innerWidth;
    //   if (currentWidth !== lastWidth) {
    //     clearTimeout(resizeTimeout);

    //     resizeTimeout = setTimeout(() => {
  
    //       updateOrderCheckoutElHeights();
          
    //       lastWidth = currentWidth;
    //     }, 0);
    //   }
    // });

  
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
              _slideToggle(spollerBody, 200, 0, 270);
  
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

      

      // Робота з чекбоксами, кнопками підтвердження, відкриття попапу #popupRules
      // Card Page, Account Page ----
      document.querySelectorAll(".popup-rules-item").forEach((popupRules) => {
        const popupBody = popupRules.querySelector(".popup-body-rules");
        const popupContent = popupRules.querySelector(".popup-body-rules__content");
        const confirmButton = popupRules.querySelector("[data-card-confirm]");
        const checkboxRules = document.querySelector("[data-checkbox-rules]");
        const addButton = document.querySelector("[data-card-add]");
    
        if (!popupBody || !popupContent) return; // Если ключевые элементы отсутствуют, пропускаем этот попап
    
        let isCheckedThroughPopup = false;
        let isAddButtonHandlerActive = false;
    
        function openPopup(event) {
            event.preventDefault();
            flsModules.popup.open(`#${popupRules.id}`);
        }
    
        function updateAddButtonState() {
            if (!checkboxRules || !addButton) return;
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
            if (!addButton) return;
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
    
        popupContent.addEventListener("scroll", function () {
            if (popupContent.scrollTop > 5) {
                popupBody.classList.add("_scroll-active");
            } else {
                popupBody.classList.remove("_scroll-active");
            }
    
            const isScrolledToEnd = popupContent.scrollTop + popupContent.clientHeight >= popupContent.scrollHeight - 1;
            if (isScrolledToEnd) {
                if (confirmButton) {
                  confirmButton.removeAttribute("disabled");
                }
                popupBody.classList.add("_scroll-end");
            } else {
                popupBody.classList.remove("_scroll-end");
            }
        });
    
        if (!confirmButton) return;
        confirmButton.addEventListener("click", function () {
            if (!checkboxRules) return;
            checkboxRules.checked = true;
            isCheckedThroughPopup = true;
            updateAddButtonState();
            if (mediaQuery480max.matches) {
                addButton?.removeEventListener("click", handleAddButtonClick);
                isAddButtonHandlerActive = false;
            }
            setTimeout(() => {
                flsModules.popup.close(`#${popupRules.id}`);
            }, 100);
        });
    
        mediaQuery480max.addEventListener("change", checkMediaQuery);
        checkMediaQuery();
        updateAddButtonState();
      });
    
    
      // ==================================================================



      // Search an History Balance (Account Balance Page) =====================
      const bodyHistory = document.querySelector(".popup-history");
      const listContainer = bodyHistory.querySelector(".popup-history__list");
      const filterButtonsHistory = bodyHistory.querySelectorAll(".popup-history__filter-btn");
      const searchInput = bodyHistory.querySelector("#historyBalanceSearch");
      const searchInputWrapper = searchInput.closest(".popup-history__search");
      const wrapper = bodyHistory.querySelector(".popup-history__wrapper");
      const noCardMessage = bodyHistory.querySelector(".popup-history__no-card");
      const allFilterButton = bodyHistory.querySelector('.popup-history__filter-btn[data-history="all"]');
      const pagination = bodyHistory.querySelector(".pagging");
      const paginationLinks = bodyHistory.querySelectorAll(".pagging__item, .pagging__arrow");

      let jsonData = [];

      // Медиа-запрос для отслеживания изменений ширины экрана
      const mediaQuery = window.matchMedia("(max-width: 30.061em)");

      // Функция рендера списка
      function renderList(data) {
        listContainer.innerHTML = "";

        // Проверяем, ограничивать ли вывод элементов
        const displayedData = mediaQuery.matches ? data : data.slice(0, 8);
      
        displayedData.forEach(item => {
          const li = document.createElement("li");
          li.classList.add("popup-history__item", `_${item.status}`);
        
          li.innerHTML = `
            <div class="popup-history__cell cell-code">${item.code}</div>
            <div class="popup-history__cell cell-denomination">${item.denomination} грн</div>
            <div class="popup-history__cell cell-activation">${item.activation}</div>
            <div class="popup-history__cell cell-status row-icon">${item.statusText}</div>
            <div class="popup-history__cell cell-date">${item.date}</div>
          `;
        
          listContainer.appendChild(li);
        });
      
        // Управляем видимостью при поиске
        if (data.length === 0) {
          wrapper.style.display = "none";
          pagination.style.display = "none";
          noCardMessage.style.display = "block";
          searchInputWrapper.classList.add("_error");
        } else {
          wrapper.style.display = "block";
          pagination.style.display = "flex";
          noCardMessage.style.display = "none";
          searchInputWrapper.classList.remove("_error");
        }
      }

      // Загружаем JSON
      fetch("files/history-balance/history.json")
        .then(response => response.json())
        .then(data => {
          jsonData = data;
          renderList(jsonData);
        })
        .catch(error => console.error("Ошибка загрузки JSON:", error));
      
      // Фильтрация по статусу
      filterButtonsHistory.forEach(button => {
        button.addEventListener("click", () => {
          filterButtonsHistory.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");
        
          const filterValue = button.getAttribute("data-history");
        
          if (filterValue === "all") {
            renderList(jsonData);
          } else {
            const filteredData = jsonData.filter(item => item.status === filterValue);
            renderList(filteredData);
          }
        });
      });

      // Поиск по номеру карты
      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
      
        if (searchTerm === "") {
          renderList(jsonData);
          searchInputWrapper.classList.remove("_error");
        
          // Возвращаем активную кнопку на "all"
          filterButtonsHistory.forEach(btn => btn.classList.remove("active"));
          allFilterButton.classList.add("active");
        
          return;
        }
      
        const filteredData = jsonData.filter(item => item.code.toLowerCase().includes(searchTerm));
        renderList(filteredData);
      });

      // Предотвращаем закрытие попапа для пагинации внутри pop-up
      paginationLinks.forEach(link => {
        link.addEventListener("click", event => {
          event.preventDefault();
          event.stopPropagation();
        });
      });

      // Отслеживаем изменение медиазапроса и обновляем список при смене режима
      mediaQuery.addEventListener("change", () => {
        renderList(jsonData);
      });



      // == ITEM-ORDERS SPOLLERS =================================
      const itemOrderMore = document.querySelectorAll('.item-order__more');
      const itemOrder = document.querySelectorAll('.item-order');
      
      // -- инициализация спойлеров внутри itemOrder ---
      itemOrder.forEach(body => {
        const itemOrderBody = body.querySelector('.item-order__body');
        _slideUp(itemOrderBody, 0);
        body.classList.add("_init-spoller");
      });

      itemOrderMore.forEach(button => {
        button.addEventListener('click', (event) => {
          const orderItem = event.target.closest('.item-order');
          const body = orderItem.querySelector('.item-order__body');
    
          if (body.hidden) {
            _slideDown(body, 350); 
            orderItem.classList.add("_open");
          } else {
            _slideUp(body, 350); 
            orderItem.classList.remove("_open");
          }
        });
      });



      // ======================================================================
      // == Account page - Certificates =====================================
      // -- change Main/Used Certificates --

      const mainWrapper = document.querySelector(".certificate-account__wrapper--main");
      const usedWrapper = document.querySelector(".certificate-account__wrapper--used");
      const switchBtn = document.querySelector(".certificate-account__switch");
      const backBtn = document.querySelector(".certificate-account__title--used");
      const tabsNavigation = document.querySelector("[data-tabs-titles]");
      const modalButtons2 = document.querySelectorAll("[data-modal]");
      
      // Функция переключения на использованные сертификаты
      function showUsedTab() {
        resetSelection(mainWrapper);
        mainWrapper.hidden = true;
        usedWrapper.hidden = false;
        attachEvents(usedWrapper);
      }
      
      // Функция переключения на главную вкладку
      function showMainTab() {
        resetSelection(usedWrapper);
        mainWrapper.hidden = false;
        usedWrapper.hidden = true;
        attachEvents(mainWrapper);
      }
      
      // Функция проверки активного состояния
      function isSelectionActive(wrapper) {
        return wrapper.querySelectorAll(".item-cert._checked").length > 0;
      }
      
      // Функция обновления количества выбранных сертификатов
      function updateSelectedCount(wrapper) {
        const countElement = wrapper.querySelector(".text-count span");
        const selectedCount = wrapper.querySelectorAll(".item-cert._checked").length;
        if (countElement) countElement.textContent = selectedCount;
      }
      
      // Функция установки активного состояния
      function activateSelection(wrapper) {
        const itemCerts = wrapper.querySelectorAll(".item-cert");
        const headerCheckbox = wrapper.querySelector(".header-checkbox");
        const selectContainer = wrapper.querySelector(".select-certificate");
      
        itemCerts.forEach(item => item.classList.add("_item-active"));
        headerCheckbox.classList.add("_items-active");
        selectContainer.classList.add("_active");
      
        updateSelectedCount(wrapper);
      }
      
      // Функция сброса активного состояния
      function resetSelection(wrapper) {
        if (!wrapper) return;
      
        const itemCerts = wrapper.querySelectorAll(".item-cert");
        const headerCheckbox = wrapper.querySelector(".header-checkbox");
        const selectContainer = wrapper.querySelector(".select-certificate");
        const selectAllCheckbox = headerCheckbox?.querySelector(".checkbox__input");
      
        itemCerts.forEach(item => {
          item.classList.remove("_item-active", "_checked");
          item.querySelector(".checkbox__input").checked = false;
        });
      
        headerCheckbox.classList.remove("_items-active");
        selectContainer.classList.remove("_active");
        if (selectAllCheckbox) selectAllCheckbox.checked = false;
      
        updateSelectedCount(wrapper);
      }
      
      // Функция обработки клика по айтему
      function handleItemClick(event) {
        if (event.target.closest(".item-cert__download, .item-cert__modal, .checkbox")) return;
      
        const wrapper = event.currentTarget.closest(".certificate-account__wrapper");
        const item = event.currentTarget;
        const checkbox = item.querySelector(".checkbox__input");
      
        activateSelection(wrapper);
      
        checkbox.checked = !checkbox.checked;
        item.classList.toggle("_checked", checkbox.checked);
      
        updateSelectedCount(wrapper);
      
        if (!isSelectionActive(wrapper)) {
          resetSelection(wrapper);
        }
      }
      
      // Функция обработки клика по чекбоксу
      function handleCheckboxClick(event) {
        event.stopPropagation();
      
        const wrapper = event.currentTarget.closest(".certificate-account__wrapper");
        const checkbox = event.target;
        const item = checkbox.closest(".item-cert");
      
        activateSelection(wrapper);
      
        item.classList.toggle("_checked", checkbox.checked);
        updateSelectedCount(wrapper);
      
        if (!isSelectionActive(wrapper)) {
          resetSelection(wrapper);
        }
      }
      
      // Функция выделения всех айтемов
      function toggleSelectAll(event) {
        const wrapper = event.currentTarget.closest(".certificate-account__wrapper");
        const itemCerts = wrapper.querySelectorAll(".item-cert");
        const selectAllCheckbox = wrapper.querySelector(".header-checkbox .checkbox__input");
      
        const isChecked = selectAllCheckbox.checked;
        itemCerts.forEach(item => {
          const checkbox = item.querySelector(".checkbox__input");
          item.classList.toggle("_checked", isChecked);
          checkbox.checked = isChecked;
        });
      
        if (isChecked) {
          activateSelection(wrapper);
        } else {
          resetSelection(wrapper);
        }
      
        updateSelectedCount(wrapper);
      }
      
      // Функция обработки клика по кнопке выбора сертификатов
      function handleSelectButtonClick(event) {
        const wrapper = event.currentTarget.closest(".certificate-account__wrapper");
      
        if (!isSelectionActive(wrapper)) {
          activateSelection(wrapper);
          return;
        }
      
        const button = event.currentTarget;
        const msgSelector = button.getAttribute("data-account-msg");
        if (msgSelector) showMessage(msgSelector);

        const tippyButton = wrapper.querySelector(".certificate-account__switch [data-tippy-content]");
        if (tippyButton && tippyButton._tippy) {
          tippyButton._tippy.show();
      
          setTimeout(() => {
            tippyButton._tippy.hide();
          }, 4000);
        }
      }
      
      // Функция сброса при переключении вкладок
      function handleTabSwitch(event) {
        const clickedTab = event.target.closest(".tabs-account__btn");
        if (!clickedTab) return;
      
        if (!clickedTab.classList.contains("tab-3")) {
          resetSelection(mainWrapper);
          resetSelection(usedWrapper);
        }
      }
      
      // Функция навешивания событий внутри активного контейнера
      function attachEvents(wrapper) {
        if (!wrapper) return;
      
        const itemCerts = wrapper.querySelectorAll(".item-cert");
        const selectBtn = wrapper.querySelector(".select-certificate__btn");
        const selectAllCheckbox = wrapper.querySelector(".header-checkbox .checkbox__input");
      
        if (!itemCerts.length) return;
      
        if (selectBtn) selectBtn.addEventListener("click", handleSelectButtonClick);
        if (selectAllCheckbox) selectAllCheckbox.addEventListener("change", toggleSelectAll);
      
        itemCerts.forEach(item => {
          const checkbox = item.querySelector(".checkbox__input");
          if (!mediaQuery920max.matches) item.addEventListener("click", handleItemClick);
          if (checkbox) checkbox.addEventListener("click", handleCheckboxClick);
        });
      }
      
      // Отключение кликов по айтемам при изменении ширины
      function toggleItemClickEvents(isDisabled) {
        const itemCerts = document.querySelectorAll(".item-cert");
      
        itemCerts.forEach(item => {
          if (isDisabled) {
            item.removeEventListener("click", handleItemClick);
          } else {
            item.addEventListener("click", handleItemClick);
          }
        });
      }
      
      // Проверяем ширину экрана при загрузке
      toggleItemClickEvents(mediaQuery920max.matches);
      
      // Слушаем изменения размера экрана
      mediaQuery920max.addEventListener("change", (e) => {
        toggleItemClickEvents(e.matches);
      });
      
      // Обработка data-checked внутри открытого модального окна
      modalButtons2.forEach(button => {
        button.addEventListener("click", function (event) {
          event.stopPropagation();
      
          const modalId = button.getAttribute("data-modal");
          const modal = document.querySelector(modalId);
          if (!modal) return;
      
          activeModal = modal;
          activeButton = button;
      
          const checkedButton = activeModal.querySelector("[data-checked]");
      
          if (checkedButton && !checkedButton.dataset.listener) {
            checkedButton.dataset.listener = "true"; 
            checkedButton.addEventListener("click", function () {
              const parentWrapper = activeButton.closest(".certificate-account__wrapper");
              const isFromMain = parentWrapper?.classList.contains("certificate-account__wrapper--main");
              const targetWrapper = isFromMain ? mainWrapper : usedWrapper;
      
              if (!mediaQuery920max.matches) {
                activateSelection(targetWrapper);
              }
      
              const itemCert = activeButton.closest(".item-cert");
              if (itemCert) {
                const checkbox = itemCert.querySelector(".checkbox__input");
                if (checkbox) {
                  checkbox.checked = true; 
                  itemCert.classList.add("_checked");
      
                  if (!mediaQuery920max.matches) {
                    const fakeEvent = { 
                      target: checkbox, 
                      currentTarget: targetWrapper,
                      stopPropagation: () => {} 
                    };
                    handleCheckboxClick(fakeEvent);
                  }
                }
              }
            });
          }
        });
      });
      
      // Навешиваем обработчики
      attachEvents(mainWrapper);
      if (switchBtn) switchBtn.addEventListener("click", showUsedTab);
      if (backBtn) backBtn.addEventListener("click", showMainTab);
      if (tabsNavigation) tabsNavigation.addEventListener("click", handleTabSwitch);
      










      // -- modal Account page ----------------------------
      const modalButtons = document.querySelectorAll("[data-modal]");
      let activeModal = null;
      let activeButton = null;
      let startY = 0;
      let moveY = 0;

      modalButtons.forEach(button => {
          button.addEventListener("click", function (event) {
              event.stopPropagation();
          
              const modalId = button.getAttribute("data-modal");
              const modal = document.querySelector(modalId);
          
              if (!modal) return;
          
              if (activeModal && activeModal !== modal) {
                  closeModal(activeModal);
              }
            
              if (activeButton && activeButton !== button) {
                  activeButton.classList.remove('_show-modal');
              }
            
              positionModal(modal, button);
            
              modal.style.opacity = "1";
              modal.style.visibility = "visible";
              modal.style.pointerEvents = "auto";
            
              modal.classList.add('_modal-show');
              document.documentElement.classList.add('_show-modal');
            
              activeModal = modal;
              activeButton = button;
            
              if (mediaQuery480max.matches && bodyLockStatus) {
                  bodyLock();
              }
            
              if (mediaQuery480max.matches) {
                  addSwipeToClose(modal);
              }
          });
      });
      document.addEventListener("click", function (event) {
        if (activeModal && !activeModal.contains(event.target)) {
            closeModal(activeModal);
        }
          if (mediaQuery480max.matches && activeModal) {
              const modalWrapper = activeModal.querySelector(".modal-account__wrapper");
              if (event.target === activeModal && !modalWrapper.contains(event.target)) {
                  closeModal(activeModal);
              }
          }
      });

      document.querySelectorAll(".modal-account__close").forEach(closeBtn => {
          closeBtn.addEventListener("click", function () {
              if (activeModal) {
                  closeModal(activeModal);
              }
          });
      });

      function positionModal(modal, button) {
          if (mediaQuery480max.matches) {
              modal.style.top = "";
              modal.style.right = "";
          } else {
              const rect = button.getBoundingClientRect();
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
              modal.style.top = `${rect.bottom + scrollTop + 4}px`;
              modal.style.right = `${window.innerWidth - rect.right}px`;
          }
      }

      function closeModal(modal) {
        modal.style.opacity = "";
        modal.style.visibility = "";
        modal.style.pointerEvents = "";
        setTimeout(() => {
          modal.style.top = "";
          modal.style.right = "";
        }, 300);
      
        modal.classList.remove('_modal-show');
        document.documentElement.classList.remove('_show-modal');
      
        if (activeButton) {
            activeButton.classList.remove('_show-modal');
            activeButton = null;
        }
      
        activeModal = null;
      
        // Если был лок и экран < 480px, снимаем его
        if (mediaQuery480max.matches && document.documentElement.classList.contains('lock')) {
            bodyUnlock();
        }
      
        // Сброс transform
        const modalWrapper = modal.querySelector(".modal-account__wrapper");
        if (modalWrapper) {
            modalWrapper.style.transform = "";
            modalWrapper.style.transition = "";
        }
      }

      // Функция обработки свайпа вниз
      function addSwipeToClose(modal) {
          const modalWrapper = modal.querySelector(".modal-account__wrapper");
          const closeBtn = modal.querySelector(".modal-account__close");
      
          if (!modalWrapper || !closeBtn) return;
      
          closeBtn.addEventListener("touchstart", (e) => {
              startY = e.touches[0].clientY;
              moveY = 0;
          });
        
          closeBtn.addEventListener("touchmove", (e) => {
              moveY = e.touches[0].clientY - startY;
          
              if (moveY > 0) {
                  modalWrapper.style.transform = `translateY(${moveY}px)`;
              }
          });
        
          closeBtn.addEventListener("touchend", () => {
              if (moveY > 30) {
                  closeModal(modal);
              } else {
                setTimeout(() => {
                  modalWrapper.style.transform = "";
                }, 300);
              }
          });
      }

      // Отслеживаем изменение ширины экрана
      mediaQuery480max.addEventListener("change", function () {
          if (!mediaQuery480max.matches && document.documentElement.classList.contains('lock')) {
              bodyUnlock();
          }
          if (activeModal && activeButton) {
              positionModal(activeModal, activeButton);
          }
      });

      



      
      
      // ХОВЕР --------------

      // const modalButtons = document.querySelectorAll("[data-modal]");
      // let activeModal = null;
      // let activeButton = null;
      // let startY = 0;
      // let moveY = 0;
      // let hoverTimeout = null;
      
      // modalButtons.forEach(button => {
      //   if (!mediaQuery480max.matches) {
      //     // Для ПК: Hover (pointerenter)
      //     button.addEventListener("pointerenter", function () {
      //       if (hoverTimeout) clearTimeout(hoverTimeout);
      //       hoverTimeout = setTimeout(() => {
      //         const modalId = button.getAttribute("data-modal");
      //         const modal = document.querySelector(modalId);
      //         if (!modal) return;
      
      //         if (activeModal && activeModal !== modal) {
      //           closeModal(activeModal, () => openModal(modal, button));
      //         } else {
      //           openModal(modal, button);
      //         }
      //       }, 50);
      //     });
      
      //     // Закрываем модалку при уходе курсора с кнопки или с самого модального окна
      //     button.addEventListener("pointerleave", function () {
      //       if (hoverTimeout) clearTimeout(hoverTimeout);
      //       setTimeout(() => {
      //         if (activeModal && !activeModal.matches(":hover") && !activeButton.matches(":hover")) {
      //           closeModal(activeModal);
      //         }
      //       }, 50);
      //     });
      //   } else {
      //     // Для мобильных устройств оставляем click
      //     button.addEventListener("click", function (event) {
      //       event.stopPropagation();
      //       const modalId = button.getAttribute("data-modal");
      //       const modal = document.querySelector(modalId);
      //       if (!modal) return;
      
      //       if (activeModal && activeModal !== modal) {
      //         closeModal(activeModal, () => openModal(modal, button));
      //       } else {
      //         openModal(modal, button);
      //       }
      //     });
      //   }
      // });
      
      // function openModal(modal, button) {
      //   if (activeButton && activeButton !== button) {
      //     activeButton.classList.remove('_show-modal');
      //   }
      
      //   positionModal(modal, button);
      
      //   modal.style.opacity = "1";
      //   modal.style.visibility = "visible";
      //   modal.style.pointerEvents = "auto";
      
      //   modal.classList.add('_modal-show');
      //   button.classList.add('_show-modal'); // Добавляем класс к кнопке
      //   document.documentElement.classList.add('_show-modal');
      
      //   activeModal = modal;
      //   activeButton = button;
      
      //   if (mediaQuery480max.matches && bodyLockStatus) {
      //     bodyLock();
      //   }
      
      //   if (mediaQuery480max.matches) {
      //     addSwipeToClose(modal);
      //   }
      // }

      // function closeModal(modal, callback = null) {
      //   modal.style.opacity = "0";
      //   modal.style.visibility = "hidden";
      //   modal.style.pointerEvents = "none";
      
      //   setTimeout(() => {
      //     modal.style.top = "";
      //     modal.style.right = "";
      //     modal.classList.remove('_modal-show');
      //     document.documentElement.classList.remove('_show-modal');
      
      //     if (activeButton) {
      //       activeButton.classList.remove('_show-modal'); // Убираем класс у кнопки
      //       activeButton = null;
      //     }
      
      //     activeModal = null;
      
      //     if (mediaQuery480max.matches && document.documentElement.classList.contains('lock')) {
      //       bodyUnlock();
      //     }
      
      //     const modalWrapper = modal.querySelector(".modal-account__wrapper");
      //     if (modalWrapper) {
      //       modalWrapper.style.transform = "";
      //       modalWrapper.style.transition = "";
      //     }
      
      //     if (callback) callback();
      //   }, 50);
      // }
      
      // document.addEventListener("click", function (event) {
      //   if (
      //     activeModal &&
      //     !activeModal.contains(event.target) &&
      //     !event.target.closest("[data-modal]")
      //   ) {
      //     closeModal(activeModal);
      //   }
      
      //   if (mediaQuery480max.matches && activeModal) {
      //     const modalWrapper = activeModal.querySelector(".modal-account__wrapper");
      //     if (event.target === activeModal && !modalWrapper.contains(event.target)) {
      //       closeModal(activeModal);
      //     }
      //   }
      // });
      
      // document.querySelectorAll(".modal-account__close").forEach(closeBtn => {
      //   closeBtn.addEventListener("click", function () {
      //     if (activeModal) {
      //       closeModal(activeModal);
      //     }
      //   });
      // });
      
      // function positionModal(modal, button) {
      //   if (mediaQuery480max.matches) {
      //     modal.style.top = "";
      //     modal.style.right = "";
      //   } else {
      //     const rect = button.getBoundingClientRect();
      //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      //     modal.style.top = `${rect.bottom + scrollTop + 4}px`;
      //     modal.style.right = `${window.innerWidth - rect.right}px`;
      //   }
      // }
    
      // function addSwipeToClose(modal) {
      //   const modalWrapper = modal.querySelector(".modal-account__wrapper");
      //   const closeBtn = modal.querySelector(".modal-account__close");
      
      //   if (!modalWrapper || !closeBtn) return;
      
      //   closeBtn.addEventListener("touchstart", (e) => {
      //     startY = e.touches[0].clientY;
      //     moveY = 0;
      //   });
      
      //   closeBtn.addEventListener("touchmove", (e) => {
      //     moveY = e.touches[0].clientY - startY;
      //     if (moveY > 0) {
      //       modalWrapper.style.transform = `translateY(${moveY}px)`;
      //       modalWrapper.style.transition = "none";
      //     }
      //   });
      
      //   closeBtn.addEventListener("touchend", () => {
      //     if (moveY > 30) {
      //       closeModal(modal);
      //     } else {
      //       modalWrapper.style.transition = "transform 0.3s ease-out";
      //       modalWrapper.style.transform = "";
      //     }
      //   });
      // }
      
      // mediaQuery480max.addEventListener("change", function () {
      //   if (!mediaQuery480max.matches && document.documentElement.classList.contains('lock')) {
      //     bodyUnlock();
      //   }
      //   if (activeModal && activeButton) {
      //     positionModal(activeModal, activeButton);
      //   }
      // });



      // -- contacts page, check checkbox i`m not a robot =========
    	const contactsPage = document.querySelector('.contacts');
      const popupCardImg = document.querySelector('.popup-not-robot__card img');
      const checkboxInput = document.querySelector('#contactUsPageAgreement');
      const checkboxLabel = document.querySelector('label[for="contactUsPageAgreement"]');

      if (contactsPage && popupCardImg && checkboxInput && checkboxLabel) {
      	checkboxLabel.addEventListener('click', (e) => {
      		e.preventDefault();
        
      		if (checkboxInput.checked) {
      			checkboxInput.checked = false;
      		} else {
      			flsModules.popup.open('#popupNotRobot');
      		}
      	});
      
      	popupCardImg.addEventListener('click', () => {
      		checkboxInput.checked = true;
      		flsModules.popup.close('#popupNotRobot');
      	});
      }



   




    // Initialize all notifications
    initAllNotifications();

    
  
  

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

const mobileMediaQuery = window.matchMedia('(max-width: 30.061em)');

let dpInstances = [];
let rdInstances = [];
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
  return translations[lang] || translations['en'];
}


function destroyAllDatepickers() {
  dpInstances.forEach(inst => inst.destroy?.());
  dpInstances = [];
}

function destroyAllRolldates() {
  rdInstances.forEach(inst => inst.destroy?.());
  rdInstances = [];
}

function destroyAllTimePickers() {
  timePickers.forEach(p => p?.remove?.());
  timePickers = [];
}

function initDesktopPickers() {
  destroyAllDatepickers();
  destroyAllTimePickers();

  document.querySelectorAll(datepickerSelector).forEach((input) => {
    const dp = new AirDatepicker(input, {
      dateFormat: 'dd.MM.yyyy',
      minDate: '01.01.1900',
      locale: locales[currentLang] || locales['en'],
      onShow(isFinished) {
        if (!isFinished || !dp.$el) return;
        dp.$el.parentElement?.classList.add('_show-picker');
      },
      onHide(isFinished) {
        if (!isFinished || !dp.$el) return;
        dp.$el.parentElement?.classList.remove('_show-picker');
      }
    });
    dpInstances.push(dp);

    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9.]/g, '');
    });

    input.addEventListener('keydown', (e) => {
      const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', '.'
      ];
      if (
        !/[0-9]/.test(e.key) &&
        !allowedKeys.includes(e.key)
      ) {
        e.preventDefault();
      }
    });
  });

  document.querySelectorAll(timepickerSelector).forEach((input) => {
    const format = input.dataset.format === "12" ? 12 : 24;
    const picker = createTimePicker(input, format);
    timePickers.push(picker);

    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9:]/g, '');
    });
  
    input.addEventListener('keydown', (e) => {
      const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', ':'
      ];
      if (
        !/[0-9]/.test(e.key) &&
        !allowedKeys.includes(e.key)
      ) {
        e.preventDefault();
      }
    });
  });
}

function initMobilePickers() {
  destroyAllRolldates();
  destroyAllTimePickers();

  document.querySelectorAll(datepickerSelector).forEach((input) => {
    const rd = new Rolldate({
      el: input,
      format: 'DD/MM/YYYY',
      beginYear: 1920,
      endYear: 2050,
      minStep: 1,
      typeMonth: 'text',
      localeMonth: getLocalizedMonths(currentLang),
      lang: getLocalizedRolldateText(currentLang, false),
      trigger: 'tap',
      init() {
        flsModules.popup.open('#popupRolldate');
      },
      cancel() {
        flsModules.popup.close('#popupRolldate');
      },
      confirm() {
        flsModules.popup.close('#popupRolldate');
      }
    });
    rdInstances.push(rd);
  });

  document.querySelectorAll(timepickerSelector).forEach((input) => {
    const rt = new Rolldate({
      el: input,
      format: ['ru', 'uk'].includes(currentLang) ? 'hh:mm' : 'hh:mm A',
      minStep: 1,
      lang: getLocalizedRolldateText(currentLang, true),
      trigger: 'tap',
      init() {
        flsModules.popup.open('#popupRolldate');
      },
      cancel() {
        flsModules.popup.close('#popupRolldate');
      },
      confirm() {
        flsModules.popup.close('#popupRolldate');
      }
    });
    rdInstances.push(rt);
  });

  document.addEventListener("beforePopupClose", (event) => {
    if (event.detail.popup.targetOpen.selector === "#popupRolldate") {
      rdInstances.forEach(inst => inst?.hide?.());
    }
  });
}

function toggleDatepicker(e) {
  if (e.matches) {
    initMobilePickers();
  } else {
    initDesktopPickers();
  }
}

mobileMediaQuery.addEventListener('change', toggleDatepicker);
toggleDatepicker(mobileMediaQuery);





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

      searchHeader.querySelector('.search__top-link')
        .addEventListener("click", e => {
          e.stopPropagation(); 
          updateUI("top");
        });
      renderList(brands.filter(brand => brand.isTop), true);
    }
  }

  function renderList(items, isTop = false) {
    searchNull.style.display = items.length === 0 ? "block" : "none";
  
    items.forEach(brand => {
      const item = document.createElement("button");
      item.setAttribute("type", "button");
      item.classList.add("search__item");
      if (isTop) item.classList.add("search__item--top");
      item.innerHTML = `
        <img src="${brand.logo}" width="37" height="24" class="search__logo" alt="${brand.name}">
        <span class="search__name">${brand.name}</span>
        <span class="search__icon icon-search"></span>
      `;
      item.addEventListener("click", (e) => {
        e.stopPropagation(); 
        searchInput.value = brand.name;
        searchList.innerHTML = "";
        searchHeader.innerHTML = "";
        searchNull.style.display = "none";
        addToHistory(brand);
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

  function clearHistory(e) {
    e.stopPropagation();
    searchHistory = [];
    localStorage.removeItem("searchHistory");
    updateUI("top");
    searchInput.focus();
  }

  searchInput.addEventListener("focus", () => {
    searchInput.classList.add("_input-focus");
    searchElement.classList.add("_input-focus");
    searchBox.style.pointerEvents = "all";
    if (searchInput.value) {
      searchInput.dispatchEvent(new Event("input"));
    } else {
      updateUI(searchHistory.length > 0 ? "history" : "top");
    }
  });

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

  document.addEventListener("click", (e) => {
    if (!e.target.closest('.search')) {
      closeUI();
    }
  });
});
// == END OF SEARCH INPUTS BRANDS ============================






