/*
 * @Descripttion: 用户相关
 * @Author: Hades
 * @Date: 2021-09-03 00:02:17
 */

import { computed } from "vue";

import { useUserStore } from '@/store/modules/user'
export function useUser(){
    const userStore = useUserStore()

    const userName = computed(() => userStore.getUserName)
    const roles = computed(() => userStore.getRoles
    )
    return {
        userName,
        roles
    }
}