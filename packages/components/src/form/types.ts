import {Component, reactive, VNode, VNodeProps} from "vue";
import {UploadProps, UploadUserFile} from "element-plus";

type Size = 'large' | 'default' | 'small'
type Position = 'left' | 'right' | 'top'
type ColumnType =
    undefined
    | 'input'
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

// upload
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

// select
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

interface Mark {
    style: CSSStyleDeclaration
    label: string
}

type Marks = Record<number, Mark | string>


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
    step?: number | string
    stepStrictly?: boolean
    precision?: number
    controls?: boolean
    controlsPosition?: string
    valueOnClear?: string | number

    // type radio | checkbox | rate
    textColor?: string
    // type radio | checkbox
    fill?: string
    border?: boolean
    button?: boolean

    // type all date and time
    editable?: boolean
    rangeSeparator?: string
    startPlaceholder?: string
    endPlaceholder?: string
    format?: string
    valueFormat?: string
    disabledDate?: (dates: Date[]) => boolean
    shortcuts?: () => Array<{ text: string, value: Date }>

    // type time
    isRange?: boolean
    arrowControl?: boolean
    disabledHours?: () => number[]
    disabledMinutes?: () => number[]
    disabledSeconds?: () => number[]

    // type timeSelect
    start?: string
    end?: string
    minTime?: string
    maxTime?: string

    // type rate
    allowHalf?: boolean
    lowThreshold?: number
    highThreshold?: number
    colors?: Array<string> | Record<number, string>
    voidColor?: string
    disabledVoidColor?: string
    icons?: Array<Component> | Record<number, Component>
    voidIcon?: Component
    disabledVoidIcon?: Component
    showText?: boolean
    showScore?: boolean
    texts?: Array<string>
    scoreTemplate?: string

    // type switch
    inlinePrompt?: boolean
    activeIcon?: Component
    inactiveIcon?: Component
    activeText?: string
    inactiveText?: string
    activeValue?: string | number | boolean
    inactiveValue?: string | number | boolean
    inactiveColor?: string
    borderColor?: string
    beforeChange?: () => Promise<boolean> | boolean

    // type slider
    showInput?: boolean
    showInputControls?: boolean
    inputSize?: Size
    showStops?: boolean
    showTooltip?: boolean
    formatTooltip?: (value: string) => string
    range?: boolean
    vertical?: boolean
    height?: string
    rangeStartLabel?: string
    rangeEndLabel?: string
    formatValueText?: (value: string) => string
    debounce?: number
    tooltipClass?: string
    marks?: Marks

    // type transfer
    filterPlaceholder?: string
    targetOrder?: 'original' | 'push' | 'unshift'
    titles?: Array<string>
    buttonTexts?: Array<string>
    renderContent?: (
        h: (type: string, props: VNodeProps | null, children?: string) => VNode,
        option: {
            key: number
            label: string
            disabled: boolean
        }) => ((type: string, props: VNodeProps | null, children?: string) => VNode)
    leftDefaultChecked?: number[]
    rightDefaultChecked?: number[]
}

export interface FormColumn extends Column {
}

export interface LqFormOptions extends FormLabel {
    column: Array<FormColumn>
    size?: Size
    gutter?: number
    step?: number
    menuBtn?: boolean
    menuPosition?: 'start' | 'center' | 'right' | 'space-around' | 'space-between' | 'space-evenly'
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
