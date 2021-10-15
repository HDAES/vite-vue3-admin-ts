import request from '@/utils/http'

//所有角色
export function getAllRoleList() {
    return request({
        url: '/admin/sec/role/all',
        method: 'get',
    })
}

//角色列表
export function getRoleList(params) {
    return request({
        url: '/admin/sec/role/page',
        method: 'get',
        params
    })
}
