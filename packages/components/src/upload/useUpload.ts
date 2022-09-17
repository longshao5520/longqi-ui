import {useProp, UploadUserFile} from "element-plus";
import {OptionsColumn} from "../form/types";
import {cloneDeep, pickBy} from "lodash";

export const useUpload = () => {
    let option = useProp<OptionsColumn>('option').value as OptionsColumn
    let fileList = useProp<Array<UploadUserFile>>('modelValue').value as Array<UploadUserFile>

    const filterAttributes = () => {
        const keys = ['accept', 'action', 'headers', 'data', 'limit', 'showFileList', 'multiple', 'drag']
        return cloneDeep(pickBy(option, (value, key) => keys.includes(key)))
    }

    return {option, fileList, filterAttributes}
}
