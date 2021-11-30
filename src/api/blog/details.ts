import request from '@/utils/http'
import { BaseDeleteIds, BasePagination, ResponseList } from 'types/axios'
import { DetailsType } from './blog.type'
export * from './blog.type'


//获取名言
export function getBlogDetails(params: BasePagination) {
    return request<ResponseList<DetailsType>>({
        url: '/admin/blog/details',
        method: 'get',
        params
    })
}

//新增名言
export function postBlogDetails(data: DetailsType) {
    return request({
        url: '/admin/blog/details',
        method: 'post',
        data
    })
}

//修改名言
export function putBlogDetails(data: DetailsType) {
    return request({
        url: '/admin/blog/details',
        method: 'put',
        data
    })
}

//删除改名言
export function deleteBlogDetails(params: BaseDeleteIds) {
    return request({
        url: '/admin/blog/details',
        method: 'delete',
        params
    })
}

