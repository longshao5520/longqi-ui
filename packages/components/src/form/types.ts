import {Component, reactive} from "vue";
import {UploadProps, UploadUserFile} from "element-plus";

type Size = 'large' | 'default' | 'small'
type Position = 'left' | 'right' | 'top'
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
    labelPosition?: Position
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
    size?: Size
    tip?: string
    rules?: object
    name?: string

    // 控制
    display?: true
    disabled?: boolean
    clearable?: boolean

    placeholder?: string
    props?: object
    data?: Record<string, any>
    dicData?: Array<Record<string, any>>
}

interface Column extends FormColumnPublic {
    action?: string
    headers?: object
    method?: string
    drag?: boolean
    autoUpload?: boolean
    showThumbnail?: boolean
    showFileList?: boolean
    limit?: number
    fileList?: Array<UploadUserFile>
    listType?: string
    propsHttp?: Record<string, any>
    httpRequest?: UploadProps['httpRequest']
    onPreview?: UploadProps['onPreview']
    onRemove?: UploadProps['onRemove']
    onSuccess?: UploadProps['onSuccess']
    onError?: UploadProps['onError']
    onProgress?: UploadProps['onProgress']
    onChange?: UploadProps['onChange']
    onExceed?: UploadProps['onExceed']
    beforeUpload?: UploadProps['beforeUpload']
    beforeRemove?: UploadProps['beforeRemove']
}

interface Column {
    multiple?: boolean
    multipleLimit?: boolean
    valueKey?: string
    collapseTags?: boolean
    collapseTagsTooltip?: boolean
    effect?: 'dark' | 'light'
    filterable?: boolean
    allowCreate?: boolean
    filterMethod?: () => {}
    remote?: boolean
    remoteMethod?: () => {}
    loading?: boolean
    loadingText?: string
    noMatchText?: string
    noDataText?: string
    popperClass?: string
    reserveKeyword?: boolean
    defaultFirstOption?: boolean
    persistent?: boolean
    automaticDropdown?: boolean
    fitInputWidth?: boolean
    suffixTransition?: boolean
    tagType?: string
    placement?: string
    clearIcon?: string | Component
}

interface ColumnEvent {
    blur?: (event: FocusEvent) => {}
    focus?: (event: FocusEvent) => {}
    change?: (value: string | number) => {}
    input?: (value: string | number) => {}
    clear?: () => {}
    visibleChange?: (value: boolean) => {}
    removeTag?: (value: string | number) => {}
    calendarChange?: (value: Date[]) => {}
    panelChange?: (date: Date, mode: 'month' | 'year', view: string) => {}
    leftCheckChange?: (key: string | number, keys: Array<string | number>) => {}
    rightCheckChange?: (key: string | number, keys: Array<string | number>) => {}
}


interface Column extends ColumnEvent {
    // type text | password | textarea | number
    readonly?: boolean
    // type text | password | textarea | select
    suffixIcon?: string | Component
    // type text | password | textarea
    tabindex?: string | number
    autofocus?: boolean
    maxlength?: number
    minlength?: number
    prefixIcon?: string | Component
    inputStyle?: CSSStyleDeclaration
    // type text | textarea
    showWordLimit?: boolean
    // type text
    formatter?: (value: string) => string
    parser?: (value: string) => string
    // type password
    showPassword?: boolean
    // type textarea
    autosize?: boolean
    rows?: number
    resize?: boolean
    // type number
    min?: number
    max?: number
    step?: number
    stepStrictly?: boolean
    precision?: number
    controls?: boolean
    controlsPosition?: string
    valueOnClear?: string | number



    border?: boolean
    button?: boolean
}

export interface FormColumn extends Column {
}

export interface LqFormOptions extends FormLabel {
    column: Array<FormColumn>
    size?: Size
    gutter?: number
    step?: number
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
