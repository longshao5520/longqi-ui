import {Component, reactive} from "vue";
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
    | 'upload'
    | 'uploadImg'
    | 'uploadImgCard'
    | 'rate'
    | 'switch'
    | 'number'
    | 'slider'
    | 'transfer'

interface FormLabel {
    labelWidth?: string
    labelPosition?: elFormLabelPosition
    labelSuffix?: string
}

interface FormColumnPublic extends FormLabel {
    prop: string
    component?: string
    label?: string
    value?: any
    type?: ColumnType
    span?: number
    offset?: number
    size?: elSize
    tip?: string
    rules?: object

    // 控制
    display?: true
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean

    placeholder?: string
    props?: object
    data?: Record<string, any>
    dicData?: Array<Record<string, any>>
}

export interface FormColumn extends FormColumnPublic {
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

    // type upload
    action?: string
    headers?: object
    method?: string
    drag?: boolean
    showThumbnail?: boolean
    name?: string
    showFileList?: boolean
    limit?: number
    fileList?: Array<UploadUserFile>
    listType?: string
    propsHttp?: Record<string, any>
    httpRequest?: UploadProps['httpRequest']
    onSuccess?: UploadProps['onSuccess']
    onChange?: UploadProps['onChange']
}

export interface LqFormOptions extends FormLabel {
    column: Array<FormColumn>
    size?: elSize
    gutter?: number
    submitBtn?: boolean
    submitText?: string
    submitIcon?: Component
    emptyBtn?: boolean
    emptyText?: string
    emptyIcon?: Component
}

export const defineLqForm = (options: LqFormOptions) => {
    return reactive(options)
}
