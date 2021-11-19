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
        hasRole: [],
        username: ''
    }),
    getters: {
        getUserName(): string{
          return this.username
        },
        getRoles(): string[]{
          return this.roles
        },
        getHasRole(): string[]{
          return this.hasRole
        },
    },
    actions: {
        setToken(token: string): void {
          this.token = token
        },
        setRoles(roles: []): void {
          this.roles = roles
        },
        setHasRole(hasRole: []): void {
          let list: any[] = []
          hasRole.forEach(item =>{
            list.push(Object.values(item)[0])
          })
          this.hasRole = list
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
                this.setHasRole(res.data.authorities)
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