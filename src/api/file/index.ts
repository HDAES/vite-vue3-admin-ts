import request from '@/utils/http'

//获取文件列表
export function getFileList(params) {
    return request({
        url: '/file/page',
        method: 'get',
        params
    })
}


export function delelteFile(params) {
    return request({
        url: '/file/delete',
        method: 'delete',
        params
    })
}
