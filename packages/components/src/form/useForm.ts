import {CrudColumn, FormColumn, LqFormOptions} from "../types";
import {useProp} from "element-plus";
import lodash from "lodash";
import {Delete, Select} from '@element-plus/icons-vue'
import {markRaw} from 'vue'

const INPUT_LIST = ["text", "input", "textarea", "password", undefined]
const DATE_LIST = ['year', 'month', 'date', 'dates', 'datetime', 'week', 'datetimerange', 'daterange', 'monthrange']
const UPLOAD_LIST = ['upload', 'uploadImg', 'uploadImgCard']
const publicAttribute = ['clearable', 'disabled', 'size', 'readonly', 'autofocus', 'validateEvent', 'rules']
const inputAttribute = publicAttribute.concat(['type', 'maxlength', 'minlength', 'showWordLimit', 'showPassword', 'prefixIcon', 'suffixIcon', 'rows', 'autosize', 'resize'])
const selectAttribute = publicAttribute.concat(['multiple', 'valueKey', 'collapseTags', 'collapseTagsTooltip', 'multipleLimit', 'effect', 'filterable', 'allowCreate', 'filterMethod', 'remote', 'remoteMethod', 'loading', 'loadingText', 'noMatchText', 'noDataText', 'popperClass', 'reserveKeyword', 'defaultFirstOption', 'persistent', 'automaticDropdown', 'clearIcon', 'fitInputWidth', 'suffixIcon', 'suffixTransition', 'tagType', 'placement'])
const dateAttribute = publicAttribute.concat(['type', 'editable', 'rangeSeparator', 'startPlaceholder', 'endPlaceholder', 'format', 'valueFormat', 'disabledDate', 'shortcuts', 'defaultTime', 'defaultValue'])
const rateAttribute = publicAttribute.concat(['max', 'allowHalf', 'lowThreshold', 'highThreshold', 'colors', 'voidColor', 'disabledVoidColor', 'icons', 'voidIcon', 'disabledVoidIcon', 'showText', 'showScore', 'textColor', 'texts', 'scoreTemplate'])
const switchAttribute = publicAttribute.concat(['loading', 'width', 'inlinePrompt', 'activeIcon', 'inactiveIcon', 'activeText', 'inactiveText', 'activeValue', 'inactiveValue', 'activeColor', 'inactiveColor', 'borderColor', 'name', 'beforeChange'])
const numberAttribute = publicAttribute.concat(['min', 'max', 'step', 'stepStrictly', 'precision', 'controls', 'controlsPosition', 'valueOnClear'])
const sliderAttribute = publicAttribute.concat(['min', 'max', 'step', 'showInput', 'showInputControls', 'inputSize', 'showStops', 'showTooltip', 'formatTooltip', 'range', 'vertical', 'height', 'rangeStartLabel', 'rangeEndLabel', 'formatValueText', 'debounce', 'tooltipClass', 'placement', 'marks'])
const transferAttribute = publicAttribute.concat(['data', 'filterable', 'filterPlaceholder', 'filterMethod', 'targetOrder', 'titles', 'buttonTexts', 'renderContent', 'format', 'props', 'leftDefaultChecked', 'rightDefaultChecked'])

