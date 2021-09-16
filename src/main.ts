import { createApp } from 'vue'
import 'virtual:svg-icons-register';

import { setupRouter } from '@/router'


import App from './App.vue'

async function bootstrap() {
    const app = createApp(App)

    //Configure routing
    setupRouter(app)

    app.mount('#app');
}

bootstrap()
