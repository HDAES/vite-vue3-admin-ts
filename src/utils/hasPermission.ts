/*
 * @Descripttion: 按钮权限
 * @Author: Hades
 * @Date: 2021-11-19 09:24:25
 */
import type { App } from 'vue';
import { userHook } from '@/hooks/user'


export function setupHasRole(app: App<Element>){
    app.directive('has', {
        mounted(el, binding) {
          //获取按钮权限
          if (!app.config.globalProperties.$_has(binding.value)) {
            //移除不匹配的按钮
            el.setAttribute('disabled',"")
            el.classList.add('is-disabled')

            //el.parentNode.removeChild(el)
          }
        },
      })
      
      const { hasRole }  = userHook()
    
      //检查权限方法
      app.config.globalProperties.$_has = function (value) {
        let isExist = false
        var btnPermsArr = hasRole.value //获取从服务器请求存储本地的按钮权限
        if (btnPermsArr.includes(value)) {
          isExist = true
        }
        return isExist
      }
} 

