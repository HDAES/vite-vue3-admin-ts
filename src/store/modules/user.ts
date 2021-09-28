import { putUserLogin } from '@/api/system/login'
import { setToken as setAuthToken, getToken } from '@/utils/auth'
import md5 from 'md5'
import { defineStore } from 'pinia'


interface UserState{
    token: string,
    roles: Array<any>,
    permissions: Array<any>,
    username: string
}

interface LoginRespones {
    authorizationType: string,
    authorization: string
}

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
        getRoles():  Array<any>{
          return this.roles
        }
    },
    actions: {
        setToken(token: string): void {
            this.token = token
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
        }
    }
})