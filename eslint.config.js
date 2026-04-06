import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierConfig from 'eslint-config-prettier'

export default [
	{ ignores: ['**/dist', '**/node_modules'] },
	// mock (Node)
	{
		files: ['mock/**/*.js'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.node,
			sourceType: 'module',
		},
		rules: {
			...js.configs.recommended.rules,
		},
	},
	// client (React)
	{
		files: ['client/src/**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		},
	},
	// test files
	{
		files: ['client/src/**/*.test.{js,jsx}'],
		languageOptions: {
			globals: {
				...globals.jest,
				vi: 'readonly',
			},
		},
	},
	prettierConfig,
]
