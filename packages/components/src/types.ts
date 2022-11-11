import type {Component} from 'vue'
import {reactive, VNode, VNodeProps} from "vue";
import {UploadProps, UploadUserFile} from "element-plus";

type Size = 'large' | 'default' | 'small'
type Position = 'left' | 'right' | 'top'
type Align = "left" | "center" | "right"
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
  width?: string | number
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
  disabledDate?: (dates: Date) => boolean
  shortcuts?: Array<{ text: string, value: () => Date }>
  defaultTime?: Date | string | Array<Date | string>
  defaultValue?: Date | string | Array<Date | string>

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
  formatter?: (value: string) => string
}

export interface CrudColumn extends Column {
  align?: Align
  headerAlign?: Align
  fixed?: boolean
  formatter?: (row: unknown, column: CrudColumn, cellValue: string | number | boolean, index: number) => string | number | boolean
  search?: boolean
}

interface Options {
  size?: Size
  title?: string
}

export interface LqFormOptions extends FormLabel {
  column: Array<CrudColumn>
  gutter?: number
  step?: number
  enter?: boolean
  menuBtn?: boolean
  menuPosition?: 'start' | 'center' | 'right' | 'space-around' | 'space-between' | 'space-evenly'
  submitBtn?: boolean
  submitText?: string
  submitIcon?: string | Component
  emptyBtn?: boolean
  emptyText?: string
  emptyIcon?: string | Component
}

export interface LqFormOptions extends Options {
}

export const defineLqForm = (options: LqFormOptions) => {
  return reactive(options)
}

type BtnType = "primary" | "success" | "warning" | "danger" | "info"

interface LqCrudPermissions extends Options {
  addBtn?: boolean
  addBtnText?: string
  addBtnType?: BtnType
  addBtnIcon?: string | Component
  editBtn?: boolean
  editBtnText?: string
  editBtnType?: BtnType
  editBtnIcon?: string | Component
  delBtn?: boolean
  delBtnText?: string
  delBtnType?: BtnType
  delBtnIcon?: string | Component
  viewBtn?: boolean
  viewBtnText?: string
  viewBtnType?: BtnType
  viewBtnIcon?: string | Component

  menu?: boolean
  menuWidth?: number
  menuTitle?: string
  menuFixed?: boolean
  menuType?: "button" | "icon" | "text" | "menu"
  menuAlign?: Align

  index?: boolean
  indexWidth?: number
  indexFixed?: boolean
  expand?: boolean
  expandWidth?: number
  expandFixed?: boolean
  selection?: boolean
  selectionWidth?: number
  selectionFixed?: boolean
  reserveSelection?: boolean

  searchBtn?: boolean
  searchBtnText?: string
  searchBtnIcon?: string | Component
  emptyBtn?: boolean
  emptyBtnText?: string
  emptyBtnIcon?: string | Component
  searchShow?: boolean

  printBtn?: boolean
  excelBtn?: boolean
  refreshBtn?: boolean
  searchShowBtn?: boolean
  copyBtn?: boolean

  addTitle?: string
  editTitle?: string
  viewTitle?: string
}

export interface LqCrudOptions extends LqCrudPermissions {
  column: Array<CrudColumn>
  rowHeight?: string
  headerHeight?: string

  stripe?: boolean
  border?: boolean
  card?: boolean

  rowKey?: string | ((row: any) => string)

  dialogType?: 'dialog' | 'drawer'
  dialogDirection?: 'rtl' | 'ltr' | 'ttb' | 'tbb'
  dialogWidth?: string
  dialogTop?: string
  dialogModal?: boolean
  dialogDrag?: boolean
  dialogFullscreen?: boolean
  dialogCloseBtn?: boolean
  dialogEscape?: boolean
}

export const defineLqCrud = (options: LqCrudOptions) => {
  return reactive(options)
}
