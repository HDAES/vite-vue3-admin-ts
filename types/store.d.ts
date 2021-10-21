// Lock screen information
export interface LockInfo {
    // Password required
    pwd?: string | undefined;
    // Is it locked?
    isLock?: boolean;
}

export interface UserState{
    token: string,
    roles: string[],
    permissions: Array<any>,
    username: string
}

export interface LoginRespones {
    authorizationType: string,
    authorization: string
}