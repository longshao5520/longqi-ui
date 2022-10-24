import {useProp, UploadUserFile} from "element-plus";
import {FormColumn} from "../types";
import lodash, {isArray} from "lodash";

type FileList = Array<UploadUserFile> | Array<string> | string | null

export const useUpload = () => {
  let option = useProp<FormColumn>('option').value as FormColumn
  let fileList = useProp<FileList>('modelValue').value as FileList
  console.log(isArray(fileList))
  if (typeof fileList === "string") {
    const list = fileList.split(",")
    fileList = []
    list.map(item => {
      (fileList as Array<UploadUserFile>).push({
        url: item,
        name: item.split("/")[item.split("/").length - 1]
      })
    })
  } else if (isArray(fileList)) {
    fileList.map(item => {
      if (typeof item === "string") {
        item = {
          url: item,
          name: item.split("/")[item.split("/").length - 1]
        }
      }
    })
  }

  console.log(fileList)

  if (option.type !== 'uploadImg') {
    option.showFileList = true
    option.drag = false
  }

  const filterAttributes = () => {
    const keys = ['accept', 'action', 'headers', 'data', 'limit', 'showFileList', 'multiple', 'drag', 'onPreview', 'onRemove', 'onError', 'onProgress', 'onChange', 'onExceed', 'beforeUpload', 'beforeRemove']
    return lodash.cloneDeep(lodash.pickBy(option, (value, key) => keys.includes(key)))
  }

  return {option, fileList, filterAttributes}
}

import type {ElUpload} from 'element-plus'

export type UploadInstance = InstanceType<typeof ElUpload>
