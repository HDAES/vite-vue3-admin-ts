import request from '@/utils/http'

//得到验证码: https://yapi.xujiaji.com/project/27/interface/api/113
export function getVerifyCode() {
    return request({
        url: '/admin/sec/user/verifyCode',
        method: 'get'
    })
}

export function getVerifyCodes() {
    return request({
        url: '/getUserInfo',
        method: 'get',
        isMock: true
    })
}