export const useForm = () => {
    let options = useProp<LqFormOptions>('option').value as LqFormOptions

    // 配置初始化
    const defaultOption = {
        size: 'default',
        labelWidth: '100px',
        labelPosition: 'right',
        labelSuffix: ':',
        menuBtn: true,
        menuPosition: "center",
        submitBtn: true,
        submitText: '提交',
        submitIcon: markRaw(Select),
        emptyBtn: true,
        emptyText: '清空',
        emptyIcon: markRaw(Delete),
    }
    lodash.defaults(options, defaultOption)

    options.column.map(item => {
        item.clearable = item.clearable || true;
        item.display = item.display || true;
        if (item.type === 'transfer') {
            item.data = item.dicData
            item.props = item.props || {
                key: "value",
                label: "label"
            }
        }
    });

    const isDate = (type: string) => DATE_LIST.includes(type)
    const isUpload = (type: string) => UPLOAD_LIST.includes(type)

    // 过滤有效属性
    const filterAttributes = (pattern: FormColumn) => {
        let result
        if (INPUT_LIST.includes(pattern.type)) {
            result = lodash.pickBy(pattern, (value, key) => inputAttribute.includes(key))
            if (lodash.isNil(result.placeholder)) {
                result.placeholder = "请输入 " + pattern.label;
            }
        } else if (pattern.type == 'select') {
            result = lodash.pickBy(pattern, (value, key) => selectAttribute.includes(key))
            if (lodash.isNil(result.placeholder)) {
                result.placeholder = "请选择 " + pattern.label;
            }
        } else if (DATE_LIST.includes(pattern.type as string)) {
            result = lodash.pickBy(pattern, (value, key) => dateAttribute.includes(key))
            if (lodash.isNil(result.placeholder)) {
                result.placeholder = "请选择 " + pattern.label;
            }
            if (pattern.type?.includes('range')) {
                result.startPlaceholder = result.startPlaceholder || "开始"
                result.endPlaceholder = result.endPlaceholder || "结束"
            }
        } else if (pattern.type == 'rate') {
            result = lodash.pickBy(pattern, (value, key) => rateAttribute.includes(key))
        } else if (pattern.type == 'switch') {
            result = lodash.pickBy(pattern, (value, key) => switchAttribute.includes(key))
        } else if (pattern.type == 'number') {
            result = lodash.pickBy(pattern, (value, key) => numberAttribute.includes(key))
            if (lodash.isNil(result.placeholder)) {
                result.placeholder = "请输入 " + pattern.label;
            }
        } else if (pattern.type == 'slider') {
            result = lodash.pickBy(pattern, (value, key) => sliderAttribute.includes(key))
        } else if (pattern.type == 'transfer') {
            result = lodash.pickBy(pattern, (value, key) => transferAttribute.includes(key))
        } else if (pattern.type == 'time' || pattern.type == 'timeSelect') {
            result = lodash.pickBy(pattern, (value, key) => !['display', 'label', 'prop', 'value'].includes(key))
            if (lodash.isNil(result.placeholder)) {
                result.placeholder = "请选择 " + pattern.label;
            }
        } else {
            result = lodash.pickBy(pattern, (value, key) => !['display', 'label', 'prop', 'value'].includes(key))
        }
        return lodash.cloneDeep(result)
    }

    // 获取表单组件
    const getComponent = (item: FormColumn) => {
        if (!lodash.isNil(item.component)) {
            return item.component
        } else if (INPUT_LIST.includes(item.type)) {
            return "el-input";
        } else if (item.type === "number") {
            return "el-input-number";
        } else if (item.type === "checkbox" || item.type === "radio") {
            return `el-${item.type}-group`;
        } else if (item.type === 'time') {
            return `el-time-picker`;
        } else if (item.type === 'timeSelect') {
            return `el-time-select`;
        } else {
            return `el-${item.type}`;
        }
    };

    // 获取 select checkbox radio 的子级组件
    const getMultipleOptionsComponent = (item: FormColumn) => {
        if (item.type === "select") {
            return "el-option";
        } else if ((item.type === "checkbox" || item.type === "radio") && item.button) {
            return `el-${item.type}-button`;
        } else {
            return `el-${item.type}`;
        }
    };

    let modelValue = useProp<LqFormOptions>('modelValue').value as any

    const formInitVal = (list: Array<CrudColumn>) => {
        let value = {} as any;
        list.map(ele => {
            if (!lodash.isNil(ele.value)) {
                value[ele.prop] = ele.value;
            } else if (ele.type?.includes('upload')) {
                value[ele.prop] = []
            }
        });
        return value;
    }

    let form = lodash.defaults(modelValue, lodash.cloneDeep(formInitVal(options.column)))
    console.log(form)

    return {options, form, isDate, isUpload, getComponent, getMultipleOptionsComponent, filterAttributes}
}
