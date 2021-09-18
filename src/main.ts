import { createApp } from 'vue'
import 'virtual:svg-icons-register';
import '@/elemntPlus/element-plus-theme/index.css'
import '@/assets/styles/index.scss'

import { setupRouter } from '@/router'
import { setupElementPlus } from './elemntPlus';

import './permission'
import App from './App.vue'

async function bootstrap() {
    const app = createApp(App)

    //Configure routing
    setupRouter(app)

    setupElementPlus(app)
    
    app.mount('#app');
}


bootstrap()
