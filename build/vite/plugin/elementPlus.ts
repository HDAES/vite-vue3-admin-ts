/*
 * @Descripttion: element-plus 按需加载
 * @Author: Hades
 * https://github.com/element-plus/vite-plugin-element-plus
 * @Date: 2021-09-13 11:18:33
 */

import VitePluginElementPlus from 'vite-plugin-element-plus'

export function configElementPlusPlugin(isBuild: boolean) {

    const pluginElementPlus = VitePluginElementPlus({
        useSource: true,
        format: isBuild ?  'cjs': 'esm' 
    })
    return pluginElementPlus
}