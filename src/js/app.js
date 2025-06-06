window['FLS'] = false;

// Підключення основного файлу стилів
import "../scss/style.scss";


import * as flsFunctions from "./files/functions.js";

// /* Перевірка підтримки webp, додавання класу webp або no-webp для HTML */
// /* (i) необхідно для коректного відображення webp із css */
// // flsFunctions.isWebp();
// /* Додавання класу touch для HTML якщо браузер мобільний */
// // flsFunctions.addTouchClass();

/* Додавання loaded для HTML після повного завантаження сторінки */
flsFunctions.addLoadedClass();
/* Модуль для роботи з меню (Бургер) */
flsFunctions.menuInit();
/* Форматування чисел */
import './libs/wNumb.min.js';

/*
Модуль "Спойлери"
*/
flsFunctions.spollers();

/*
Модуль "Таби"
*/
flsFunctions.tabs();

/*
Модуль "Відео плеєр"
*/
import videoPlayer from "./modules/videoPlayer.js";
videoPlayer();

// Live Chat module
import initLiveChat from './modules/live-chat.js';
initLiveChat();

/*
Модуль "Показати ще"
*/
// flsFunctions.showMore();

/*
Модуль "До/Після"
*/
// import './libs/beforeafter.js';

/*
Сниппет (HTML):
*/
// flsFunctions.rippleEffect();

/*
Модуль "Кастомний курсор"
Документация:
Сниппет (HTML):
*/
// flsFunctions.customCursor(true);

/*
Модуль "Бігучий рядок" (Alpha)
*/
// import './libs/keywords.js'


/*
Модуль "Попапи"
*/
import './libs/popup.js'

/*
Модуль паралаксу мишею
*/
// import './libs/parallax-mouse.js'

// ========================================================================================================================================================================================================================================================
// Робота з формами ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import * as flsForms from "./files/forms/forms.js";

/* Робота з полями форми */
// /*
flsForms.formFieldsInit({
	viewPass: false,
	autoHeight: true,
});
// */
/* Надсилання форми */
flsForms.formSubmit();

/* Модуль форми "кількість" */
flsForms.formQuantity();
flsForms.formAmount();

/* Модуль зіркового рейтингу */
flsForms.formRating();

/* Модуль додати файл */
flsForms.formAddPhoto();



/* Модуль роботи з календарем */
// import './files/forms/datepicker.js'

/* (У роботі) Модуль роботи з масками.*/
/*
Підключення та налаштування виконується у файлі js/files/forms/inputmask.js
*/
// import "./files/forms/inputmask.js";

/* Модуль роботи з повзунком */
/*
Підключення та налаштування виконується у файлі js/files/forms/range.js
Документація по роботі у шаблоні:
Документація плагіна: https://refreshless.com/nouislider/
Сніппет (HTML): range
*/
import "./files/forms/range.js";

/* Модуль роботи з підказками (tippy) */
/*
Підключення плагіна Tippy.js та налаштування виконується у файлі js/files/tippy.js
Документація по роботі у шаблоні:
Документація плагіна: https://atomiks.github.io/tippyjs/
*/
import "./files/tippy.js";

// ========================================================================================================================================================================================================================================================
// Робота зі слайдером (Swiper) ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Налаштування підключення плагіна слайдера Swiper та нових слайдерів виконується у файлі js/files/sliders.js
Документація плагіна: https://swiperjs.com/
Сніппет(HTML): swiper
*/
import "./files/sliders.js";

// ========================================================================================================================================================================================================================================================
// Модулі роботи з прокручуванням сторінки ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================

/*
Зміна дизайну скроллбару
Документація по роботі у шаблоні: У HTML додаємо до блоку атрибут data-simplebar
Документація плагіна: https://github.com/Grsmto/simplebar/tree/master/packages/simplebar
Сніппет(HTML): 
*/
import './files/scroll/simplebar.js';

/* Модуль роботи з select. */
import './libs/select.js'

// Ліниве (відкладене) завантаження картинок
// Документація по роботі у шаблоні: https://template.fls.guru/template-docs/modul-lenivaya-podgruzka-lazy-loading.html
// Документація плагіна: https://github.com/verlok/vanilla-lazyload
// Сніппет(HTML):
// import './files/scroll/lazyload.js';

// Спостерігач за об'єктами з атрибутом data-watch
// Сніппет(HTML):
import './libs/watcher.js'

// Модуль поекранної прокрутки
// Сніппет(HTML):
// import './libs/fullpage.js'

// Модуль паралаксу
// Сніппет(HTML):
// import './libs/parallax.js'

// Функції роботи скролом
import * as flsScroll from "./files/scroll/scroll.js";

// Плавна навігація по сторінці
// flsScroll.pageNavigation();

// Функціонал додавання класів до хедеру під час прокручування
flsScroll.headerScroll();
flsScroll.footerStyickyScroll();

// Модуль анімація цифрового лічильника
// Сніппет(HTML):
// flsScroll.digitsCounter();

// ========================================================================================================================================================================================================================================================
// Галерея ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Документація по роботі у шаблоні: 
Документація плагіна: https://www.lightgalleryjs.com/docs/
Сніппет(HTML):
*/
// import "./files/gallery.js";

// ========================================================================================================================================================================================================================================================
// Масонрі сітка ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Документація по роботі у шаблоні:
Документація плагіна: 
Сніппет(HTML):
*/
// import "./files/isotope.js";


// ========================================================================================================================================================================================================================================================
// Google Maps ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
// import "./files/map.js";


// ========================================================================================================================================================================================================================================================
// Інші плагіни ============================================================================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================

/* Динамічний адаптив */
import "./libs/dynamic_adapt.js";

// ========================================================================================================================================================================================================================================================
// Інше ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import "./files/script.js";
import "./modules/tabs-navigation.js"; // Імпорт навігації табів
//============================================================================================================================================================================================================================================
