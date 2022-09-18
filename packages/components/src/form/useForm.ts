import {LqFormOptions, OptionsColumn} from "./types";
import {useProp} from "element-plus";
import {cloneDeep, isNil, pickBy} from "lodash";
import {Delete, Select} from '@element-plus/icons-vue'
import {markRaw} from 'vue'

const INPUT_LIST = ["text", "input", "textarea", "password", undefined]
const DATE_LIST = ['year', 'month', 'date', 'dates', 'datetime', 'week', 'datetimerange', 'daterange', 'monthrange']
const publicAttribute = ['clearable', 'disabled', 'size', 'readonly', 'autofocus', 'validateEvent', 'rules']
const inputAttribute = publicAttribute.concat(['type', 'maxlength', 'minlength', 'showWordLimit', 'showPassword', 'prefixIcon', 'suffixIcon', 'rows', 'autosize', 'resize'])
const selectAttribute = publicAttribute.concat(['multiple', 'valueKey', 'collapseTags', 'collapseTagsTooltip', 'multipleLimit', 'effect', 'filterable', 'allowCreate', 'filterMethod', 'remote', 'remoteMethod', 'loading', 'loadingText', 'noMatchText', 'no-data-text', 'popper-class', 'reserveKeyword', 'defaultFirstOption', 'persistent', 'automaticDropdown', 'clearIcon', 'fitInputWidth', 'suffixIcon', 'tagType'])
const dateAttribute = publicAttribute.concat(['type', 'editable', 'rangeSeparator', 'startPlaceholder', 'endPlaceholder', 'format'])

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

    const propsHttp = {
        url: "url",
        name: "fileName",
        res: "data",
    }
    options.column.map(item => {
        item.clearable = item.clearable || true;
        item.display = item.display || true;
        if (item.type === 'transfer') {
            item.data = item.dicData
            item.props = {
                key: "value",
                label: "label"
            }
        }
        if (item.type === 'uploadImg') {
            // item.listType = 'picture-card'
            // item.limit = 1
        }
        if (item.type === 'uploadImgCard') {
            item.showFileList = true
            item.listType = 'picture-card'
            item.fileList = cloneDeep(form[item.prop])
            // item.limit = 1
            Object.assign(item.propsHttp as object, propsHttp)

            item.onSuccess = (response) => {
                if (form[item.prop] == undefined) form[item.prop] = []
                form[item.prop].push({
                    url: response[item.propsHttp?.res as string][item.propsHttp?.url as string],
                    name: response[item.propsHttp?.res as string][item.propsHttp?.name as string]
                })
            }

            // item.onChange = () => {
            //     let loadingIndex = 0
            //     item.fileList?.map(file => {
            //         if (file.status === "success") {
            //             file.url = (file.response as any)[item.propsHttp?.res as string][item.propsHttp?.url as string]
            //             file.name = (file.response as any)[item.propsHttp?.res as string][item.propsHttp?.name as string]
            //         } else {
            //             loadingIndex++
            //         }
            //     })
            //     if (loadingIndex === 0) {
            //         form[item.prop] = item.fileList
            //     }
            // }
            // if (typeof item.value === 'string') {
            //     const filename = item.value.split('?')[0].substring(item.value.lastIndexOf('/') + 1, item.value.length)
            //     item.fileList = [{
            //         name: filename,
            //         url: item.value
            //     }]
            // } else if (typeof item.value === 'object') {
            //     item.fileList = item.value
            // }
            // delete item.value
        }
    });

    const isDate = (type: string) => DATE_LIST.includes(type)

    // 过滤有效属性
    const filterAttributes = (pattern: OptionsColumn) => {
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
        } else if ((pattern.type as string).includes('upload')) {
            const keys = ['display', 'label', 'prop', 'value', 'type', 'data']
            result = pickBy(pattern, (value, key) => !keys.includes(key))
        } else if (DATE_LIST.includes(pattern.type as string)) {
            result = pickBy(pattern, (value, key) => dateAttribute.includes(key))
            if (isNil(result.placeholder)) {
                result.placeholder = "请选择 " + pattern.label;
            }

        } else {
            result = pickBy(pattern, (value, key) => !['display', 'label', 'prop', 'value'].includes(key))
        }
        return cloneDeep(result)
    }

    // 获取表单组件
    const getComponent = (item: OptionsColumn) => {
        if (!isNil(item.component)) {
            return item.component
        } else if (INPUT_LIST.includes(item.type)) {
            return "el-input";
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
    const getMultipleOptionsComponent = (item: OptionsColumn) => {
        if (item.type === "select") {
            return "el-option";
        } else if ((item.type === "checkbox" || item.type === "radio") && item.button) {
            return `el-${item.type}-button`;
        } else {
            return `el-${item.type}`;
        }
    };

    let modelValue = useProp<LqFormOptions>('modelValue').value as any

    const formInitVal = (list: Array<OptionsColumn>) => {
        let value = {} as any;
        list.map(ele => {
            if (!isNil(ele.value)) {
                value[ele.prop] = ele.value;
            }
        });
        return value;
    }

    let form = Object.assign(modelValue, cloneDeep(formInitVal(options.column)))

    return {options, form, isDate, getComponent, getMultipleOptionsComponent, filterAttributes}
}
