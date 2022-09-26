import {LqFormOptions, FormColumn} from "./types";
import {useProp} from "element-plus";
import {cloneDeep, isNil, pickBy} from "lodash";
import {Delete, Select} from '@element-plus/icons-vue'
import {markRaw} from 'vue'

const INPUT_LIST = ["text", "input", "textarea", "password", undefined]
const DATE_LIST = ['year', 'month', 'date', 'dates', 'datetime', 'week', 'datetimerange', 'daterange', 'monthrange']
const publicAttribute = ['clearable', 'disabled', 'size', 'readonly', 'autofocus', 'validateEvent', 'rules']
const inputAttribute = publicAttribute.concat(['type', 'maxlength', 'minlength', 'showWordLimit', 'showPassword', 'prefixIcon', 'suffixIcon', 'rows', 'autosize', 'resize'])
const selectAttribute = publicAttribute.concat(['multiple', 'valueKey', 'collapseTags', 'collapseTagsTooltip', 'multipleLimit', 'effect', 'filterable', 'allowCreate', 'filterMethod', 'remote', 'remoteMethod', 'loading', 'loadingText', 'noMatchText', 'noDataText', 'popperClass', 'reserveKeyword', 'defaultFirstOption', 'persistent', 'automaticDropdown', 'clearIcon', 'fitInputWidth', 'suffixIcon', 'suffixTransition', 'tagType', 'placement'])
const dateAttribute = publicAttribute.concat(['type', 'editable', 'rangeSeparator', 'startPlaceholder', 'endPlaceholder', 'format', 'valueFormat', 'disabledDate', 'shortcuts'])
const rateAttribute = publicAttribute.concat(['max', 'allowHalf', 'lowThreshold', 'highThreshold', 'colors', 'voidColor', 'disabledVoidColor', 'icons', 'voidIcon', 'disabledVoidIcon', 'showText', 'showScore', 'textColor', 'texts', 'scoreTemplate'])
const switchAttribute = publicAttribute.concat(['loading', 'width', 'inlinePrompt', 'activeIcon', 'inactiveIcon', 'activeText', 'inactiveText', 'activeValue', 'inactiveValue', 'activeColor', 'inactiveColor', 'borderColor', 'name', 'beforeChange'])
const numberAttribute = publicAttribute.concat(['min','max','step','stepStrictly', 'precision','controls','controlsPosition','valueOnClear'])
const sliderAttribute = publicAttribute.concat(['min','max','step','showInput', 'showInputControls','inputSize','showStops','showTooltip', 'formatTooltip','range','vertical','height', 'rangeStartLabel','rangeEndLabel','formatValueText','debounce', 'tooltipClass', 'placement', 'marks'])
const transferAttribute = publicAttribute.concat(['data','filterable','filterPlaceholder','filterMethod', 'targetOrder','titles','buttonTexts','renderContent', 'format','props','leftDefaultChecked','rightDefaultChecked'])

    export const useForm = () => {
    let options = useProp<LqFormOptions>('option').value as LqFormOptions

    // 配置初始化
    const defaultOption = {
        size: 'default',
        labelWidth: '80px',
        labelPosition: 'right',
        labelSuffix: ':',
        submitBtn: true,
        submitText: '提交',
        submitIcon: markRaw(Select),
        emptyBtn: true,
        emptyText: '清空',
        emptyIcon: markRaw(Delete),
    }
    Object.assign(options, defaultOption)

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

    // 过滤有效属性
    const filterAttributes = (pattern: FormColumn) => {
        let result
        if (INPUT_LIST.includes(pattern.type)) {
            result = pickBy(pattern, (value, key) => inputAttribute.includes(key))
            if (isNil(result.placeholder)) {
                result.placeholder = "请输入 " + pattern.label;
            }
        } else if (pattern.type == 'select') {
            result = pickBy(pattern, (value, key) => selectAttribute.includes(key))
            if (isNil(result.placeholder)) {
                result.placeholder = "请选择 " + pattern.label;
            }
        } else if (DATE_LIST.includes(pattern.type as string)) {
            result = pickBy(pattern, (value, key) => dateAttribute.includes(key))
            if (isNil(result.placeholder)) {
                result.placeholder = "请选择 " + pattern.label;
            }
        } else if (pattern.type == 'rate') {
            result = pickBy(pattern, (value, key) => rateAttribute.includes(key))
        } else if (pattern.type == 'switch') {
            result = pickBy(pattern, (value, key) => switchAttribute.includes(key))
        } else if (pattern.type == 'number') {
            result = pickBy(pattern, (value, key) => numberAttribute.includes(key))
        } else if (pattern.type == 'slider') {
            result = pickBy(pattern, (value, key) => sliderAttribute.includes(key))
        } else if (pattern.type == 'transfer') {
            result = pickBy(pattern, (value, key) => transferAttribute.includes(key))
        } else {
            result = pickBy(pattern, (value, key) => !['display', 'label', 'prop', 'value'].includes(key))
        }
        return cloneDeep(result)
    }

    // 获取表单组件
    const getComponent = (item: FormColumn) => {
        if (!isNil(item.component)) {
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

    const formInitVal = (list: Array<FormColumn>) => {
        let value = {} as any;
        list.map(ele => {
            if (!isNil(ele.value)) {
                value[ele.prop] = ele.value;
            } else if (ele.type?.includes('upload')) {
                value[ele.prop] = []
            }
        });
        return value;
    }

    let form = Object.assign(modelValue, cloneDeep(formInitVal(options.column)))

    return {options, form, isDate, getComponent, getMultipleOptionsComponent, filterAttributes}
}
