

export interface SortType {
    id?: string,
    name: string,
    icon?: string | null,
    fullImg?: string | null,
    type: Number,
    status: Number,
    deleted?: Number
} 


export interface TagType {
    id?: string,     //标签ID
    sid: string,    //分类ID
    name?: string | null,   //分类名字
    tname?: string,  //标签名字
    ticon: string,  //标签图标
    deleted?: Number, //删除状态

}