import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import mkcert from'vite-plugin-mkcert'
import os from 'os'


function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    for (const iface of interfaces[key]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
}

const localIp = getLocalIP();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    mkcert(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: localIp,
    https: true
  },
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
    ],
  }
})
