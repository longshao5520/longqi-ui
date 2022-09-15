import {LqFormOptions, OptionsColumn} from "./types";
import {useProp} from "element-plus";
import {cloneDeep, isNil, pickBy} from "lodash";

const INPUT_LIST = ["text", "input", "textarea", "password", undefined]
const DATE_LIST = ['year', 'month', 'date', 'dates', 'datetime', 'week', 'datetimerange', 'daterange', 'monthrange']
const publicAttribute = ['clearable', 'disabled', 'size', 'readonly', 'autofocus', 'validateEvent', 'rules']
const inputAttribute = publicAttribute.concat(['type', 'maxlength', 'minlength', 'showWordLimit', 'showPassword', 'prefixIcon', 'suffixIcon', 'rows', 'autosize', 'resize'])
const selectAttribute = publicAttribute.concat(['multiple', 'valueKey', 'collapseTags', 'collapseTagsTooltip', 'multipleLimit', 'effect', 'filterable', 'allowCreate', 'filterMethod', 'remote', 'remoteMethod', 'loading', 'loadingText', 'noMatchText', 'no-data-text', 'popper-class', 'reserveKeyword', 'defaultFirstOption', 'persistent', 'automaticDropdown', 'clearIcon', 'fitInputWidth', 'suffixIcon', 'tagType'])
const dateAttribute = publicAttribute.concat(['type', 'editable', 'rangeSeparator', 'startPlaceholder', 'endPlaceholder', 'format'])

export const useForm = () => {
    let options = useProp<LqFormOptions>('option').value as LqFormOptions

    options.size = options.size || "default";
    options.size = options.size || "default";
    options.labelWidth = options.labelWidth || "80px";
    options.labelPosition = options.labelPosition || "right";
    options.labelSuffix = options.labelSuffix || ":";
    options.submitBtn = options.submitBtn || true
    options.submitText = options.submitText || "提交"
    options.emptyBtn = options.emptyBtn || true
    options.emptyText = options.emptyText || "清空"
    options.column.map(item => {
        item.clearable = item.clearable || true;
        item.display = item.display || true;
        if (item.type === 'transfer') {
            // item.data = []
            // item.dicData?.map((dic, index) => {
            //     item.data?.push({
            //         key: index,
            //         label: dic.label,
            //         disabled: false
            //     })
            // })
            item.data = item.dicData
            item.props = {
                key: "value",
                label: "label"
            }
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

    const getMultipleOptionsComponent = (item: OptionsColumn) => {
        if (item.type === "select") {
            return "el-option";
        } else if ((item.type === "checkbox" || item.type === "radio") && item.button) {
            return `el-${item.type}-button`;
        } else {
            return `el-${item.type}`;
        }
    };

    return {options, isDate, getComponent, getMultipleOptionsComponent, filterAttributes}
}
