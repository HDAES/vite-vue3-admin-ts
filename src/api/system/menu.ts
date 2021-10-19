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

//删除权限
export function deletePermission(params) {
    return request({
        url: '/admin/sec/permission/del',
        method: 'DELETE',
        params
    })
}

//添加权限
export function postPermissionAdd(data) {
    return request({
        url: '/admin/sec/permission/add',
        method: 'post',
        data
    })
}

//编辑权限
export function putPermissionEdit(data) {
    return request({
        url: '/admin/sec/permission/edit',
        method: 'put',
        data
    })
}