
import { AxiosRequestConfig } from 'axios';

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface AxiosRequest {
    baseURL?: string,
    url: string,
    data?: any,
    params?: any,
    method: Method,
    show?: any
}

export interface MyAxiosRequestConfig extends AxiosRequestConfig{
    v: string
}