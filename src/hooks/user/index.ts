/*
 * @Descripttion: 用户相关
 * @Author: Hades
 * @Date: 2021-09-03 00:02:17
 */

import { computed, ComputedRef } from "vue";

import { useUserStore } from '@/store/modules/user'
export function userHook(){
    const userStore = useUserStore()

    const userName: ComputedRef<string> = computed((): string => userStore.getUserName)
    const roles: ComputedRef<string[]> = computed((): string[] => userStore.getRoles)
    const hasRole: ComputedRef<string[]> = computed((): string[] => userStore.getHasRole)
    const loginOut = () => userStore.loginOut()
    const getInfo = () => userStore.getInfo()
    return {
        loginOut,
        getInfo,
        hasRole,
        userName,
        roles
    }
}