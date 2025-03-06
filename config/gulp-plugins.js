// Імпортуємо модулі
import notify from "gulp-notify";
import newer from "gulp-newer";
import plumber from "gulp-plumber";
import ifPlugin from "gulp-if";
import prettier from "gulp-prettier";
import rename from 'gulp-rename';
import fileInclude from 'gulp-file-include';

// Експортуємо об'єкт
export const plugins = {
	notify,
	if: ifPlugin,
	prettier,
	newer,
	plumber,
	rename,
	fileInclude 
}