import { defineConfig } from 'vite';
import { fileURLToPath, URL } from "node:url";
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  // server: {
  //   host: true,
  //   port: 8010,
  // },
    server: {
      host: true,
        port: 8010,
      // 仅在 proxy 中配置的代理前缀， mock-dev-server 才会拦截并 mock
      // doc: https://github.com/pengzhanbo/vite-plugin-mock-dev-server
      proxy: {
        "^/dev-api": {
          target: ""
        }
      }
    },
  build: {
    outDir: 'docs',
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  // resolve: {
  //   alias: {
  //     '@': '/src',
  //   },
  // },
     resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
});
