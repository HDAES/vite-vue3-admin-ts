
import request from '@/utils/http'

//角色列表
export function getUserList(params) {
    return request({
        url: '/admin/sec/user/page',
        method: 'get',
        params
    })
}

//管理员添加
export function postUserAdd(data) {
    return request({
        url: '/admin/sec/user/add',
        method: 'post',
        data
    })
}

//管理员删除
export function deleteUser(params) {
    return request({
        url: '/admin/sec/user',
        method: 'delete',
        params
    })
}

//管理员编辑
export function putUser(data) {
    return request({
        url: '/admin/sec/user/edit',
        method: 'put',
        data
    })
}

//禁用或启用管理员
export function putUserStatus(data) {
    return request({
        url: '/admin/sec/user/status',
        method: 'put',
        data
    })
}

