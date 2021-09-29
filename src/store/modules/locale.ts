import { LOCALE_KEY } from '@/enums/cacheEnum';
import { defineStore } from 'pinia';
import { store as pinia } from '@/store';
import store from 'store'
import { LocaleType } from 'types/config';

interface LocaleState {
    locale: LocaleType 
}


const localeStore = store.get(LOCALE_KEY) as LocaleType;

export const useLocaleStore  = defineStore({
    id: 'app-locale',
    state : (): LocaleState  =>({
        locale: localeStore
    }),
    getters: {
        getLocale(): LocaleType {
            return this.locale ?? 'zh_CN';
        },
    },
    actions: {
    }
})

export function useLocaleStoreWithOut() {
    return useLocaleStore(pinia);
  }

