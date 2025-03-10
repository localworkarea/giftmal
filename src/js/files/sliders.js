/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, FreeMode, Pagination } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	if (document.querySelector('.slider-checkout')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.slider-checkout', { 
			modules: [Navigation, FreeMode],
			observer: true,
			observeParents: true,
			slidesPerView: "auto",
			spaceBetween: 8,
			speed: 500,

			// touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			freeMode: {
				enabled: true,
				momentumBounce: false,
			},

			// pagination: {
			// 	el: '.swiper-pagination',
			// 	clickable: true,
			// },

			navigation: {
				prevEl: '.slider-checkout .swiper-button-prev',
				nextEl: '.slider-checkout .swiper-button-next',
			},
			/*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// Події
			on: {

			}
		});
	}

	// Ініціалізація слайдера для статей блогу
	const blogSliders = [
		{
			selector: '.blog-inner__related-slider',
			navigation: {
				prevEl: '.blog-inner__related-button-prev',
				nextEl: '.blog-inner__related-button-next',
			},
			pagination: '.blog-inner__related-pagination'
		},
		{
			selector: '.blog__recommendations-slider',
			navigation: {
				prevEl: '.blog__recommendations-button-prev',
				nextEl: '.blog__recommendations-button-next',
			},
			pagination: '.blog__recommendations-pagination'
		}
	];

	// Initialize all blog sliders with shared configuration
	blogSliders.forEach(slider => {
		if (document.querySelector(slider.selector)) {
			new Swiper(slider.selector, {
				modules: [Navigation, Pagination],
				observer: true,
				observeParents: true,
				slidesPerView: 1,
				spaceBetween: 8,
				speed: 500,
				loop: true,
				
				pagination: {
					el: slider.pagination,
					clickable: true,
					type: 'bullets',
					dynamicBullets: true,
				},
				
				breakpoints: {
					320: {
						slidesPerView: 2,
						spaceBetween: 8,
					},
					480: {
						slidesPerView: 2,
						spaceBetween: 8,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 8,
					},
					992: {
						slidesPerView: 4,
						spaceBetween: 8,
					},
				},
				
				navigation: slider.navigation,
			});
		}
	});
	
	// Ініціалізація слайдера відгуків клієнтів
	if (document.querySelector('.feedback__slider')) {
		const mediaQuery = window.matchMedia('(min-width: 768px)');
		let feedbackSlider;
		
		function initFeedbackSlider() {
			if (mediaQuery.matches) {
				feedbackSlider = new Swiper('.feedback__slider', {
					modules: [Navigation, Pagination],
					observer: true,
					observeParents: true,
					slidesPerView: 'auto',
					spaceBetween: 24,
					speed: 800,
					loop: false,
					watchOverflow: true,
					centeredSlides: false,
					initialSlide: 0,
					navigation: {
						prevEl: '.feedback__button-prev',
						nextEl: '.feedback__button-next',
					},
					on: {
						resize: function() {
							this.update();
						}
					}
				});
			} else {
				if (feedbackSlider) {
					feedbackSlider.destroy();
					feedbackSlider = undefined;
				}
			}
		}
		
		// Ініціалізація при завантаженні сторінки
		initFeedbackSlider();
		
		// Слідкувати за зміною розміру екрану
		mediaQuery.addEventListener('change', initFeedbackSlider);
		
		// Кнопка "Більше відгуків" для мобільної версії
		const moreButton = document.querySelector('.feedback__mobile-button');
		if (moreButton) {
			moreButton.addEventListener('click', function() {
				const hiddenSlides = document.querySelectorAll('.feedback__slider .swiper-slide:nth-child(n+3)');
				hiddenSlides.forEach(slide => {
					slide.style.display = 'block';
				});
				moreButton.style.display = 'none';
			});
		}
	}
}




window.addEventListener("load", function (e) {
	initSliders();
});