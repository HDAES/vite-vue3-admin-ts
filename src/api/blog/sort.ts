import request from '@/utils/http'
import { ResponseList } from 'types/axios'
import { SortType } from './sort.type'

//获取 博客分类
export function getBlogSort(params) {
    return request<ResponseList<SortType>>({
        url: '/admin/blog/sort',
        method: 'get',
        params
    })
}

//添加博客分类
export function postBlogSort(data) {
    return request({
        url: '/admin/blog/sort',
        method: 'post',
        data
    })
}

// 更新博客分类
export function putBlogSort(data) {
    return request({
        url: '/admin/blog/sort',
        method: 'put',
        data
    })
}

// 删除博客分类
export function deleteBlogSort(params) {
    return request({
        url: '/admin/blog/sort',
        method: 'delete',
        params
    })
}