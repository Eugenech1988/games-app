import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import dotenv from 'dotenv';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import tsNode from 'ts-node';

tsNode.register({
  transpileOnly: true, // Optional: For faster builds
});

dotenv.config();
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    exclude: [...configDefaults.exclude, 'node_modules/**'], // Exclude unnecessary files
  },
  plugins: [react(), tsconfigPaths()],
  define: {
    'process.env': process.env
  }
});
