import { flsModules } from "../modules.js";
import { isMobile, _slideUp, _slideDown, _slideToggle, FLS,showMessage, closeAllMessages } from "../functions.js";
import { gotoBlock } from "../scroll/gotoblock.js";
//================================================================================================================================================================================================================================================================================================================================



// Робота із полями форми.
export function formFieldsInit(options = { viewPass: false, autoHeight: false }) {
	document.body.addEventListener("focusin", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.add('_form-focus');
				targetElement.parentElement.classList.add('_form-focus');
			}
			formValidate.removeError(targetElement);
			targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
	
			// Логика для инпута с классом input-sms
			if (targetElement.classList.contains('input-sms')) {
				initSmsInput(targetElement);
			}
	
			// Убираем disabled для кнопки очистки input__clear, если есть текст
			const clearButton = targetElement.parentElement.querySelector('.input__clear');
			if (clearButton) {
				targetElement.addEventListener('input', () => {
					clearButton.disabled = targetElement.value.length === 0 || targetElement.hasAttribute('readonly');
				});
			}
		}

		// Удаляем ошибку, если Кастомный select получает фокус
		if (targetElement.closest('.select__title') || targetElement.closest('.select__body') || targetElement.closest('.select__value')) {
			const select = targetElement.closest('.select').querySelector('select');
			formValidate.removeError(select); 
		}
	});
	
	document.body.addEventListener("focusout", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.remove('_form-focus');
				targetElement.parentElement.classList.remove('_form-focus');
			}
			// Миттєва валідация
			targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
		}

		// Удаляем ошибку при потере фокуса с Кастомного select
		if (targetElement.closest('.select__title') || targetElement.closest('.select__body') || targetElement.closest('.select__value')) {
			const select = targetElement.closest('.select').querySelector('select');
			formValidate.removeError(select); 
		}

		// Проверяем заполненность формы
		const form = targetElement.closest('form');
		if (form) {
			toggleSubmitButton(form);
		}
	});




	// Инициализация состояния кнопок очистки для всех полей при загрузке
	document.querySelectorAll('.input__sub-item input').forEach(inputElement => {
		const form = inputElement.closest('form');
		if (form) {
			toggleSubmitButton(form);
		}

		const clearButton = inputElement.parentElement.querySelector('.input__clear');
		if (clearButton) {
			clearButton.disabled = inputElement.value.length === 0 || inputElement.hasAttribute('readonly');
		}
	});

	// Обработчик для кнопки очистки
	document.body.addEventListener('click', function (e) {
		if (e.target.classList.contains('input__clear')) {
			const inputElement = e.target.closest('.input__sub-item').querySelector('input');
			if (inputElement) {
				inputElement.value = '';
				e.target.disabled = true;
				inputElement.focus();

				const form = inputElement.closest('form');
				if (form) {
					toggleSubmitButton(form);
				}
			}
		}
	});

	// Обработка полей с атрибутом readonly
	document.querySelectorAll('input[readonly], textarea[readonly]').forEach(inputElement => {
		const subItem = inputElement.parentElement;
		const item = subItem.closest('.input__item');
		const clearButton = subItem.querySelector('.input__clear');

		// Добавляем классы и отключаем кнопку очистки при наличии атрибута readonly
		if (inputElement.hasAttribute('readonly')) {
			inputElement.classList.add('_readonly');
			subItem.classList.add('_readonly');
			if (item) {
				item.classList.add('_readonly');
			}
			if (clearButton) {
				clearButton.disabled = true;
			}
		}

		// Наблюдатель за изменениями атрибута readonly
		const observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.attributeName === 'readonly') {
					if (inputElement.hasAttribute('readonly')) {
						inputElement.classList.add('_readonly');
						subItem.classList.add('_readonly');
						if (item) {
							item.classList.add('_readonly');
						}
						if (clearButton) {
							clearButton.disabled = true;
						}
					} else {
						inputElement.classList.remove('_readonly');
						subItem.classList.remove('_readonly');
						if (item) {
							item.classList.remove('_readonly');
						}
						if (clearButton) {
							clearButton.disabled = inputElement.value.length === 0;
						}
					}
				}
			});
		});
		observer.observe(inputElement, { attributes: true });
	});
		// Якщо увімкнено, додаємо функціонал "Автовисота"
		if (options.autoHeight) {
			const textareas = document.querySelectorAll('textarea[data-autoheight]');
			if (textareas.length) {
				textareas.forEach(textarea => {
					const startHeight = textarea.hasAttribute('data-autoheight-min') ?
						Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
					const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
						Number(textarea.dataset.autoheightMax) : Infinity;
					setHeight(textarea, Math.min(startHeight, maxHeight))
					textarea.addEventListener('input', () => {
						if (textarea.scrollHeight > startHeight) {
							textarea.style.height = `auto`;
							setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
						}
					});
				});
				function setHeight(textarea, height) {
					textarea.style.height = `${height}px`;
				}
			}
		}


	// Форма в попапе #popupAccount
	const formPopupAccount = document.querySelector("form#popupAccountForm");
	if (!formPopupAccount) return;

	const steps = formPopupAccount.querySelectorAll(".cabinet__step");
	const nextButton = formPopupAccount.querySelector(".cabinet__btn-next");
	const prevButton = formPopupAccount.querySelector(".cabinet__subhead");
	const stepIndicator = formPopupAccount.querySelector(".cabinet__txt span");

	if (!steps.length || !nextButton || !prevButton || !stepIndicator) return;

	const firstStep = steps[0];
	const secondStep = steps[1];
	const inputs = firstStep.querySelectorAll("[data-required]");

	function checkInputs() {
	    let isFilled = Array.from(inputs).some(input => input.value.trim() !== "");
	    nextButton.disabled = !isFilled;
	}

	inputs.forEach(input => {
	    input.addEventListener("input", checkInputs);
	});

	nextButton.addEventListener("click", function () {
	    if (formValidate.getErrors(firstStep) === 0) {
	        firstStep.classList.remove("_step-active");
	        secondStep.classList.add("_step-active");
	        prevButton.classList.add("_active"); 
	        stepIndicator.textContent = "2";
	    }
	});

	prevButton.addEventListener("click", function () {
	    secondStep.classList.remove("_step-active");
	    firstStep.classList.add("_step-active");
	    prevButton.classList.remove("_active"); 
	    stepIndicator.textContent = "1";
	    checkInputs();
	});



}

