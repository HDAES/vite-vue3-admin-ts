import request from '@/utils/http'

//获取 博客分类
export function getBlogSort(params) {
    return request({
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