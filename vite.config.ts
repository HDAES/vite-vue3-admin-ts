import type { UserConfig, ConfigEnv } from 'vite';

import { loadEnv } from 'vite';
import path from 'path';

import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { createProxy } from './build/vite/proxy';

import pkg from './package.json';
import dayjs from 'dayjs';


const resolve = (dir: string) => path.join(__dirname, dir)



const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};



export default ({ command, mode } : ConfigEnv): UserConfig =>{
  const root = process.cwd();
  // 获取env文件内容
  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  return {
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
    server: {
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    plugins: createVitePlugins(viteEnv, command === 'build')
  }
} 