function toggleSubmitButton(form) {
	const submitButton = form.querySelector('button[type="submit"]');
	if (!submitButton) return;

	const wasInitiallyDisabled = submitButton.hasAttribute('disabled');

	// Только текстовые поля и textarea влияют на активацию кнопки
	const inputsForValueCheck = form.querySelectorAll(
		'input[type="text"]:not([readonly]):not([disabled]), ' +
		'input[type="email"]:not([readonly]):not([disabled]), ' +
		'input[type="tel"]:not([readonly]):not([disabled]), ' +
		'textarea:not([readonly]):not([disabled])'
	);

	const hasValue = Array.from(inputsForValueCheck).some(input => input.value.trim() !== '');

	if (wasInitiallyDisabled) {
		submitButton.disabled = !hasValue;

		form.addEventListener("submit", function () {
			// Повторная проверка при сабмите
			const stillHasValue = Array.from(inputsForValueCheck).some(input => input.value.trim() !== '');
			if (!stillHasValue) {
				submitButton.disabled = true;
			}
		});
	}
}



// == РАБОТА С ПОЛЕМ ВВОДА КОДА СМС ==============================
function initSmsInput(inputElement) {
    const smsBody = inputElement.nextElementSibling;
    const charElements = smsBody.querySelectorAll('.input__sms-char');

    function updateCursorPosition(valueLength) {
        charElements.forEach((charEl) => {
            charEl.classList.remove("sms-cursor", "_back");
        });

        // Перемещаем sms-cursor и _back на предыдущий символ, когда символы удаляются
        if (valueLength === 0) {
            charElements[0].classList.add("sms-cursor");
        } else if (valueLength < charElements.length) {
            charElements[valueLength - 1].classList.add("sms-cursor", "_back");
        } else {
            charElements[charElements.length - 1].classList.add("sms-cursor", "_back");
        }
    }

    inputElement.addEventListener('input', () => {
        let value = inputElement.value.replace(/\D/g, "").slice(0, charElements.length);
        inputElement.value = value;

        charElements.forEach((charEl, index) => {
            const charNum = charEl.querySelector('.char-num');
            const charPlaceholder = charEl.querySelector('.char-x');

            if (value[index]) {
                charNum.style.display = 'inline';
                charNum.textContent = value[index];
                charPlaceholder.style.display = 'none';
            } else {
                charNum.style.display = 'none';
                charNum.textContent = '';
                charPlaceholder.style.display = 'inline-block';
            }
        });

        updateCursorPosition(value.length);
    });

    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') {
            setTimeout(() => {
                let valueLength = inputElement.value.length;
                updateCursorPosition(valueLength);
            }, 0);
        }
    });
}

