import request from '@/utils/http'
import { AxiosResponse } from 'axios'
import { BaseDeleteIds, BasePagination, ResponseList } from 'types/axios'
import { ContentType } from './blog.type'
export * from './blog.type'


//获取名言
export function getBlogContent(params) {
    return request<AxiosResponse<ContentType>>({
        url: '/admin/blog/content/byid',
        method: 'get',
        params
    })
}
