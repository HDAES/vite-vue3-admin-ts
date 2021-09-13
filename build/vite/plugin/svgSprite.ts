/*
 * @Descripttion: svg 使用
 * @Author: Hades
 * https://github.com/anncwb/vite-plugin-svg-icons
 * @Date: 2021-09-13 11:29:22
 */

import SvgIconsPlugin from 'vite-plugin-svg-icons';
import path from 'path';

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = SvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}