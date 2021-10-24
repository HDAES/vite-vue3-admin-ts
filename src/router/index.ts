import { createWebHistory, RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import Layout from '@/layouts/default/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router';


const routes : RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/sys/login/index.vue')
    },{
        path: '/dashboard',
        name: 'dashboard',
        component: Layout,
        children: [
            {
                path: 'analysis',
                component: () => import('@/views/dashboard/analysis/index.vue')
            }
        ]
    }
]


export const router = createRouter({
    history:createWebHistory(),
    //history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes,
})

export function setupRouter(app: App<Element>) {
    app.use(router);
}
