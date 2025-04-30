// Підключення з node_modules
import * as noUiSlider from 'nouislider';


export function rangeInit() {
	const rangeItems = document.querySelectorAll('[data-range]');
	if (rangeItems.length) {
			rangeItems.forEach(rangeItem => {
					const fromValue = rangeItem.querySelector('[data-range-from]');
					const toValue = rangeItem.querySelector('[data-range-to]');
					const item = rangeItem.querySelector('[data-range-item]');

					// Проверяем, находится ли `range` внутри фильтра
					const filterWrapper = rangeItem.closest('[data-filters-wrapper]');
					const clearButton = filterWrapper?.querySelector('.filters__clear') || null;
					const showButton = filterWrapper?.querySelector('.filters__show') || null;

					const defaultFrom = Number(fromValue.dataset.rangeFrom);
					const defaultTo = Number(toValue.dataset.rangeTo);

					// Создаем ползунок noUiSlider
					noUiSlider.create(item, {
							start: [Number(fromValue.value), Number(toValue.value)],
							connect: true,
							step: 10,
							range: {
									'min': [defaultFrom],
									'max': [defaultTo]
							},
							format: wNumb({
									decimals: 0,
									thousand: ' ',
							})
					});

					// Функция обновления состояния кнопок (только если `range` внутри фильтра)
					const updateFooterButtons = () => {
							if (!filterWrapper) return;

							const currentFrom = Number(fromValue.value.replace(/\s+/g, ''));
							const currentTo = Number(toValue.value.replace(/\s+/g, ''));

							const isChanged = currentFrom !== defaultFrom || currentTo !== defaultTo;

							if (clearButton) clearButton.disabled = !isChanged;
							if (showButton) showButton.disabled = !isChanged;
					};

					// Обновление инпутов при изменении ползунка
					item.noUiSlider.on('update', function (values) {
							fromValue.value = values[0];
							toValue.value = values[1];
							updateFooterButtons();
					});

					// Функция для обновления ползунка при ручном вводе
					const updateSlider = () => {
							let from = Number(fromValue.value.replace(/\s+/g, ''));
							let to = Number(toValue.value.replace(/\s+/g, ''));

							const min = defaultFrom;
							const max = defaultTo;

							from = Math.min(Math.max(from, min), max);
							to = Math.min(Math.max(to, min), max);

							from = Math.round(from / 10) * 10;
							to = Math.round(to / 10) * 10;

							if (from > to) [from, to] = [to, from];

							item.noUiSlider.set([from, to]);
							updateFooterButtons();
					};

					fromValue.addEventListener('change', updateSlider);
					toValue.addEventListener('change', updateSlider);

					// Очистка значений при нажатии на "Очистить" (только если `range` в фильтре)
					if (clearButton) {
							clearButton.addEventListener('click', () => {
									item.noUiSlider.set([defaultFrom, defaultTo]);
									fromValue.value = defaultFrom;
									toValue.value = defaultTo;

									clearButton.disabled = true;
									showButton.disabled = true;
							});
					}
			});
	}
}

rangeInit();
