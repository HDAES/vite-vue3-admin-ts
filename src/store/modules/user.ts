import { getUserInfo, putUserLogin, postLoginOut } from '@/api/system/login'
import { setToken as setAuthToken, getToken, removeToken } from '@/utils/auth'
import md5 from 'md5'
import { defineStore } from 'pinia'
import { UserState } from 'types/store'


export const useUserStore = defineStore({
    id: 'user',
    state: (): UserState =>({
        token: getToken(),
        roles: [],
        permissions: [],
        username: ''
    }),
    getters: {
        getUserName(): string{
          return this.username
        },
        getRoles(): string[]{
          return this.roles
        }
    },
    actions: {
        setToken(token: string): void {
            this.token = token
        },
        setRoles(roles: []): void {
            this.roles = roles
        },
        async login(data: any){
          return new Promise<void>((resolve, reject) =>{
            putUserLogin({...data,password: md5(data.password)}).then(res =>{
                setAuthToken(res.data.authorizationType + ' ' +res.data.authorization)
                this.setToken(res.data.authorizationType + ' ' +res.data.authorization)
                resolve()
            }).catch(error => {
                reject(error)
            })
          })
        },

        getInfo(){
            return new Promise((resolve, reject) => {
              getUserInfo().then(res =>{
                this.username = res.data.username
                this.setRoles(res.data.roles)
                resolve(true)
              })
            })
        },

        async loginOut(){
            return new Promise((resolve, reject) => {
              postLoginOut().then(res =>{
                removeToken()
                this.setToken('')
                resolve(true)
              }).catch(error => {
                reject(error)
              })
            })
        }
    }
})