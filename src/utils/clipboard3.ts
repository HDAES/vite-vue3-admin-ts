/*
 * @Descripttion: 粘贴板
 * @Author: Hades
 * @Date: 2021-10-19 14:37:42
 */
import Clipboard from 'clipboard'

export default (opts: any) => {
  const appendToBody = opts?.appendToBody === undefined ? true : opts.appendToBody

  return {
    toClipboard(text) {
      return new Promise((resolve, reject) => {
        const fakeEl = document.createElement('button')
        // setup a new Clipboard.js
        const clipboard = new Clipboard(fakeEl, {
          text: () => text,
          action: () => 'copy',
        })
        clipboard.on('success', (e) => {
          clipboard.destroy()
          resolve(e)
        })
        clipboard.on('error', (e) => {
          clipboard.destroy()
          reject(e)
        })
        // appendToBody fixes IE
        if (appendToBody) document.body.appendChild(fakeEl)
        // simulate click
        fakeEl.click()
        // remove from body if appended
        if (appendToBody) document.body.removeChild(fakeEl)
      })
    }
  }
}