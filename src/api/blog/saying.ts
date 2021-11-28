import request from '@/utils/http'
import { AxiosResponse } from 'axios'
import { BaseDeleteIds, BasePagination, ResponseList } from 'types/axios'
import { SayingType } from './blog.type'
export * from './blog.type'


//获取博客分类
export function getBlogSaying(params: BasePagination) {
    return request<ResponseList<SayingType>>({
        url: '/admin/blog/saying',
        method: 'get',
        params
    })
}

