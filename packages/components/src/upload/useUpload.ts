import {useProp, UploadUserFile} from "element-plus";
import {FormColumn} from "../form/types";
import lodash from "lodash";

export const useUpload = () => {
    let option = useProp<FormColumn>('option').value as FormColumn
    let fileList = useProp<Array<UploadUserFile>>('modelValue').value as Array<UploadUserFile>

    if (option.type !== 'uploadImg') {
        option.showFileList = true
    }

    const filterAttributes = () => {
        const keys = ['accept', 'action', 'headers', 'data', 'limit', 'showFileList', 'multiple', 'drag', 'onPreview', 'onRemove', 'onError', 'onProgress', 'onChange', 'onExceed', 'beforeUpload', 'beforeRemove']
        return lodash.cloneDeep(lodash.pickBy(option, (value, key) => keys.includes(key)))
    }

    return {option, fileList, filterAttributes}
}
