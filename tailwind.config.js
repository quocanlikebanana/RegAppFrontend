/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'var(--p-default)',
					9: 'var(--p-9)',
					8: 'var(--p-8)',
					7: 'var(--p-7)',
					6: 'var(--p-6)',
					5: 'var(--p-5)',
					4: 'var(--p-4)',
					3: 'var(--p-3)',
					2: 'var(--p-2)',
					1: 'var(--p-1)',
				},
				secondary: {
					DEFAULT: 'var(--s-default)',
					9: 'var(--s-9)',
					8: 'var(--s-8)',
					7: 'var(--s-7)',
					6: 'var(--s-6)',
					5: 'var(--s-5)',
					4: 'var(--s-4)',
					3: 'var(--s-3)',
					2: 'var(--s-2)',
					1: 'var(--s-1)',
				},
				green: {
					DEFAULT: 'var(--g-default)',
					9: 'var(--g-9)',
					8: 'var(--g-8)',
					7: 'var(--g-7)',
					6: 'var(--g-6)',
					5: 'var(--g-5)',
					4: 'var(--g-4)',
					3: 'var(--g-3)',
					2: 'var(--g-2)',
					1: 'var(--g-1)',
				},
				grey: {
					DEFAULT: 'var(--grey-default)',
					10: 'var(--grey-10)',
					9: 'var(--grey-9)',
					8: 'var(--grey-8)',
					7: 'var(--grey-7)',
					6: 'var(--grey-6)',
					5: 'var(--grey-5)',
					4: 'var(--grey-4)',
					3: 'var(--grey-3)',
					2: 'var(--grey-2)',
					'1-5': 'var(--grey-1-5)',
					1: 'var(--grey-1)',
					'0-5': 'var(--grey-0-5)',
					0: 'var(--grey-0)',
				},
			},
		},
		fontFamily: {
			bitter: ['Bitter', 'serif'],
			blackOpsOne: ['Black Ops One', 'cursive'],
		},
		backgroundImage: {
			"gradient-1": 'var(--gradient-1)',
			"gradient-2": 'var(--gradient-2)',
		}
	},
	plugins: [],
	corePlugins: {
		// preflight: false,
	},
	important: "#root",
}