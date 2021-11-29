import request from '@/utils/http'
import { AxiosResponse } from 'axios'
import { BaseDeleteIds, BasePagination, ResponseList } from 'types/axios'
import { TagType } from './blog.type'


//获取 博客分类
export function getBlogTags(params: BasePagination) {
    return request<ResponseList<TagType>>({
        url: '/admin/blog/tag',
        method: 'get',
        params
    })
}

export function getBlogTagsByID(params) {
    return request<AxiosResponse<TagType[]>>({
        url: '/admin/blog//tag/bid',
        method: 'get',
        params
    })
}


//添加分类标签
export function postBlogTags(data: TagType) {
    return request({
        url: '/admin/blog/tag',
        method: 'post',
        data
    })
}

//修改分类标签
export function putBlogTags(data: TagType) {
    return request({
        url: '/admin/blog/tag',
        method: 'put',
        data
    })
}


// 删除分类标签
export function deleteBlogTag(params: BaseDeleteIds) {
    return request({
        url: '/admin/blog/tag',
        method: 'delete',
        params
    })
}