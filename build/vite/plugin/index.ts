  
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';

import { configElementPlusPlugin } from './elementPlus'
import { configSvgIconsPlugin } from './svgSprite'
import { configCompressPlugin } from './compress'
import { configMockPlugin } from './mock';


export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {

    const {
        VITE_USE_IMAGEMIN,
        VITE_USE_MOCK,
        VITE_LEGACY,
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      } = viteEnv;

    const vitePlugins: (Plugin | Plugin[])[] = [
        vue()
    ];
    
    // vite-plugin-element-plus
    //vitePlugins.push(configElementPlusPlugin(isBuild))

    //vite-plugin-svg-icons
    vitePlugins.push(configSvgIconsPlugin(isBuild))

    // vite-plugin-mock
    VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))


    if (isBuild) {
        //vite-plugin-compression
        vitePlugins.push(configCompressPlugin('brotli', false, false))
    }
    return vitePlugins;
}