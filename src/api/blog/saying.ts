import request from '@/utils/http'
import { AxiosResponse } from 'axios'
import { BaseDeleteIds, BasePagination, ResponseList } from 'types/axios'
import { SayingType } from './blog.type'
export * from './blog.type'


//获取名言
export function getBlogSaying(params: BasePagination) {
    return request<ResponseList<SayingType>>({
        url: '/admin/blog/saying',
        method: 'get',
        params
    })
}

//新增名言
export function postBlogSaying(data: SayingType) {
    return request({
        url: '/admin/blog/saying',
        method: 'post',
        data
    })
}

//修改名言
export function putBlogSaying(data: SayingType) {
    return request({
        url: '/admin/blog/saying',
        method: 'put',
        data
    })
}

//删除改名言
export function deleteBlogSaying(params: BaseDeleteIds) {
    return request({
        url: '/admin/blog/saying',
        method: 'delete',
        params
    })
}

