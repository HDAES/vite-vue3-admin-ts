export type Size = 'medium' | 'small' | 'mini'

export type Alignment = 'left' | 'center' | 'right'

export type DeleletType = 'single' | 'multiple'

export type TableConfig = {
    name: string,
    stripe: Boolean,
    border: Boolean,
    size: Size,
    showHeader: Boolean,
    index: Boolean,
    selection: Boolean
}

export type TableColumns = {
    title: string,
    dataIndex: string,
    formatter?: Function,
    align?: Alignment,
    slotname?: string,
    show?: boolean
}

export type ExportConfig = {
    name?: string,
    exprotNum: Number,
}

