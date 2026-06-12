import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/app'),
      '@models': resolve(__dirname, 'src/app/models'),
      '@services': resolve(__dirname, 'src/app/services'),
      '@store': resolve(__dirname, 'src/app/store'),
      '@components': resolve(__dirname, 'src/app/components'),
      '@pages': resolve(__dirname, 'src/app/pages'),
      '@env': resolve(__dirname, 'src/environments'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
  },
});
