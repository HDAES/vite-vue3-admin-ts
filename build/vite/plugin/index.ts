  
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';

import { configElementPlusPlugin } from './elementPlus'
import { configSvgIconsPlugin } from './svgSprite'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const vitePlugins: (Plugin | Plugin[])[] = [
        vue()
    ];
    
    // vite-plugin-element-plus
    vitePlugins.push(configElementPlusPlugin(isBuild))

    //vite-plugin-svg-icons
    vitePlugins.push(configSvgIconsPlugin(isBuild))
    return vitePlugins;
}