export type Size = 'medium' | 'small' | 'mini'

export type Alignment = 'left' | 'center' | 'right'

export type DeleletType = 'single' | 'multiple'

export type UpDateType = 'add' | 'edit'

export type TableConfig = {
    name: string,
    indexName?: string,
    stripe?: Boolean,
    border?: Boolean,
    size?: Size,
    showHeader?: Boolean,
    index?: Boolean,
    selection?: Boolean
}

export type TableColumns = {
    title: string,
    dataIndex: string,
    formatter?: Function,
    align?: Alignment,
    slotname?: string,
    show?: boolean,
    width?: number,
    sortable?: boolean,
    showOverflowTooltip?: boolean
}

export type ExportConfig = {
    name?: string,
    exprotNum: Number,
}



export interface TableActionType {
    handleRefresh: () => void;

}

