
import { computed, ComputedRef } from "vue";
import { useAppStore } from "@/store/modules/app";
import { usePermissionStore  } from "@/store/modules/permission"


export function useAppSetting() {
    const appStore = useAppStore()
    const PermissionStore = usePermissionStore()

    const collapse: ComputedRef<Boolean> = computed((): Boolean => appStore.getCollapse)
    const changeCollapse = () => appStore.changeCollapse()
    
    const sidebarRouters: ComputedRef<any[]> = computed((): any[] => PermissionStore.getSidebarRouters)
    return {
        collapse,
        sidebarRouters,
        changeCollapse
    }
}