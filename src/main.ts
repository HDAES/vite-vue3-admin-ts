import { createApp } from 'vue'
import 'virtual:svg-icons-register';

import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

import '@/elemntPlus/element-plus-theme/index.css'
import '@/assets/styles/index.scss'

import { setupRouter } from '@/router'
import { setupElementPlus } from '@/elemntPlus';
import { setupStore } from '@/store'
import { SvgIcon } from '@/components/Icon/index'
import './permission'
import App from './App.vue'


async function bootstrap() {
    const app = createApp(App)

    //Configure routing
    setupRouter(app)
    
    setupElementPlus(app)
    
    setupStore(app)

    app.component('SvgIcon',SvgIcon).mount('#app');
}
bootstrap()
