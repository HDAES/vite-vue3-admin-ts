import { defineStore } from 'pinia';

interface AppState {
    collapse: Boolean
}

export const useAppStore = defineStore({
    id: 'app',
    state : (): AppState  =>({
        collapse: false
    }),
    getters: {
        getCollapse(): Boolean{
            return this.collapse
        }
    },
    actions: {
        changeCollapse(): void{
            console.log('12312')
            this.collapse = ! this.collapse
        }
    }
})



// export function useAppStoreWithOut() {
//     return useAppStore(store);
//   }