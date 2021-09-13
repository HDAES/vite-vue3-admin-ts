import type { UserConfig, ConfigEnv } from 'vite';

import { loadEnv } from 'vite';
import { resolve } from 'path';

import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'

import pkg from './package.json';
import dayjs from 'dayjs';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

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
      alias: [
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      }]
    },
    server: {
      host: true,
      port: VITE_PORT,
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