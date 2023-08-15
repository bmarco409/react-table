import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import eslint from 'vite-plugin-eslint';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(),
    dts({
      insertTypesEntry: true,
  }),],
  optimizeDeps: {
    include: ['linked-dep'],
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactTable',
      // the proper extensions will be added
      fileName: 'react-table',
      formats: ['es', 'umd'],
    },
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
    }
  },
})
