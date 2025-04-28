// Підключення функціоналу "Чортоги Фрілансера"
import { isMobile, FLS } from "../files/functions.js";
import { flsModules } from "../files/modules.js";
import { formValidate } from "../files/forms/forms.js";


let _slideUpSelect = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');

    target.style.transitionProperty = 'height, padding, margin';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${target.offsetHeight}px`;
    target.style.paddingTop = `${target.style.paddingTop || 0}`;
    target.style.paddingBottom = `${target.style.paddingBottom || 0}`;
    target.style.marginTop = `${target.style.marginTop || 0}`;
    target.style.marginBottom = `${target.style.marginBottom || 0}`;
    target.offsetHeight; // форсируем перерисовку

    target.style.overflow = 'hidden';
    target.style.height = '0px';
    target.style.paddingTop = '0px';
    target.style.paddingBottom = '0px';
    target.style.marginTop = '0px';
    target.style.marginBottom = '0px';

    window.setTimeout(() => {
      // После схлопывания height/padding/margin сразу без transition прячем opacity и visibility
      target.style.removeProperty('transition-property');
      target.style.removeProperty('transition-duration');
      target.style.opacity = '0';
      target.style.visibility = 'hidden';
      target.style.pointerEvents = 'none';

      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.classList.remove('_slide');
      document.dispatchEvent(new CustomEvent("slideUpDone", { detail: { target } }));
    }, duration);
  }
};

let _slideDownSelect = (target, duration = 500, maxHeight = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');

    // Мгновенно показываем
    target.style.opacity = '1';
    target.style.visibility = 'visible';
    target.style.pointerEvents = 'auto';

    target.style.removeProperty('height');
    let height = target.offsetHeight;
    target.style.height = '0px';
    target.style.paddingTop = '0px';
    target.style.paddingBottom = '0px';
    target.style.marginTop = '0px';
    target.style.marginBottom = '0px';
    target.offsetHeight; // рефлоу

    if (maxHeight > 0) {
      height = Math.min(height, maxHeight);
    }

    target.style.transitionProperty = 'height, padding, margin';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;
    target.style.paddingTop = '';
    target.style.paddingBottom = '';
    target.style.marginTop = '';
    target.style.marginBottom = '';

    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-property');
      target.style.removeProperty('transition-duration');
      target.classList.remove('_slide');
      document.dispatchEvent(new CustomEvent("slideDownDone", { detail: { target } }));
    }, duration);
  }
};

let _slideToggleSelect = (target, duration = 500, maxHeight = 0) => {
  const computedStyle = window.getComputedStyle(target);
  if (parseFloat(computedStyle.opacity) === 0 || target.style.height === '0px') {
    return _slideDownSelect(target, duration, maxHeight);
  } else {
    return _slideUpSelect(target, duration);
  }
};



// Підключення файлу стилів
// Базові стилі полягають у src/scss/forms.scss
// Файл базових стилів src/scss/forms/select.scss

/*
Документація:
Сніппет (HTML): sel
*/
/*
// Налаштування
Для селекту (select):
class="ім'я класу" - модифікатор до конкретного селекту
multiple - мультивибір
data-class-modif= "ім'я модифікатора"
data-tags - режим тегів, тільки для (тільки для multiple)
data-scroll - увімкнути прокручування для списку, що випадає, додатково можна підключити кастомний скролл simplebar в app.js. Зазначене число для атрибуту обмежить висоту
data-checkbox - стилізація елементів по checkbox (тільки для multiple)
data-show-selected - вимикає приховування вибраного елемента
data-search - дозволяє шукати по списку, що випадає
data-open - селект відкритий відразу
data-submit - відправляє форму при зміні селекту

data-one-select - селекти всередині оболонки з атрибутом показуватимуться лише по одному
data-pseudo-label - додає псевдоелемент до заголовка селекту із зазначеним текстом

Для плейсхолдера (Плейсхолдер – це option з value=""):
data-label для плейсхолдера, додає label до селекту
data-show для плейсхолдера, показує його у списку (тільки для одиничного вибору)

Для елемента (option):
data-class="ім'я класу" - додає клас
data-asset="шлях до картинки або текст" - додає структуру 2х колонок та даними
data-href="адреса посилання" - додає посилання в елемент списку
data-href-blank - відкриє посилання у новому вікні
*/

/*
// Можливі доопрацювання:
попап на мобілці
*/

// Клас побудови Select
class SelectConstructor {
	constructor(props, data = null) {
		let defaultConfig = {
			init: true,
			// logging: true,
			speed: 150
		}
		this.config = Object.assign(defaultConfig, props);
		// CSS класи модуля
		this.selectClasses = {
			classSelect: "select", // Головний блок
			classSelectBody: "select__body", // Тіло селекту
			classSelectTitle: "select__title", // Заголовок
			classSelectValue: "select__value", // Значення у заголовку
			classSelectLabel: "select__label", // Лабел
			classSelectInput: "select__input", // Поле введення
			classSelectText: "select__text", // Оболонка текстових даних
			classSelectLink: "select__link", // Посилання в елементі
			classSelectOptions: "select__options", // Випадаючий список
			classSelectOptionsScroll: "select__scroll", // Оболонка при скролі
			classSelectOption: "select__option", // Пункт
			classSelectContent: "select__content", // Оболонка контенту в заголовку
			classSelectRow: "select__row", // Ряд
			classSelectData: "select__asset", // Додаткові дані
			classSelectDisabled: "_select-disabled", // Заборонено
			classSelectTag: "_select-tag", // Клас тега
			classSelectOpen: "_select-open", // Список відкритий
			classSelectActive: "_select-active", // Список вибрано
			classSelectFocus: "_select-focus", // Список у фокусі
			classSelectMultiple: "_select-multiple", // Мультивибір
			classSelectCheckBox: "_select-checkbox", // Стиль чекбоксу
			classSelectOptionSelected: "_select-selected", // Вибраний пункт
			classSelectIcon: "icon-check", // Клас іконочого шрифту
			classSelectPseudoLabel: "_select-pseudo-label", // Псевдолейбл
		}
		this._this = this;
		// Запуск ініціалізації
		if (this.config.init) {
			// Отримання всіх select на сторінці
			const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
			if (selectItems.length) {
				this.selectsInit(selectItems);
			} 
		}
	}
	// Конструктор CSS класу
	getSelectClass(className) {
		return `.${className}`;
	}
	// Геттер елементів псевдоселекту
	getSelectElement(selectItem, className) {
		return {
			originalSelect: selectItem.querySelector('select'),
			selectElement: selectItem.querySelector(this.getSelectClass(className)),
		}
	}
	// Функція ініціалізації всіх селектів
	selectsInit(selectItems) {
		selectItems.forEach((originalSelect, index) => {
			this.selectInit(originalSelect, index + 1);
		});
		// Обробники подій...
		// ...при кліку
		document.addEventListener('click', function (e) {
			this.selectsActions(e);
		}.bind(this));
		// ...при натисканні клавіші
		document.addEventListener('keydown', function (e) {
			this.selectsActions(e);
		}.bind(this));
		// ...при фокусі
		document.addEventListener('focusin', function (e) {
			this.selectsActions(e);
		}.bind(this));
		// ...при втраті фокусу
		document.addEventListener('focusout', function (e) {
			this.selectsActions(e);
		}.bind(this));
	}
	// Функція ініціалізації конкретного селекту
	selectInit(originalSelect, index) {
		const _this = this;
		// Створюємо оболонку
		let selectItem = document.createElement("div");
		selectItem.classList.add(this.selectClasses.classSelect);
		// Виводимо оболонку перед оригінальним селектом
		originalSelect.parentNode.insertBefore(selectItem, originalSelect);
		// Поміщаємо оригінальний селект в оболонку
		selectItem.appendChild(originalSelect);
		// Приховуємо оригінальний селект
		originalSelect.hidden = true;
		// Привласнюємо унікальний ID
		index ? originalSelect.dataset.id = index : null;

		// Робота з плейсхолдером
		if (this.getSelectPlaceholder(originalSelect)) {
			// Запам'ятовуємо плейсхолдер
			originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
			// Якщо увімкнено режим label
			if (this.getSelectPlaceholder(originalSelect).label.show) {
				const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
				selectItemTitle.insertAdjacentHTML('afterbegin', `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
			}
		}
		// Конструктор основних елементів

		// ИЗМЕНЕНИЯ
		selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div style="opacity: 0;pointer-events: none; visibility: hidden" class="${this.selectClasses.classSelectOptions}"></div></div>`);
		// selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);

		// Запускаємо конструктор псевдоселекту
		this.selectBuild(originalSelect);

		// Запам'ятовуємо швидкість
		originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
		this.config.speed = +originalSelect.dataset.speed;

		// Подія при зміні оригінального select
		originalSelect.addEventListener('change', function (e) {
			_this.selectChange(e);
		});
	}
	// Конструктор псевдоселекту
	selectBuild(originalSelect) {
		const selectItem = originalSelect.parentElement;
		// Додаємо ID селекту
		selectItem.dataset.id = originalSelect.dataset.id;
		// Отримуємо клас оригінального селекту, створюємо модифікатор та додаємо його
		originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
		// Якщо множинний вибір, додаємо клас
		originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
		// Cтилізація елементів під checkbox (тільки для multiple)
		originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
		// Сеттер значення заголовка селекту
		this.setSelectTitleValue(selectItem, originalSelect);
		// Сеттер елементів списку (options)
		this.setOptions(selectItem, originalSelect);
		// Якщо увімкнено опцію пошуку data-search, запускаємо обробник
		originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
		// Якщо вказано налаштування data-open, відкриваємо селект
		originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;
		// Обробник disabled
		this.selectDisabled(selectItem, originalSelect);
	}
	// Функція реакцій на події
	selectsActions(e) {
		const targetElement = e.target;
		const targetType = e.type;
		if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
			const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			if (targetType === 'click') {
				if (!originalSelect.disabled) {
					if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
						// Обробка кліка на тег
						const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
						const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
						this.optionAction(selectItem, originalSelect, optionItem);
					} else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
						// Обробка кліка на заголовок селекту
						this.selectAction(selectItem);
					} else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
						// Обробка кліка на елемент селекту
						const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
						this.optionAction(selectItem, originalSelect, optionItem);
					}
				}
			} else if (targetType === 'focusin' || targetType === 'focusout') {
				if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
					targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
				}
			} else if (targetType === 'keydown' && e.code === 'Escape') {
				this.selectsСlose();
			}
		} else {
			this.selectsСlose();
		}
	}
	// Функція закриття всіх селектів
	selectsСlose(selectOneGroup) {
		const selectsGroup = selectOneGroup ? selectOneGroup : document;
		const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
		if (selectActiveItems.length) {
			selectActiveItems.forEach(selectActiveItem => {
				this.selectСlose(selectActiveItem);
			});
		}
	}
	// Функція закриття конкретного селекту
	selectСlose(selectItem) {
		const originalSelect = this.getSelectElement(selectItem).originalSelect;
		const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
		if (!selectOptions.classList.contains('_slide')) {
			selectItem.classList.remove(this.selectClasses.classSelectOpen);
			_slideUpSelect(selectOptions, originalSelect.dataset.speed);
			setTimeout(() => {
				selectItem.style.zIndex = '';
			}, originalSelect.dataset.speed);
		}
	}
	// Функція відкриття/закриття конкретного селекту
	selectAction(selectItem) {
		const originalSelect = this.getSelectElement(selectItem).originalSelect;
		const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
		const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;


		// Визначаємо, де видобразити випадаючий список
		this.setOptionsPosition(selectItem);

		// Якщо селективи розміщені в елементі з дата атрибутом data-one-select
		// закриваємо усі відкриті селекти
		if (originalSelect.closest('[data-one-select]')) {
			const selectOneGroup = originalSelect.closest('[data-one-select]');
			this.selectsСlose(selectOneGroup);
		}

		setTimeout(() => {
			if (!selectOptions.classList.contains('_slide')) {
				selectItem.classList.toggle(this.selectClasses.classSelectOpen);
				_slideToggleSelect(selectOptions, originalSelect.dataset.speed);

				if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
					selectItem.style.zIndex = selectOpenzIndex;
				} else {
					setTimeout(() => {
						selectItem.style.zIndex = '';
					}, originalSelect.dataset.speed);
				}
			}
		}, 0);
	}
	// Сеттер значення заголовка селекту
	setSelectTitleValue(selectItem, originalSelect) {
		// Перед обновлением заголовка снова скрываем `_nothing-found`, если он есть
	const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
	const nothingFoundOption = selectItemOptions.querySelector(`.${this.selectClasses.classSelectOption}._nothing-found`);

	if (nothingFoundOption && !originalSelect.hasAttribute('data-searching')) {
    nothingFoundOption.hidden = true;
	}


		const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
		const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
		if (selectItemTitle) selectItemTitle.remove();
		selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
		originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
	}
	// Конструктор значення заголовка
	getSelectTitleValue(selectItem, originalSelect) {
		// Отримуємо вибрані текстові значення
		let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
		// Обробка значень мультивибору
		// Якщо увімкнено режим тегів (вказано налаштування data-tags)
		if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
			selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`).join('');
			// Якщо виведення тегів у зовнішній блок
			if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
				document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
				if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
			}
		}
		// Значення або плейсхолдер
		selectTitleValue = selectTitleValue.length ? selectTitleValue : (originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '');
		// Якщо увімкнено режим pseudo
		let pseudoAttribute = '';
		let pseudoAttributeClass = '';
		if (originalSelect.hasAttribute('data-pseudo-label')) {
			pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
			pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
		}
		// Якщо є значення, додаємо клас
		this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
		// Повертаємо поле введення для пошуку чи текст
		if (originalSelect.hasAttribute('data-search')) {
			// Виводимо поле введення для пошуку
			return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
		} else {
			// Якщо вибрано елемент зі своїм класом
			const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : '';
			// Виводимо текстове значення
			return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
		}
	}
	// Конструктор даних для значення заголовка
	getSelectElementContent(selectOption) {
		// Якщо для елемента вказано виведення картинки чи тексту, перебудовуємо конструкцію
		const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
		const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
		let selectOptionContentHTML = ``;
		selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
		selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
		selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
		selectOptionContentHTML += selectOptionData ? `</span>` : '';
		selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
		selectOptionContentHTML += selectOption.textContent;
		selectOptionContentHTML += selectOptionData ? `</span>` : '';
		selectOptionContentHTML += selectOptionData ? `</span>` : '';
		return selectOptionContentHTML;
	}
	// Отримання даних плейсхолдера
	getSelectPlaceholder(originalSelect) {
		const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
		if (selectPlaceholder) {
			return {
				value: selectPlaceholder.textContent,
				show: selectPlaceholder.hasAttribute("data-show"),
				label: {
					show: selectPlaceholder.hasAttribute("data-label"),
					text: selectPlaceholder.dataset.label
				}
			}
		}
	}
	// Отримання даних із вибраних елементів
	getSelectedOptionsData(originalSelect, type) {
		//Отримуємо всі вибрані об'єкти з select
		let selectedOptions = [];
		if (originalSelect.multiple) {
			// Якщо мультивибір
			// Забираємо плейсхолдер, отримуємо решту вибраних елементів
			selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
		} else {
			// Якщо одиничний вибір
			selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
		}
		return {
			elements: selectedOptions.map(option => option),
			values: selectedOptions.filter(option => option.value).map(option => option.value),
			html: selectedOptions.map(option => this.getSelectElementContent(option))
		}
	}
	// Конструктор елементів списку
	getOptions(originalSelect) {
		// Налаштування скролла елементів
		const selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
		const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
		// Отримуємо елементи списку
		let selectOptions = Array.from(originalSelect.options);
		if (selectOptions.length > 0) {
			let selectOptionsHTML = ``;
			// Якщо вказано налаштування data-show, показуємо плейсхолдер у списку
			if ((this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) || originalSelect.multiple) {
				selectOptions = selectOptions.filter(option => option.value);
			}
			// Будуємо та виводимо основну конструкцію
			selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ''} class="${this.selectClasses.classSelectOptionsScroll}">`;
			selectOptions.forEach(selectOption => {
				// Отримуємо конструкцію конкретного елемента списку
				selectOptionsHTML += this.getOption(selectOption, originalSelect);
			});
			selectOptionsHTML += `</div>`;
			return selectOptionsHTML;
		}
	}
	getOption(selectOption, originalSelect) {
    // Якщо елемент вибрано та увімкнено режим мультивибору, додаємо клас
    let selectOptionSelected = '';
    if (selectOption.selected && originalSelect.multiple) {
        selectOptionSelected = ` ${this.selectClasses.classSelectOptionSelected}`;
    }
    
    // Якщо елемент вибраний і немає налаштування data-show-selected, приховуємо елемент
    let selectOptionHide = '';
    if (selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple) {
			selectOptionHide = `hidden`;
    }
		
		 // Якщо елемент вибраний і є налаштування data-show-selected додаємо йому класс classSelectOptionSelected
		let selectOptionSelectedClass = '';
		if (selectOption.selected && originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple) {
			selectOptionSelectedClass = ` ${this.selectClasses.classSelectOptionSelected} ${this.selectClasses.classSelectIcon}`;
		}

    // Якщо для елемента зазначений клас додаємо
    let selectOptionClass = '';
    if (selectOption.dataset.class) {
        selectOptionClass = ` ${selectOption.dataset.class}`;
    }
    
    // Якщо вказано режим посилання
    let selectOptionLink = false;
    if (selectOption.dataset.href) {
        selectOptionLink = selectOption.dataset.href;
    }
    
    let selectOptionLinkTarget = '';
    if (selectOption.hasAttribute('data-href-blank')) {
        selectOptionLinkTarget = `target="_blank"`;
    }

		 // Проверяем наличие data-disabled и создаем нужную разметку
		 let disabledText = selectOption.dataset.disabled ? `<span class="select__disabled">${selectOption.dataset.disabled}</span>` : '';
    
    // Будуємо та повертаємо конструкцію елемента
    let selectOptionHTML = ``;
    if (selectOptionLink) {
        selectOptionHTML += `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}${selectOptionSelectedClass}">`;
    } else {
        selectOptionHTML += `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}${selectOptionSelectedClass}" data-value="${selectOption.value}" type="button">`;
    }
	
	
    selectOptionHTML += this.getSelectElementContent(selectOption);
		selectOptionHTML += disabledText; // Добавляем span с текстом, если есть data-disabled
    
    if (selectOptionLink) {
        selectOptionHTML += `</a>`;
    } else {
        selectOptionHTML += `</button>`;
    }
    
    return selectOptionHTML;
	}
	// Сеттер елементів списку (options)
	setOptions(selectItem, originalSelect) {
		// Отримуємо об'єкт тіла псевдоселекту
		const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
		// Запускаємо конструктор елементів списку (options) та додаємо в тіло псевдоселекту
		selectItemOptions.innerHTML = this.getOptions(originalSelect);

		  // Скрываем `_nothing-found` после генерации списка
			const nothingFoundOption = selectItemOptions.querySelector(`.${this.selectClasses.classSelectOption}._nothing-found`);
			if (nothingFoundOption) {
					nothingFoundOption.hidden = true;
			}
	}
	// Визначаємо, де видобразити випадаючий список
	setOptionsPosition(selectItem) {
		const originalSelect = this.getSelectElement(selectItem).originalSelect;
		const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
		const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
		const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
		const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;

		if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
			// selectOptions.hidden = false;

			// ИЗМЕНЕНИЯ
			selectOptions.style.opacity = 0;
			selectOptions.style.visibility = 'hidden';
			selectOptions.style.pointerEvents = 'none';
			// ====

			const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue('max-height'));
			const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
			const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
			// selectOptions.hidden = true;

			const selectItemHeight = selectItem.offsetHeight;
			const selectItemPos = selectItem.getBoundingClientRect().top;
			const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
			const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);

			if (selectItemResult < 0) {
				const newMaxHeightValue = selectOptionsHeight + selectItemResult;
				if (newMaxHeightValue < 100) {
					selectItem.classList.add('select--show-top');
					selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
				} else {
					selectItem.classList.remove('select--show-top');
					selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
				}
			}
		} else {
			setTimeout(() => {
				selectItem.classList.remove('select--show-top');
				selectItemScroll.style.maxHeight = customMaxHeightValue;
			}, +originalSelect.dataset.speed);
		}
	}
	// Обробник кліку на пункт списку
	optionAction(selectItem, originalSelect, optionItem) {
		const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
		if (!selectOptions.classList.contains('_slide')) {
			if (originalSelect.multiple) { // Якщо мультивибір
				// Виділяємо класом елемент
				optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
				// Очищаємо вибрані елементи
				const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
				originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
					originalSelectSelectedItem.removeAttribute('selected');
				});
				// Вибираємо елементи 
				const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
				selectSelectedItems.forEach(selectSelectedItems => {
					originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
				});
			} else { // Якщо одиничний вибір
				 // Якщо вказано data-show-selected, спочатку знімаємо попередній вибір
				 if (originalSelect.hasAttribute('data-show-selected')) {
					const prevSelected = selectItem.querySelector(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
					if (prevSelected) {
							prevSelected.classList.remove(this.selectClasses.classSelectOptionSelected);
							prevSelected.classList.remove(this.selectClasses.classSelectIcon);
					}
				}

				// Якщо не вказано налаштування data-show-selected, приховуємо вибраний елемент
				if (!originalSelect.hasAttribute('data-show-selected')) {
					setTimeout(() => {
						// Спочатку все показати
						if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
							selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
						}
						// Приховуємо вибрану
						optionItem.hidden = true;
					}, this.config.speed);
				} else {
					optionItem.classList.add(this.selectClasses.classSelectOptionSelected);
					optionItem.classList.add(this.selectClasses.classSelectIcon);
				}
				originalSelect.value = optionItem.hasAttribute('data-value') ? optionItem.dataset.value : optionItem.textContent;
				this.selectAction(selectItem);
			}
			//Оновлюємо заголовок селекту
			this.setSelectTitleValue(selectItem, originalSelect);

			// Убеждаемся, что `_nothing-found` скрыт после выбора опции
			const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			const nothingFoundOption = selectItemOptions.querySelector(`.${this.selectClasses.classSelectOption}._nothing-found`);
			if (nothingFoundOption) {
			    nothingFoundOption.hidden = true;
			}

			// Дополнительно убираем класс `_nothing-found_` у `select__body`
			const selectBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
			selectBody.classList.remove('_nothing-found_');




			// Викликаємо реакцію на зміну селекту
			this.setSelectChange(originalSelect);
		}
	}
	// Реакція на зміну оригінального select
	selectChange(e) {
		const originalSelect = e.target;
		this.selectBuild(originalSelect);
		this.setSelectChange(originalSelect);
	}
	// Обробник зміни у селекті
	setSelectChange(originalSelect) {
		// Миттєва валідація селекту
		if (originalSelect.hasAttribute('data-validate')) {
			formValidate.validateInput(originalSelect);
		}
		// При зміні селекту надсилаємо форму
		if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
			let tempButton = document.createElement("button");
			tempButton.type = "submit";
			originalSelect.closest('form').append(tempButton);
			tempButton.click();
			tempButton.remove();
		}
		const selectItem = originalSelect.parentElement;
		// Виклик коллбек функції
		this.selectCallback(selectItem, originalSelect);
	}
	// Обробник disabled
	selectDisabled(selectItem, originalSelect) {
		if (originalSelect.disabled) {
			selectItem.classList.add(this.selectClasses.classSelectDisabled);
			this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
		} else {
			selectItem.classList.remove(this.selectClasses.classSelectDisabled);
			this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
		}
	}
