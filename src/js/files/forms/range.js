// Підключення з node_modules
import * as noUiSlider from 'nouislider';

// Підключення стилів з scss/base/forms/range.scss 
// у файлі scss/forms/forms.scss

// Підключення стилів з node_modules
// import 'nouislider/dist/nouislider.css';


export function rangeInit() {
	const rangeItems = document.querySelectorAll('[data-range]');
	if (rangeItems.length) {
		rangeItems.forEach(rangeItem => {
			const fromValue = rangeItem.querySelector('[data-range-from]');
			const toValue = rangeItem.querySelector('[data-range-to]');
			const item = rangeItem.querySelector('[data-range-item]');

			noUiSlider.create(item, {
				start: [Number(fromValue.value), Number(toValue.value)],
				connect: true,
				step: 10,
				range: {
					'min': [Number(fromValue.dataset.rangeFrom)],
					'max': [Number(toValue.dataset.rangeTo)]
				},
				format: wNumb({
					decimals: 0,
					// prefix: '₴ ',
					thousand: ' ',
				})
			});

			// Обновление инпутов при изменении ползунка
			item.noUiSlider.on('update', function (values, handle) {
				fromValue.value = values[0];
				toValue.value = values[1];
			});

			// Функция для обновления ползунка при ручном вводе
			const updateSlider = () => {
				let from = Number(fromValue.value.replace(/\s+/g, ''));
				let to = Number(toValue.value.replace(/\s+/g, ''));

				const min = Number(fromValue.dataset.rangeFrom);
				const max = Number(toValue.dataset.rangeTo);

				// Ограничение значений в пределах min-max
				from = Math.min(Math.max(from, min), max);
				to = Math.min(Math.max(to, min), max);

				// Округляем введенные значения до ближайшего кратного 10
				from = Math.round(from / 10) * 10;
				to = Math.round(to / 10) * 10;

				// Предотвращение переворота значений
				if (from > to) [from, to] = [to, from];

				item.noUiSlider.set([from, to]);
			};

			fromValue.addEventListener('change', updateSlider);
			toValue.addEventListener('change', updateSlider);
		});
	}
}

rangeInit();
