import request from '@/utils/http'

//所有角色
export function getAllRoleList() {
    return request({
        url: '/admin/sec/role/all',
        method: 'get',
    })
}