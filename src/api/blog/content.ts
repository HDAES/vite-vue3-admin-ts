import request from '@/utils/http'
import { AxiosResponse } from 'axios'
import { ContentType } from './blog.type'
export * from './blog.type'


//获取文章内容
export function getBlogContent(params) {
    return request<AxiosResponse<ContentType>>({
        url: '/admin/blog/content/byid',
        method: 'get',
        params
    })
}


export function postBlogContent(data: ContentType){
    return request({
        url: '/admin/blog/content',
        method: 'post',
        data
    })
}

export function putBlogContent(data: ContentType){
    return request({
        url: '/admin/blog/content',
        method: 'put',
        data
    })
}