// Валідація форм
export let formValidate = {
	getErrors(form) {
		let error = 0;
		let formRequiredItems = form.querySelectorAll('*[data-required]');
		if (formRequiredItems.length) {
			formRequiredItems.forEach(formRequiredItem => {
				const isVisible = formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT" || formRequiredItem.type === "checkbox";
				if (isVisible && !formRequiredItem.disabled) {
					error += this.validateInput(formRequiredItem);
				}
			});
		}
		return error;
	},
	validateInput(formRequiredItem) {
		let error = 0;
		if (formRequiredItem.dataset.required === "email") {
			formRequiredItem.value = formRequiredItem.value.replace(" ", "");
			if (this.emailTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				this.removeSuccess(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
				this.addSuccess(formRequiredItem);
			}
		} else if (formRequiredItem.dataset.required === "sms") {
			if (!this.smsCodeTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				this.removeSuccess(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
				this.addSuccess(formRequiredItem);
			}
		} else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
			this.addError(formRequiredItem);
			this.removeSuccess(formRequiredItem);
			error++;
		} else {
			if (!formRequiredItem.value.trim()) {
				this.addError(formRequiredItem);
				this.removeSuccess(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
				this.addSuccess(formRequiredItem);
			}
		}
		return error;
	},
	addError(formRequiredItem) {
		formRequiredItem.classList.add('_form-error');
		formRequiredItem.parentElement.classList.add('_form-error');

		let inputError = formRequiredItem.parentElement.querySelector('.form__error');
		if (inputError) formRequiredItem.parentElement.removeChild(inputError);
		if (formRequiredItem.dataset.error) {
			formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
		}
	},
	removeError(formRequiredItem) {
		formRequiredItem.classList.remove('_form-error');
		formRequiredItem.parentElement.classList.remove('_form-error');

		if (formRequiredItem.parentElement.querySelector('.form__error')) {
			formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
		}
	},
	addSuccess(formRequiredItem) {
		formRequiredItem.classList.add('_form-success');
		formRequiredItem.parentElement.classList.add('_form-success');
	},
	removeSuccess(formRequiredItem) {
		formRequiredItem.classList.remove('_form-success');
		formRequiredItem.parentElement.classList.remove('_form-success');
	},
	formClean(form) {
		form.reset();
		setTimeout(() => {
			let inputs = form.querySelectorAll('input,textarea');
			for (let index = 0; index < inputs.length; index++) {
				const el = inputs[index];
				el.parentElement.classList.remove('_form-focus');
				el.classList.remove('_form-focus');
				formValidate.removeError(el);

				// кнопка очистки
				const clearButton = el.parentElement.querySelector('.input__clear');
				if (clearButton) {
					clearButton.disabled = true; 
				}

			}

			// Очистка инпутов типа file
			let fileInputs = form.querySelectorAll('input[type="file"]');
			fileInputs.forEach(fileInput => {
					fileInput.value = ""; 
			
					const previewContainer = fileInput.closest('.add-photo')?.querySelector('.add-photo__img');
					if (previewContainer) {
							previewContainer.innerHTML = "";
							previewContainer.style.display = "none";
					}
			});


			let checkboxes = form.querySelectorAll('.checkbox__input');
			if (checkboxes.length > 0) {
				for (let index = 0; index < checkboxes.length; index++) {
					const checkbox = checkboxes[index];
					checkbox.checked = false;
				}
			}

			let smsInputs = form.querySelectorAll('.input-sms');
			smsInputs.forEach(inputElement => {
				const smsBody = inputElement.nextElementSibling;
				const charElements = smsBody.querySelectorAll('.input__sms-char');

				charElements.forEach(charEl => {
					const charNum = charEl.querySelector('.char-num');
					const charPlaceholder = charEl.querySelector('.char-x'); 

					// Очистка содержимого
					charNum.textContent = '';
					charNum.style.display = 'none';
					charPlaceholder.style.display = 'inline';

					// Восстановление начальных классов
					charEl.classList.add('char-placeholder');
					charEl.classList.remove('sms-cursor');
				});

				// Установка курсора на первую ячейку
				if (charElements.length > 0) {
					charElements[0].classList.add('sms-cursor');
				}
			});



			if (flsModules.select) {
				let selects = form.querySelectorAll('div.select');
				if (selects.length) {
					for (let index = 0; index < selects.length; index++) {
						const select = selects[index].querySelector('select');
						flsModules.select.selectBuild(select);
					}
				}
			}
		}, 0);
	},
	smsCodeTest(formRequiredItem) {
		return /^\d{4}$/.test(formRequiredItem.value);
	},
	emailTest(formRequiredItem) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
	}
	
}

// Снимаем ошибку с инпута чекбокс, если была отметка
document.addEventListener("change", function (e) {
	const target = e.target;
	if (target.matches('input[type="checkbox"][data-required]')) {
		if (target.checked) {
			formValidate.removeError(target);
			formValidate.addSuccess(target);
		} else {
			formValidate.addError(target);
			formValidate.removeSuccess(target);
		}
	}
});

// Відправлення форм
export function formSubmit() {
	const forms = document.forms;
	if (forms.length) {
		for (const form of forms) {
			form.addEventListener('submit', function (e) {
				const form = e.target;
				formSubmitAction(form, e);
			});
			form.addEventListener('reset', function (e) {
				const form = e.target;
				formValidate.formClean(form);
			});
		}
	}
	async function formSubmitAction(form, e) {
		const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
		if (error === 0) {
			const ajax = form.hasAttribute('data-ajax');
			if (ajax) { // Якщо режим ajax
				e.preventDefault();
				const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
				const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
				const formData = new FormData(form);

				form.classList.add('_sending');
				const response = await fetch(formAction, {
					method: formMethod,
					body: formData
				});
				if (response.ok) {
					let responseResult = await response.json();
					form.classList.remove('_sending');
					formSent(form, responseResult);
				} else {
					alert("Помилка");
					form.classList.remove('_sending');
				}
			} else if (form.hasAttribute('data-dev')) {	// Якщо режим розробки
				e.preventDefault();
				formSent(form);
			}
		} else {
			e.preventDefault();
			if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
				const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
				gotoBlock(formGoToErrorClass, true, 1000);
			}
			return;
		}
	}
	// Дії після надсилання форми
	function formSent(form, responseResult = ``) {
		// Створюємо подію відправлення форми
		document.dispatchEvent(new CustomEvent("formSent", {
			detail: {
				form: form
			}
		}));
		// повідомлення для форми на сторінці Account 
		const msgSelector = form.getAttribute("data-account-msg");
		if (msgSelector) {
				showMessage(msgSelector);
		}
		// Показуємо попап, якщо підключено модуль попапів 
		// та для форми вказано налаштування
		setTimeout(() => {
			if (flsModules.popup) {
				const popup = form.dataset.popupMessage;
				popup ? flsModules.popup.open(popup) : null;
			}
		}, 0);
		document.documentElement.classList.add("_form-sent");
		// Очищуємо форму
		formValidate.formClean(form);
	}

}


