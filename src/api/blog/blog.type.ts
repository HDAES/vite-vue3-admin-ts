

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

export interface SayingType {
    id?: string;
    content: string;
    author: string;
    deleted?: Number;
    createTime?: string;
    updateTime?: string;
}

export interface DetailsType {
    id?: string;
    sid?: string;   //分类ID
    name?: string;  //分类名字
    tid?: string;
    tname?: string;
    title: string;
    des: string;
    fullImage?: string;
    source: Number;
    type: Number;
    orderIn: Number;
    createTime?: string;
    updateTime?: string
}

export interface ContentType {
    id?: string;
    likeCount: Number;
    path?: string | null;
    readCount: Number;
    content: string;
    createTime?: string;
    updateTime?: string
}