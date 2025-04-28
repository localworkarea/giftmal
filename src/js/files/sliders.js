import Swiper from 'swiper';
import { Navigation, FreeMode, Pagination, Autoplay } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
*/

import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";

// Повний набір стилів з node_modules
// import 'swiper/css';

function initSliders() {
	if (document.querySelector('.corporate-promo__slider')) {
		new Swiper('.corporate-promo__slider', {
			modules: [Pagination, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 800,
			loop: true,
			loopAdditionalSlides: 1,
			preloadImages: false,
			
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},

			pagination: {
				el: '.corporate-promo__pagination',
				clickable: true,
			},
			
			on: {
				init: function() {
					const slides = document.querySelectorAll('.corporate-promo__slide');
					slides.forEach(slide => {
						slide.style.opacity = '1';
					});
				}
			}
		});
	}

	if (document.querySelector('.slider-checkout-first')) {
	 new Swiper('.slider-checkout-first', {
			modules: [Navigation, FreeMode],
			observer: true,
			observeParents: true,
			slidesPerView: "auto",
			spaceBetween: 8,
			speed: 500,
	
			freeMode: {
				enabled: true,
				momentumBounce: false,
			},
	
			navigation: {
				prevEl: '.slider-checkout-first .swiper-button-prev',
				nextEl: '.slider-checkout-first .swiper-button-next',
			},
	
			on: {
			
			}
		});
	}


	if (document.querySelector('.slider-checkout-second')) {
		const sliderCheckout = document.querySelector('.slider-checkout-second');
		const sliderWrapper = sliderCheckout.closest('.tab-checkout__slider');
		const prevBtn = sliderCheckout.querySelector('.swiper-button-prev');
		const nextBtn = sliderCheckout.querySelector('.swiper-button-next');
	
		const swiperCheckout = new Swiper('.slider-checkout-second', {
			modules: [Navigation, FreeMode],
			observer: true,
			observeParents: true,
			slidesPerView: "auto",
			spaceBetween: 8,
			speed: 500,
			freeMode: {
				enabled: true,
				momentumBounce: false,
			},
			navigation: {
				prevEl: prevBtn,
				nextEl: nextBtn,
			},
			on: {}
		});
	
		const mediaQuery900max = window.matchMedia('(max-width: 56.311em)');
	
		if (!mediaQuery900max.matches) {
			swiperCheckout.on('init', updatePositionClasses);
			swiperCheckout.on('slideChange', waitAndUpdate);
			swiperCheckout.on('touchEnd', waitAndUpdate);
		
			prevBtn.addEventListener('click', waitAndUpdate);
			nextBtn.addEventListener('click', waitAndUpdate);
		
			waitAndUpdate(); // сразу после инициализации
		}
		
	
		function waitAndUpdate() {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					updatePositionClasses();
				});
			});
		}
	
		function updatePositionClasses() {
			sliderWrapper.classList.toggle('_position-left', prevBtn.classList.contains('swiper-button-disabled'));
			sliderWrapper.classList.toggle('_position-right', nextBtn.classList.contains('swiper-button-disabled'));
		}
	}
	

	

	if (document.querySelector('.status-slider')) {
    new Swiper('.status-slider', {
        modules: [Navigation, FreeMode],
        observer: true,
        observeParents: true,
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: {
            enabled: true,
            momentumBounce: false,
        },
        navigation: {
            prevEl: '.status-slider .swiper-button-prev',
            nextEl: '.status-slider .swiper-button-next',
        },
        on: {
            init(swiper) {
							window.statusSwiper = swiper; 
                updateDisabledClasses(swiper);
								attachFullScrollHandlers(swiper);
            },
            reachBeginning(swiper) {
                updateDisabledClasses(swiper);
            },
            reachEnd(swiper) {
                updateDisabledClasses(swiper);
            }
        }
    });

		// прокручиваем в крайнее левое/правое положение при клике на кнопки вперед/назад
    function updateDisabledClasses(swiper) {
        const sliderEl = swiper.el;
        sliderEl.classList.toggle('_btn-disabled-prev', swiper.isBeginning);
        sliderEl.classList.toggle('_btn-disabled-next', swiper.isEnd);
    }
		function attachFullScrollHandlers(swiper) {
			const prevButton = swiper.navigation.prevEl;
			const nextButton = swiper.navigation.nextEl;

			if (prevButton) {
					prevButton.addEventListener('click', () => {
							swiper.slideTo(0, 600); // Прокрутка в начало (с анимацией 600ms)
					});
			}

			if (nextButton) {
					nextButton.addEventListener('click', () => {
							swiper.slideTo(swiper.slides.length - 1, 600); // Прокрутка в конец
					});
			}
		}

		// прокручиваем слайдер, если был клик по инпуту который находится под кнопкой вперед или назад
		function isOverlapping(el1, el2) {
			const rect1 = el1.getBoundingClientRect();
			const rect2 = el2.getBoundingClientRect();
			return !(rect1.right < rect2.left || rect1.left > rect2.right);
		}

		function scrollUntilVisible(swiper, targetSlide) {
			if (!swiper || !targetSlide) return;
		
			const prevButton = swiper.navigation.prevEl;
			const nextButton = swiper.navigation.nextEl;
			let iterationLimit = 20;
		
			const scrollRight = () => {
				if (isOverlapping(targetSlide, nextButton) && !swiper.isEnd && iterationLimit--) {
					swiper.slideNext(600);
					setTimeout(scrollRight, 0); // ждем завершения анимации
				}
			};
		
			const scrollLeft = () => {
				if (isOverlapping(targetSlide, prevButton) && !swiper.isBeginning && iterationLimit--) {
					swiper.slidePrev(600);
					setTimeout(scrollLeft, 0);
				}
			};
		
			if (isOverlapping(targetSlide, nextButton)) {
				scrollRight();
			} else if (isOverlapping(targetSlide, prevButton)) {
				scrollLeft();
			}
		}

		// === обработчик кликов
		document.querySelectorAll('.status-slider__input').forEach(input => {
			input.addEventListener('click', () => {
				if (!window.statusSwiper) return;
			
				const slide = input.closest('.swiper-slide');
				scrollUntilVisible(window.statusSwiper, slide);
			});
		});

		
	}

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
						spaceBetween: 1,
					},
					480: {
						slidesPerView: 2,
						spaceBetween: 1,
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