export function formQuantity() {
	document.addEventListener("click", function (e) {
		let targetElement = e.target;
		if (targetElement.closest('[data-quantity-plus]') || targetElement.closest('[data-quantity-minus]')) {
			const quantityElement = targetElement.closest('[data-quantity]');
			const valueElement = quantityElement.querySelector('[data-quantity-value]');
			const minusButton = quantityElement.querySelector('[data-quantity-minus]');
			const plusButton = quantityElement.querySelector('[data-quantity-plus]');
			let value = parseInt(valueElement.value) || 0;
			const min = valueElement.dataset.quantityMin ? parseInt(valueElement.dataset.quantityMin) : 1;
			const max = valueElement.dataset.quantityMax ? parseInt(valueElement.dataset.quantityMax) : Infinity;

			if (targetElement.hasAttribute('data-quantity-plus')) {
				value = Math.min(value + 1, max);
			} else {
				value = Math.max(value - 1, min);
			}

			valueElement.value = value;
			updateButtonsState(minusButton, plusButton, value, min, max);
		}
	});

	document.querySelectorAll('[data-quantity]').forEach(quantityElement => {
		const valueElement = quantityElement.querySelector('[data-quantity-value]');
		const minusButton = quantityElement.querySelector('[data-quantity-minus]');
		const plusButton = quantityElement.querySelector('[data-quantity-plus]');
		const min = valueElement.dataset.quantityMin ? parseInt(valueElement.dataset.quantityMin) : 1;
		const max = valueElement.dataset.quantityMax ? parseInt(valueElement.dataset.quantityMax) : Infinity;
		updateButtonsState(minusButton, plusButton, parseInt(valueElement.value) || min, min, max);
	});

	document.addEventListener("input", function (e) {
		if (e.target.matches('[data-quantity-value]')) {
			e.target.value = e.target.value.replace(/\D/g, '');
		}
	});
}

