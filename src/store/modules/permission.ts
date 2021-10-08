import { defineStore } from 'pinia'
import { getPermissionUser } from '@/api/system/menu'
import Layout from '@/layouts/default/index.vue'

const modules = import.meta.glob('../../views/**/index.vue');

interface PermissionState {
  sidebarRouters: any[]
}


export const usePermissionStore = defineStore({
  id: 'permission',
  state: () : PermissionState =>({
    sidebarRouters: []
  }),
  getters: {
    getSidebarRouters(): any[] {
      return this.sidebarRouters
    }
  },
  actions: {
    setSidebarRouters(sidebarRouters: any[]) {
      // 顶部导航菜单默认添加统计报表栏指向首页
      this.sidebarRouters = sidebarRouters
    },
    // 生成路由
    GenerateRoutes() {
        return new Promise<any[]>(resolve  => {
          getPermissionUser().then(res =>{
            const sdata = JSON.parse(JSON.stringify(res.data))
            const rdata = JSON.parse(JSON.stringify(res.data))

            const myRoutes: any[] = filterAsyncRouter(sdata, false, true)
            const sidebarRoutes = filterAsyncRouter(rdata)
            
            this.setSidebarRouters(sidebarRoutes)

            resolve(myRoutes)
          })
        })
    }
  }
})



// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap: Array<any>, lastRouter = false, type = false) {
    return asyncRouterMap.filter((route) => {
        // if (type && route.children ) {
        //   route.children = filterChildren(route.children)
        // }
        if (route.component) {
            // Layout ParentView 组件特殊处理
            if (route.component === 'Layout') {
                route.component = Layout   
            }else if(route.component === 'ParentView'){

            }else{
              route.component = loadView(route.component)
              
            }
        }

        if (route.children != null && route.children && route.children.length &&  route.type == 0) {
            route.children = filterAsyncRouter(route.children, route, type)
        }else {
            delete route['children']
            delete route['redirect']
        }

        return true
    })
}

  
export const loadView = (view: any) => { // 路由懒加载
  console.log(view)
  return modules[`../../views/${view}/index.vue`]
}