// Обробник пошуку за елементами списку
searchActions(selectItem) {
	const originalSelect = this.getSelectElement(selectItem).originalSelect;
	const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
	const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
	const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);

	// Работа с data-select-input если есть родитель с атрибутом data-select-enter
	const parentWithEnter = selectItem.closest('[data-select-enter]');
	const hiddenInput = parentWithEnter ? parentWithEnter.querySelector('[data-select-input]') : null;

	const _this = this;
	selectInput.addEventListener("input", function () {
		// Фиксируем, что сейчас выполняется поиск
		originalSelect.setAttribute('data-searching', 'true');

		let hasVisibleOptions = false;
		const nothingFoundOption = selectOptions.querySelector(`.${_this.selectClasses.classSelectOption}._nothing-found`);
		const selectBody = _this.getSelectElement(selectItem, _this.selectClasses.classSelectBody).selectElement;
	
			selectOptionsItems.forEach(selectOptionsItem => {
				if (selectOptionsItem.classList.contains('_nothing-found')) return; // Игнорируем _nothing-found
				if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) {
						selectOptionsItem.hidden = false;
						hasVisibleOptions = true;
				} else {
						selectOptionsItem.hidden = true;
				}
		});


		// якщо є схований інпут передаємо йому введене значення
		if (hiddenInput) {
			hiddenInput.value = selectInput.value;
		}

		// Если нет видимых элементов, показываем "_nothing-found"
		if (nothingFoundOption) {
			if (!hasVisibleOptions) {
					nothingFoundOption.hidden = false;
					selectBody.classList.add('_nothing-found_');
			} else {
					nothingFoundOption.hidden = true;
					selectBody.classList.remove('_nothing-found_');
			}
		}
	
		// Якщо список закритий відкриваємо
		// selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
		if (selectOptions.hidden) {
			_this.selectAction(selectItem);
		}
	});
	// Додатково обробник для вибору опції
	selectOptionsItems.forEach(selectOptionsItem => {
		selectOptionsItem.addEventListener("click", function () {
				// якщо є схований інпут передаємо йому вибране зі списку значення
			if (hiddenInput) {
				hiddenInput.value = selectOptionsItem.textContent;
			}
				// Після вибору опції очищаємо атрибут hidden для всіх
			setTimeout(() => {
				selectOptionsItems.forEach(item => {
					if (!item.classList.contains('_nothing-found')) {
            item.hidden = false;
        	}
				});
			}, 300);
		});
	});
	// якщо є схований інпут передаємо йому значення при втраті фокусу
	if (hiddenInput) {
		selectInput.addEventListener("blur", function () {
			hiddenInput.value = selectInput.value;
		});
	}
}



	// Коллбек функція
	selectCallback(selectItem, originalSelect) {
		document.dispatchEvent(new CustomEvent("selectCallback", {
			detail: {
				select: originalSelect
			}
		}));
	}
}
// Запускаємо та додаємо в об'єкт модулів
flsModules.select = new SelectConstructor({});


