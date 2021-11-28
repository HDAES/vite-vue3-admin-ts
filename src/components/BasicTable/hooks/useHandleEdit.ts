/*
 * @Descripttion: 
 * @Author: Hades
 * @Date: 2021-11-28 21:07:55
 */

import { reactive } from 'vue'

export function useHandleEdit(){

    const dialog = reactive({visible: false,type: ""});

    
    return {
        dialog
    }
}