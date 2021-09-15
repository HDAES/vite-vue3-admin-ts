/*
 * @Descripttion: 取消重复请求
 * @Author: Hades
 * @Date: 2021-09-15 22:51:30
 */

import axios, { AxiosRequestConfig } from "axios"

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config 
 */
 export const addPending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data)
  ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
      pending.set(url, cancel)
    }
  })
}
/**
 * 移除请求
 * @param {Object} config 
 */
export const removePending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data)
  ].join('&')
  if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel('取消重复请求')
    pending.delete(url)
  }
}
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}