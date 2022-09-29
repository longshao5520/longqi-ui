<template>
    <el-upload
        ref="uploadRef"
        v-model:file-list="fileList"
        v-bind="{...filterAttributes()}"
        :list-type="listType"
        :class="{'avatar-uploader': option.type === 'uploadImg'}"
        :on-success="onSuccess"
    >
      <template v-if="option.type === 'uploadImg'">
        <img v-if="fileList" :src="fileList[0].url" class="avatar" alt=""/>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </template>
      <template v-else-if="option.type === 'uploadImgCard'">
        <el-icon>
          <Plus/>
        </el-icon>
      </template>
      <template v-else>
        <template v-if="option.drag">
          <el-icon class="el-icon--upload">
            <UploadFilled/>
          </el-icon>
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
          </div>
        </template>
        <el-button v-else type="primary">点击上传</el-button>
      </template>
      <template v-if="option.tip" #tip>
        <div class="el-upload__tip">
          {{ option.tip }}
        </div>
      </template>
    </el-upload>
</template>
<script lang="ts">
export default {
  name: "LqUpload"
}
</script>
<script lang="ts" setup>
import {PropType, computed, reactive, ref} from 'vue'
import {UploadUserFile, UploadProps, UploadInstance} from "element-plus";
import {FormColumn} from "../form/types";
import {useUpload} from "./useUpload";
import {Plus, UploadFilled} from '@element-plus/icons-vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<UploadUserFile>>,
    default: () => []
  },
  option: {
    type: Object as PropType<FormColumn>,
  }
})
let {option, fileList, filterAttributes} = useUpload()

const listType = computed(() => {
  if (option.type === 'uploadImg') {
    return 'picture';
  } else if (option.type === 'uploadImgCard') {
    return 'picture-card';
  } else {
    if (option.showThumbnail) {
      return 'picture';
    } else {
      return 'text'
    }
  }
})

let uploadRes: Record<string, any> = reactive({})
const fileUrlKey = computed(() => {
  return option.propsHttp?.url || 'url'
}).value

const onSuccess: UploadProps['onSuccess'] = (response, uploadFile, uploadFiles) => {
  if (!option.onSuccess) {
    uploadRes = response[option.propsHttp?.res as string || 'data']
    if (option.type === 'uploadImg') {
      uploadFiles[0].url = uploadRes[fileUrlKey]
      uploadFiles.splice(uploadFiles.length - 1, 1)
    } else {
      uploadFiles[uploadFiles.length - 1].url = uploadRes[fileUrlKey]
    }
    const list: UploadUserFile[] = reactive([])
    uploadFiles.map(item => {
      list.push(reactive({
        url: item.url,
        name: item.name,
        status: item.status,
        uid: item.uid
      }))
    })
    emit('update:modelValue', list)
  } else {
    option.onSuccess(response, uploadFile, uploadFiles)
  }
}

const uploadRef = ref<UploadInstance>()
function clearFiles() {
  uploadRef.value!.clearFiles()
}

defineExpose({
  clearFiles
})

</script>
<style lang="scss" scoped>
.avatar-uploader {
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  &:deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  &:deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
  }
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>
