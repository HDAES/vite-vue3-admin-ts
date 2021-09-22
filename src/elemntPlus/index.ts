import type { App } from 'vue';

import { 
    ElButton,
    ElContainer,
    ElMenu,
    ElScrollbar,
    ElIcon,
    ElBreadcrumb,
    ElBadge,
    ElDropdown,
    ElDrawer,
    
} from 'element-plus';

const components = [ 
    ElButton,
    ElContainer,
    ElMenu,
    ElScrollbar,
    ElIcon,
    ElBreadcrumb,
    ElBadge,
    ElDropdown,
    ElDrawer
]

export function setupElementPlus(app: App<Element>) {
    components.forEach(component => {
        app.use(component)
    })
    app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
}
