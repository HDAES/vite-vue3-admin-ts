import type { App } from 'vue';

import { ElButton } from 'element-plus';

const components = [ ElButton ]

export function setupElementPlus(app: App<Element>) {
    components.forEach(component => {
        app.use(component)
    })
    app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
}
