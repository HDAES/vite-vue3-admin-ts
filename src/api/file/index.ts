import { FileType } from '@/components/UploadMedia/media.type'
import request from '@/utils/http'

import { BasePagination, ResponseList } from 'types/axios'

//获取文件列表
export function getFileList(params: BasePagination) {
    return request<ResponseList<FileType>>({
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

//上传文件
export function postFile(data) {
    return request({
        url: '/file/oss',
        method: 'post',
        isForm: true,
        data
    })
}