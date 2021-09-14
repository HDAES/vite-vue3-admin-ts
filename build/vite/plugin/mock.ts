/*
 * @Descripttion: mock
 * @Author: Hades
 * @Date: 2021-09-14 11:13:13
 */

import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';
      setupProdMockServer();
      `,
  });
}