import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';


const routes : RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/sys/login/index.vue')
    }
]


export const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes,
})

export function setupRouter(app: App<Element>) {
    app.use(router);
}
