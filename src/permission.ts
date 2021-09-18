import { router } from '@/router'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList: string[] = [ '/login','/dashboard/analysis' ]

router.beforeEach((to, from, next) =>{


    NProgress.start()
    
    if(getToken()){

    }else{
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        }else {
            next('/dashboard/analysis')
            NProgress.done()
        }
    }
})

router.afterEach(() =>{
    NProgress.done()
})