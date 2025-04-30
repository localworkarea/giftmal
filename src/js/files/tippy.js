import { isMobile, FLS } from "./functions.js";
import { flsModules } from "./modules.js";

import tippy from 'tippy.js';

// Підключення стилів з src/scss/libs
import "../../scss/libs/tippy.scss";
// Підключення стилів з node_modules
//import 'tippy.js/dist/tippy.css';

// Запускаємо та додаємо в об'єкт модулів
flsModules.tippy = tippy('[data-tippy-content]', {
  placement: 'bottom',
});

// Розгорнутий тултіп ==========================
const customTooltipTriggers = document.querySelectorAll('[data-tippy-grid]');

customTooltipTriggers.forEach(trigger => {
  const contentSelector = trigger.getAttribute('data-tippy-grid');
  const tooltipContent = document.querySelector(contentSelector);

  if (tooltipContent) {
    tippy(trigger, {
      content: () => {
        const clone = tooltipContent.cloneNode(true);
        clone.style.display = 'block';
        return clone;
      },
      allowHTML: true,
      interactive: true,
      placement: 'bottom',
      theme: 'custom-grid', // указываем что это кастомный элемент и можем задавать ему особые размеры
    
      // popperOptions: {   // Кастомная позиция при мобильном экране
      //   modifiers: [
      //     {
      //       name: 'customMobileCentering',
      //       enabled: () => window.matchMedia('(max-width: 480px)').matches,
      //       phase: 'afterWrite',
      //       fn({ state }) {
      //         const tooltipBox = state.elements.popper;
      //         Object.assign(tooltipBox.style, {
      //           left: '0', 
      //           right: 'auto',
      //           transform: "translate(-23px, -35px)",
      //         });
      //       },
      //     },
      //   ],
      // }, 
      // onCreate(instance) {
      //   if (instance.popper) {
      //     instance.popper.classList.add('tippy-root--custom-grid');
      //   }
      // },
    });
  }
});
