
import { computed, ComputedRef } from "vue";
import { useAppStore } from "@/store/modules/app";



export function useAppSetting() {
    const appStore = useAppStore()


    const collapse: ComputedRef<Boolean> = computed((): Boolean => appStore.getCollapse)
    const changeCollapse: void = appStore.changeCollapse()
    

    return {
        collapse,
        changeCollapse
    }
}