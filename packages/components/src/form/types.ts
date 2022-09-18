import {Component} from "vue";
import {UploadProps, UploadUserFile} from "element-plus";

type elSize = 'large' | 'default' | 'small'
type elFormLabelPosition = 'left' | 'right' | 'top'

type ColumnType =
    undefined
    | 'text'
    | 'textarea'
    | 'password'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'switch'
    | 'year'
    | 'month'
    | 'date'
    | 'dates'
    | 'datetime'
    | 'week'
    | 'datetimerange'
    | 'daterange'
    | 'monthrange'
    | 'time'
    | 'timeSelect'
    | 'slider'
    | 'rate'
    | 'transfer'
    | 'upload'
    | 'uploadImg'
    | 'uploadImgCard'

interface DicData {
    label: string
    value?: string | number
    key?: string | number
    disabled?: boolean
}

export interface OptionsColumn {
    // public
    prop: string
    component?: string
    value?: any
    type?: ColumnType
    span?: number
    offset?: number
    label?: string
    labelWidth?: string
    labelPosition?: elFormLabelPosition
    labelSuffix?: string
    size?: elSize
    tip?: string
    rules?: object

    display?: true
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean

    placeholder?: string
    props?: object
    data?: Array<DicData>
    dicData?: Array<DicData>

    // type text | password | textarea
    maxlength?: number
    minlength?: number
    // type password
    showPassword?: boolean
    // type textarea
    autosize?: boolean
    rows?: number
    resize?: boolean
    // type select
    multiple?: boolean
    multipleLimit?: boolean
    collapseTags?: boolean
    collapseTagsTooltip?: boolean
    filterable?: boolean
    allowCreate?: boolean
    filterMethod?: () => {}
    remote?: boolean
    remoteMethod?: () => {}
    defaultFirstOption?: boolean
    loadingText?: string

    border?: boolean
    button?: boolean

    action?: string
    headers?: object
    method?: string
    drag?: boolean
    name?: string
    showFileList?: boolean
    limit?: number
    fileList?: Array<UploadUserFile>
    listType?: string
    propsHttp?: {
        url?: string,
        name?: string,
        res?: string,
    }

    onSuccess?: UploadProps['onSuccess']
    onChange?: UploadProps['onChange']
}

export interface LqFormOptions {
    column: Array<OptionsColumn>
    size?: elSize
    gutter?: number
    labelWidth?: string
    labelPosition?: elFormLabelPosition
    labelSuffix?: string
    submitBtn?: boolean
    submitText?: string
    submitIcon?: Component
    emptyBtn?: boolean
    emptyText?: string
    emptyIcon?: Component
}
