
export type FileType = {
    id: Number,
    name: string,
    path: string,
    fullPath: string,
    size: Number,
    type: string,
    deleted: Number,
    height?: Number,
    width?: Number,
    createTime: string,
    updateTime:  string,

}

export type uploadRes = {
    name: string,
    url: string
}