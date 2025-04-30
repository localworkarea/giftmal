/* Маски для полів (у роботі) */

import { flsModules } from "../modules.js";

// Підключення модуля
import "inputmask/dist/inputmask.min.js";

const inputMasks = document.querySelectorAll('input');
if (inputMasks.length) {
	flsModules.inputmask = Inputmask().mask(inputMasks);
}