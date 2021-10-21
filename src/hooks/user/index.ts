/*
 * @Descripttion: 用户相关
 * @Author: Hades
 * @Date: 2021-09-03 00:02:17
 */

import { computed, ComputedRef } from "vue";

import { useUserStore } from '@/store/modules/user'
export function useUser(){
    const userStore = useUserStore()

    const userName: ComputedRef<string> = computed((): string => userStore.getUserName)
    const roles: ComputedRef<string[]> = computed((): string[] => userStore.getRoles)
    
    const loginOut = () => userStore.loginOut()
    
    return {
        loginOut,
        userName,
        roles
    }
}