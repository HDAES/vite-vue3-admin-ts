
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


declare module 'axios' {
    export interface AxiosRequestConfig{
        version?: string, //版本号
        loading?: Boolean, //全局loading
        isToken?: Boolean,
        isMock?: Boolean
    }
}



export interface ResponseLists<T> {
    code: Number,
    data: {
        list: T[],
        page: Number,
        pages: Number,
        size: Number,
        total: Number
    },
    message: string
    
}

export interface ResponseList {
    code: Number,
    data: {
        list: any[],
        page: Number,
        pages: Number,
        size: Number,
        total: Number
    },
    message: string
    
}
export interface List{
    list: any[],
    page: Number,
    pages: Number,
    size: Number,
    total: Number
}