import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    proxy: {
      '/api': 'http://172.24.0.2:3000'
    }
  }
});
