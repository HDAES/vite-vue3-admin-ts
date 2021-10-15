import request from '@/utils/http'

export function getPermissionUser() {
    return request({
        url: '/admin/sec/permission/user/tree',
        method: 'get',
    })
}

//获取权限树
export function getPermissionTree(params) {
    return request({
        url: '/admin/sec/permission/tree',
        method: 'get',
        params
    })
}