function updateButtonsState(minusButton, plusButton, value, min, max) {
	if (minusButton) minusButton.disabled = value <= min;
	if (plusButton) plusButton.disabled = value >= max;
}


// == AMOUNT INPUT (MIN MAX)=======================
export function formAmount() {
	const inputAmount = document.querySelector('[data-amount]');

	if (!inputAmount) {
			return;
	}

	const minEl = document.querySelector('.amount__min');
	const maxEl = document.querySelector('.amount__max');
	const amountBlock = document.querySelector('.amount');

	const minAmount = parseInt(inputAmount.dataset.amountMin, 10);
	const maxAmount = parseInt(inputAmount.dataset.amountMax, 10);

	const formatNumbAmount = wNumb({
			thousand: " ",
			decimals: 0
	});

	function validateAndFormat(input) {
			input.value = input.value.replace(/[^0-9]/g, ''); 
			const value = input.value;
			const numValue = parseInt(value, 10);

			input.classList.remove('_form-error');
			minEl.classList.remove('_form-error');
			maxEl.classList.remove('_form-error');
			amountBlock.classList.remove('_form-error');
			amountBlock.classList.remove('_form-success');
			amountBlock.classList.remove('_form-error-max');

			if (!value) {
					return;
			}

			if (isNaN(numValue)) {
					input.classList.add('_form-error');
					amountBlock.classList.add('_form-error');
					return;
			}

			if (numValue < minAmount) {
					minEl.classList.add('_form-error');
					amountBlock.classList.add('_form-error');
			} else if (numValue > maxAmount) {
					maxEl.classList.add('_form-error');
					amountBlock.classList.add('_form-error');
					amountBlock.classList.add('_form-error-max');
			} else {
					amountBlock.classList.add('_form-success');
			}

			input.value = formatNumbAmount.to(numValue);
	}

	if (inputAmount.value) {
			validateAndFormat(inputAmount);
	}

	inputAmount.addEventListener('input', function() {
			validateAndFormat(inputAmount);
	});
}


