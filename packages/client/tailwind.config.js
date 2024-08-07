/** @type {import('tailwindcss').Config} */

import { twPlugin } from "@versini/ui-styles";

export default twPlugin.merge({
	darkMode: "selector",
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		`./node_modules/@versini/sassysaint/dist/**/*.{js,ts,jsx,tsx}`,
	],
});
