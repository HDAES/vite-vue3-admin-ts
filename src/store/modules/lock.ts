import { defineStore } from 'pinia'
import { LOCK_INFO_KEY } from '@/enums/cacheEnum' 
import { LockInfo } from 'types/store'
import { useUserStore } from './user'
import store from 'store'

interface LockState {
    lockInfo: Nullable<LockInfo>;
}

export const useLockStore = defineStore({
    id: 'lock',
    state: (): LockState => ({
        lockInfo: store.get(LOCK_INFO_KEY) as LockInfo,
    }),
    getters: {
        getLockInfo(): Nullable<LockInfo> {
          return this.lockInfo;
        },
    },
    actions: {
        setLockInfo(info: LockInfo) {
            this.lockInfo = Object.assign({}, this.lockInfo, info);
            store.set(LOCK_INFO_KEY, this.lockInfo);
        },
        resetLockInfo() {
            store.remove(LOCK_INFO_KEY);
            this.lockInfo = null;
        },
        unLock(password?: string) {
         
            const userStore = useUserStore();

            if (this.lockInfo?.pwd === password) {
                this.resetLockInfo();
                return true;
            }else{
                return false
            }

            const username = userStore.getUserName;
        }
    }
})