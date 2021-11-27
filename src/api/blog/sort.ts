import request from '@/utils/http'
import { AxiosResponse } from 'axios'
import { BaseDeleteIds, BasePagination, ResponseList } from 'types/axios'
import { SortType } from './blog.type'

//获取博客分类
export function getBlogSort(params: BasePagination) {
    return request<ResponseList<SortType>>({
        url: '/admin/blog/sort',
        method: 'get',
        params
    })
}
//获取所有博客分类
export function getBlogSortAll() {
    return request<AxiosResponse<SortType[]>>({
        url: '/admin/blog/sort/all',
        method: 'get',
    })
}


//添加博客分类
export function postBlogSort(data: SortType) {
    return request({
        url: '/admin/blog/sort',
        method: 'post',
        data
    })
}

// 更新博客分类
export function putBlogSort(data: SortType) {
    return request({
        url: '/admin/blog/sort',
        method: 'put',
        data
    })
}

// 删除博客分类
export function deleteBlogSort(params: BaseDeleteIds) {
    return request({
        url: '/admin/blog/sort',
        method: 'delete',
        params
    })
}