
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
        isMock?: Boolean,
        isForm?: boolean
    }

    export interface AxiosInstance {
        <T = any>(config: AxiosRequestConfig): Promise<T>;
        request<T = any> (config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    }
}


export interface ResponseList<T> {
    list: T[],
    page: Number,
    pages: Number,
    size: Number,
    total: Number
}

//分页请求
export interface BasePagination {
    page:Number,
    size: Number
}

//删除请求
export interface BaseDeleteIds {
    ids: string
}