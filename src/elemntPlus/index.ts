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
    ElForm,
    ElInput,
    ElCheckbox,
    ElLink,
    ElRow,
    ElCol,
    ElCard,
    ElSpace,
    ElTabs,
    ElTooltip,
    ElPopover,
    ElRadio,
    ElSwitch,
    ElTable,
    ElPagination,
    ElDialog,
    ElLoading,
    ElSelect,
    ElOption,
    ElTree,
    ElInputNumber
    
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
    ElDrawer,
    ElForm,
    ElInput,
    ElCheckbox,
    ElLink,
    ElRow,
    ElCol,
    ElCard,
    ElSpace,
    ElTabs,
    ElTooltip,
    ElPopover,
    ElRadio,
    ElSwitch,
    ElTable,
    ElPagination,
    ElDialog,
    ElForm,
    ElCheckbox,
    ElLoading,
    ElSelect,
    ElTree,
    ElInputNumber
]



export function setupElementPlus(app: App<Element>) {
    components.forEach(component => {
        app.use(component)
    })
    app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
}

export type ElETree = InstanceType<typeof ElTree>
export type ElEForm = InstanceType<typeof ElForm>