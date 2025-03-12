import { isMobile, bodyLockStatus, bodyLock, bodyUnlock, bodyLockToggle, FLS, dataMediaQueries } from "../files/functions.js";
import { flsModules } from "../files/modules.js";

class Popup {
	constructor(options) {
		let config = {
			logging: true,
			init: true,
			//Для кнопок
			attributeOpenButton: 'data-popup', // Атрибут для кнопки, яка викликає попап
			attributeCloseButton: 'data-close', // Атрибут для кнопки, що закриває попап
			// Для сторонніх об'єктів
			fixElementSelector: '[data-lp]', // Атрибут для елементів із лівим паддингом (які fixed)
			// Для об'єкту попапа
			youtubeAttribute: 'data-popup-youtube', // Атрибут для коду youtube
			youtubePlaceAttribute: 'data-popup-youtube-place', // Атрибут для вставки ролика youtube
			setAutoplayYoutube: true,
			// Зміна класів
			classes: {
				popup: 'popup',
				// popupWrapper: 'popup__wrapper',
				popupContent: 'popup__content',
				popupActive: 'popup_show', // Додається для попапа, коли він відкривається
				bodyActive: 'popup-show', // Додається для боді, коли попап відкритий
			},
			focusCatch: true, // Фокус усередині попапа зациклений
			closeEsc: true, // Закриття ESC
			bodyLock: true, // Блокування скролла
			hashSettings: {
				location: true, // Хеш в адресному рядку
				goHash: true, // Перехід по наявності в адресному рядку
			},
			on: { // Події
				beforeOpen: function () { },
				afterOpen: function () { },
				beforeClose: function () { },
				afterClose: function () { },
			},
		}
		this.youTubeCode;
		this.isOpen = false;
		// Поточне вікно
		this.targetOpen = {
			selector: false,
			element: false,
		}
		// Попереднє відкрите
		this.previousOpen = {
			selector: false,
			element: false,
		}
		// Останнє закрите
		this.lastClosed = {
			selector: false,
			element: false,
		}
		this._dataValue = false;
		this.hash = false;

		this._reopen = false;
		this._selectorOpen = false;

		this.lastFocusEl = false;
		this._focusEl = [
			'a[href]',
			'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
			'button:not([disabled]):not([aria-hidden])',
			'select:not([disabled]):not([aria-hidden])',
			'textarea:not([disabled]):not([aria-hidden])',
			'area[href]',
			'iframe',
			'object',
			'embed',
			'[contenteditable]',
			'[tabindex]:not([tabindex^="-"])'
		];
		//this.options = Object.assign(config, options);
		this.options = {
			...config,
			...options,
			classes: {
				...config.classes,
				...options?.classes,
			},
			hashSettings: {
				...config.hashSettings,
				...options?.hashSettings,
			},
			on: {
				...config.on,
				...options?.on,
			}
		}
		this.bodyLock = false;
		this.options.init ? this.initPopups() : null
	}
	initPopups() {
		this.eventsPopup();
	}
	eventsPopup() {
		// Клік по всьому документі
		document.addEventListener("click", function (e) {
			const datepickerContainer = document.querySelector("#air-datepicker-global-container");
			
			// Клік по кнопці "відкрити"
			const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
			if (buttonOpen) {
				e.preventDefault();

				// == якщо є атрибут data-popup-width, визначаємо його значення через функцію dataMediaQueries() та визиваємо відкриття попап тільки на вказанному значені ширині
				const popupWidth = buttonOpen.getAttribute("data-popup-width");
				if (popupWidth) {
						const tempElement = document.createElement("div");
						tempElement.dataset.breakpoint = `${popupWidth},max`;
				
						const mdQueriesArray = dataMediaQueries([tempElement], "breakpoint");
				
						if (mdQueriesArray && mdQueriesArray.length) {
								if (!mdQueriesArray.some(md => md.matchMedia.matches)) {
										return; // Если не соответствует медиа-запросу, прерываем выполнение
								}
						}
				}
				

				this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ?
					buttonOpen.getAttribute(this.options.attributeOpenButton) :
					'error';
				// this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ?? 'error';
				
				if (this._dataValue !== 'error') {
					if (!this.isOpen) this.lastFocusEl = buttonOpen;
					this.targetOpen.selector = `${this._dataValue}`;
					this._selectorOpen = true;
					this.open();
					return;

				}

				return;
			}

			//  Не закрываем попап, если клик по календарю
			 if (datepickerContainer && datepickerContainer.contains(e.target)) {
				return;
			}
		

			// Закриття на порожньому місці (popup__wrapper) та кнопки закриття (popup__close) для закриття
			const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
			if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
				e.preventDefault();
				this.close();
				return;
			}
		}.bind(this));
		// Закриття ESC
		document.addEventListener("keydown", function (e) {
			if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
				e.preventDefault();
				this.close();
				return;
			}
			if (this.options.focusCatch && e.which == 9 && this.isOpen) {
				this._focusCatch(e);
				return;
			}
		}.bind(this))

		// Відкриття по хешу
		if (this.options.hashSettings.goHash) {
			// Перевірка зміни адресного рядка
			window.addEventListener('hashchange', function () {
				if (window.location.hash) {
					this._openToHash();
				} else {
					this.close(this.targetOpen.selector);
				}
			}.bind(this))

			window.addEventListener('load', function () {
				if (window.location.hash) {
					this._openToHash();
				}
			}.bind(this))
		}
	}

	open(selectorValue, options = {}) {
		if (bodyLockStatus) {
			this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
	
			if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") {
				this.targetOpen.selector = selectorValue;
				this._selectorOpen = true;
			}

			if (document.documentElement.classList.contains("menu-open")) {
				document.documentElement.classList.remove("menu-open");
			}
	
			// // **НЕ закрываем предыдущий попап, если передан `keepParentOpen: true`**
			// if (this.isOpen && !options.keepParentOpen) {
			// 	this._reopen = true;
			// 	this.close();
			// }
			// **Не закрываем предыдущий попап, если открывается #popupRolldate**
			if (this.isOpen && !options.keepParentOpen && selectorValue !== "#popupRolldate") {
				this._reopen = true;
				this.close();
			}
	
			this.targetOpen.element = document.querySelector(this.targetOpen.selector);
			if (this.targetOpen.element) {
				if (this.options.hashSettings.location) {
					this._getHash();
					this._setHash();
				}
	
				this.options.on.beforeOpen(this);
				document.dispatchEvent(new CustomEvent("beforePopupOpen", { detail: { popup: this } }));
	
				const popupId = this.targetOpen.element.id;
				if (popupId) {
					document.documentElement.classList.add(`${popupId}-show`);
				}
	
				this.targetOpen.element.classList.add(this.options.classes.popupActive);
				document.documentElement.classList.add(this.options.classes.bodyActive);
	
				if (!this._reopen && !options.keepParentOpen) {
					!this.bodyLock ? bodyLock() : null;
				} else {
					this._reopen = false;
				}
	
				this.previousOpen.selector = this.targetOpen.selector;
				this.previousOpen.element = this.targetOpen.element;
	
				this._selectorOpen = false;
				this.isOpen = true;
	
				setTimeout(() => {
					this._focusTrap();
				}, 50);
	
				this.options.on.afterOpen(this);
				document.dispatchEvent(new CustomEvent("afterPopupOpen", { detail: { popup: this } }));
			}
		}
	}


	close(selectorValue, options = {}) {
    if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") {
        this.previousOpen.selector = selectorValue;
    }

    if (!this.isOpen || !bodyLockStatus) {
        return;
    }

    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent("beforePopupClose", { detail: { popup: this } }));

    if (this.previousOpen.element) {
        const popupId = this.previousOpen.element.id;
        if (popupId) {
            document.documentElement.classList.remove(`${popupId}-show`);
        }
    }

    this.previousOpen.element.classList.remove(this.options.classes.popupActive);

    // Проверяем, остались ли открытые попапы
    const openPopups = document.querySelectorAll(`.${this.options.classes.popupActive}`);
		if (openPopups.length === 0) {
			document.documentElement.classList.remove(this.options.classes.bodyActive);
			!this.bodyLock ? bodyUnlock() : null;
			this.isOpen = false;
		} else {
			
				if ((selectorValue === "#popupIti" || selectorValue === "#popupRolldate") && openPopups.length > 0) {
					this.previousOpen.element = openPopups[openPopups.length - 1];
					this.previousOpen.selector = `#${this.previousOpen.element.id}`;
					this.isOpen = true;
				}
			
				setTimeout(() => {
						this._focusTrap();
				}, 50);
		}
	
    // Очистка стилей контента попапа
    const popupContent = this.previousOpen.element.querySelector(".popup__content");
    if (popupContent) {
        setTimeout(() => {
            popupContent.style.height = "";
        }, 300);
    }

    this._removeHash();

    if (this._selectorOpen) {
        this.lastClosed.selector = this.previousOpen.selector;
        this.lastClosed.element = this.previousOpen.element;
    }

    this.options.on.afterClose(this);
    document.dispatchEvent(new CustomEvent("afterPopupClose", { detail: { popup: this } }));

    this.eventsPopup();
	}


	

	// Отримання хешу 
	_getHash() {
		if (this.options.hashSettings.location) {
			this.hash = this.targetOpen.selector.includes('#') ?
				this.targetOpen.selector : this.targetOpen.selector.replace('.', '#')
		}
	}
	_openToHash() {
		let classInHash = document.querySelector(`.${window.location.hash.replace('#', '')}`) ? `.${window.location.hash.replace('#', '')}` :
			document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` :
				null;

		const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace('.', "#")}"]`);

		if (buttons && classInHash) this.open(classInHash);
	}
	// Встановлення хеша
	_setHash() {
		history.pushState('', '', this.hash);
	}
	_removeHash() {
		history.pushState('', '', window.location.href.split('#')[0])
	}
	_focusCatch(e) {
		const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
		const focusArray = Array.prototype.slice.call(focusable);
		const focusedIndex = focusArray.indexOf(document.activeElement);

		if (e.shiftKey && focusedIndex === 0) {
			focusArray[focusArray.length - 1].focus();
			e.preventDefault();
		}
		if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
			focusArray[0].focus();
			e.preventDefault();
		}
	}

	_focusTrap() {
    if (!this.previousOpen.element) return; // Защита от ошибок, если нет предыдущего попапа

    const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
    
    if (!this.isOpen && this.lastFocusEl) {
        this.lastFocusEl.focus();
    } else if (focusable.length > 0) { // Проверяем, есть ли вообще доступные элементы
        focusable[0].focus();
    }
	}

}
// Запускаємо та додаємо в об'єкт модулів
flsModules.popup = new Popup({});