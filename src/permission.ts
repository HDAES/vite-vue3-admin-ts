import { router } from '@/router'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList: string[] = [ '/login','/dashboard/analysis' ]

router.beforeEach((to, from, next) =>{


    NProgress.start()
    
    if(getToken()){
        if (to.path === '/login' || to.path === '/') {
            console.log('1312')
            next({ path: '/dashboard/analysis' })
        }else{
            next()
        }
    }else{
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        }else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() =>{
    NProgress.done()
})