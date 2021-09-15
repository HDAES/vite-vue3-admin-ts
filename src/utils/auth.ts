/*
 * @Descripttion: 权限管理
 * @Author: Hades
 * @Date: 2021-09-15 16:26:12
 */

  
import storage from 'store'


const TokenKey: string = 'Admin-Token'

export function getToken(){
    return storage.get(TokenKey)
}

export function setToken(token: string){
    return storage.set(TokenKey,token)
}

export function removeToken(){
    return storage.remove(TokenKey)
}