interface OptionsColumn {
    // public
    prop: string
    type?: undefined | 'text' | 'textarea' | 'password' | 'select' | 'checkbox' | 'radio'
    span?: number
    offset?: number
    label?: string
    labelWidth?: string
    labelPosition?: 'left' | 'right' | 'top'
    size?: 'large' | 'default' | 'small'
    rules?: object

    visible?: true
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean

    placeholder?: string
    dicData?: {
        label: string
        value: string
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
    defaultFirstOption?:boolean
    loadingText?: string

    border?: boolean
    button?: boolean
}

export interface LqFormOptions {
    size?: 'large' | 'default' | 'small'
    gutter?: number
    labelWidth?: string
    labelPosition?: 'left' | 'right' | 'top'
    rules?: object
    column: Array<OptionsColumn>
}
