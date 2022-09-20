import {useProp, UploadUserFile} from "element-plus";
import {OptionsColumn} from "../form/types";
import {cloneDeep, pickBy} from "lodash";
import {watchEffect} from "vue";

export const useUpload = () => {
    let option = useProp<OptionsColumn>('option').value as OptionsColumn
    let fileList = useProp<Array<UploadUserFile>>('modelValue').value as Array<UploadUserFile>

    if (option.type !== 'uploadImg') {
        option.showFileList = true
    }

    const filterAttributes = () => {
        const keys = ['accept', 'action', 'headers', 'data', 'limit', 'showFileList', 'multiple', 'drag', 'onPreview', 'onRemove', 'onSuccess', 'onError', 'onProgress', 'onChange', 'onExceed', 'beforeUpload', 'beforeRemove']
        return cloneDeep(pickBy(option, (value, key) => keys.includes(key)))
    }

    return {option, fileList, filterAttributes}
}
