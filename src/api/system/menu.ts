import request from '@/utils/http'

export function getPermissionUser() {
    return request({
        url: '/admin/sec/permission/user/tree',
        method: 'get',
    })
}
