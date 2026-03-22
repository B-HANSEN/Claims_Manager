import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [
		{
			name: 'treat-js-files-as-jsx',
			async transform(code, id) {
				if (!id.match(/src\/.*\.js$/)) return null
				return transformWithEsbuild(code, id.replace(/\.js$/, '.jsx'), {
					loader: 'jsx',
					jsx: 'automatic',
				})
			},
		},
		react(),
	],
	optimizeDeps: {
		esbuildOptions: {
			loader: { '.js': 'jsx' },
			jsx: 'automatic',
		},
	},
	server: {
		port: 3000,
		proxy: {
			'/api': 'http://localhost:8001',
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/setupTests.js',
	},
})
