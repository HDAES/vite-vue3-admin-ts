import request from '@/utils/http'

//https://yapi.xujiaji.com/project/27/interface/api/35

//在线用户列表: 
export function getOnline(params) {
    return request({
        url: '/admin/sec/monitor/online/user',
        method: 'get',
        params
    })
}

//批量踢出在线用户
export function deleteKickout(params) {
    return request({
        url: '/admin/sec/monitor/online/user/kickout',
        method: 'DELETE',
        params
    })
}