// Модуль зіркового рейтингу
export function formRating() {
	// Rating
	const ratings = document.querySelectorAll('[data-rating]');
	if (ratings) {
		ratings.forEach(rating => {
			const ratingValue = +rating.dataset.ratingValue
			const ratingSize = +rating.dataset.ratingSize ? +rating.dataset.ratingSize : 5
			formRatingInit(rating, ratingSize)
			ratingValue ? formRatingSet(rating, ratingValue) : null
			document.addEventListener('click', formRatingAction)
		});
	}
	function formRatingAction(e) {
		const targetElement = e.target;
		if (targetElement.closest('.rating__input')) {
			const currentElement = targetElement.closest('.rating__input');
			const ratingValue = +currentElement.value
			const rating = currentElement.closest('.rating')
			const ratingSet = rating.dataset.rating === 'set'
			ratingSet ? formRatingGet(rating, ratingValue) : null;
		}
	}
	function formRatingInit(rating, ratingSize) {
		let ratingItems = ``;
		for (let index = 0; index < ratingSize; index++) {
			index === 0 ? ratingItems += `<div class="rating__items">` : null
			ratingItems += `
				<label class="rating__item">
					<input class="rating__input" type="radio" name="rating" value="${index + 1}">
				</label>`
			index === ratingSize ? ratingItems += `</div">` : null
		}
		rating.insertAdjacentHTML("beforeend", ratingItems)
	}
	function formRatingGet(rating, ratingValue) {
		// Тут відправка оцінки (ratingValue) на бекенд...
		// Отримуємо нову седню оцінку formRatingSend()
		// Або виводимо ту яку вказав користувач
		const resultRating = ratingValue;
		formRatingSet(rating, resultRating);
	}
	function formRatingSet(rating, value) {
		const ratingItems = rating.querySelectorAll('.rating__item');
		const resultFullItems = parseInt(value);
		const resultPartItem = value - resultFullItems;

		rating.hasAttribute('data-rating-title') ? rating.title = value : null

		ratingItems.forEach((ratingItem, index) => {
			ratingItem.classList.remove('rating__item--active');
			ratingItem.querySelector('span') ? ratingItems[index].querySelector('span').remove() : null;

			if (index <= (resultFullItems - 1)) {
				ratingItem.classList.add('rating__item--active');
			}
			if (index === resultFullItems && resultPartItem) {
				ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`)
			}
		});
	}
	function formRatingSend() {

	}

}

export function formAddPhoto() {
	const fileInput = document.querySelector(".add-photo__input");
	if (!fileInput) return;
	const previewContainer = document.querySelector(".add-photo__img");

	fileInput.addEventListener("change", function () {
		if (!fileInput.files.length) return;

		const file = fileInput.files[0];
		const reader = new FileReader();

		reader.onload = function (e) {
			previewContainer.innerHTML = `
				<div class="add-photo__remove icon-cross"></div>
				<img src="${e.target.result}" alt="Uploaded Image">
			`;
			previewContainer.style.display = "inline-block";

			previewContainer.querySelector(".add-photo__remove").addEventListener("click", function (event) {
				event.stopPropagation();
				previewContainer.innerHTML = "";
				previewContainer.style.display = "none";
				fileInput.value = "";
			});
		};

		reader.readAsDataURL(file);
	});
}
