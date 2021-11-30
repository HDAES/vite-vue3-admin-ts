import { createApp } from 'vue'
import 'virtual:svg-icons-register';

import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
// import VMdEditor from '@kangc/v-md-editor';
// import '@kangc/v-md-editor/lib/style/base-editor.css';
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// import hljs from 'highlight.js';
//import '@kangc/v-md-editor/lib/theme/style/github.css';
import '@/elemntPlus/element-plus-theme/index.css'
import '@/assets/styles/index.scss'

import { setupRouter } from '@/router'
import { setupElementPlus } from '@/elemntPlus';
import { setupStore } from '@/store'
import { SvgIcon } from '@/components/Icon/index'
import { setupHasRole } from '@/utils/hasPermission'
import './permission'
import App from './App.vue'

// VMdEditor.use(githubTheme, {
//     Hljs: hljs,
//   });

async function bootstrap() {
    const app = createApp(App)

    //Configure routing
    setupRouter(app)
    
    setupElementPlus(app)
    
    setupStore(app)
    
    setupHasRole(app)

    // app.use(VMdEditor)
    
    app.component('SvgIcon',SvgIcon).mount('#app');
}
bootstrap()
