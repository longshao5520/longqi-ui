export interface OptionsColumn {
    // public
    prop: string
    value?: any
    type?: undefined | 'text' | 'textarea' | 'password' | 'select' | 'checkbox' | 'radio'
    span?: number
    offset?: number
    label?: string
    labelWidth?: string
    labelPosition?: 'left' | 'right' | 'top'
    size?: 'large' | 'default' | 'small'
    rules?: object

    display?: true
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean

    placeholder?: string
    dicData?: {
        label: string
        value: string | number
    }[]

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
}

export interface LqFormOptions {
    width?: string
    size?: 'large' | 'default' | 'small'
    gutter?: number
    labelWidth?: string
    labelPosition?: 'left' | 'right' | 'top'
    rules?: object
    column: Array<OptionsColumn>
}

import {reactive} from 'vue'

export const defineOptions = (options: LqFormOptions) => {
    options = reactive(options);
    options.size = options.size ? options.size : "default";
    options.labelWidth = options.labelWidth ? options.labelWidth : "80px";
    options.labelPosition = options.labelPosition ? options.labelPosition : "right";
    options.column.map(item => {
        // item.display = item.display || true;
        item.clearable = item.clearable || true;
        if (["text", "textarea", "password", undefined].includes(item.type)) {
            item.placeholder = item.placeholder || "请输入 " + item.label;
        } else if (item.type === "select") {
            item.placeholder = item.placeholder || "请选择 " + item.label;
        }
    });

    return options;
}
