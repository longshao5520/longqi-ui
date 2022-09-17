<template>
  <el-upload
      v-if="option.type === 'uploadImg'"
      v-bind="{...filterAttributes()}"
      list-type="picture"
      class="avatar-uploader"
      :on-success="onSuccess"
  >
    <img v-if="fileList" :src="fileList[0].url" class="avatar" alt=""/>
    <el-icon v-else class="avatar-uploader-icon">
      <Plus/>
    </el-icon>
  </el-upload>
  <el-upload
      v-else-if="option.type === 'uploadImgCard'"
      v-model:file-list="fileList"
      v-bind="{...filterAttributes()}"
      list-type="picture-card"
      :on-success="onSuccess"
  >
    <el-icon>
      <Plus/>
    </el-icon>
    <template #tip>
      <div class="el-upload__tip">
        {{ option.tip }}
      </div>
    </template>
  </el-upload>
  <el-upload
      v-else
      v-model:file-list="fileList"
      v-bind="{...filterAttributes()}"
      list-type="text"
      :on-success="onSuccess"
  >
    <template v-if="option.drag">
      <el-icon class="el-icon--upload">
        <UploadFilled/>
      </el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </template>
    <el-button v-else type="primary">点击上传</el-button>
  </el-upload>
  <el-button type="primary" @click="update">数据更新</el-button>

</template>

<script lang="ts" setup>
import {PropType, watchEffect,inject} from 'vue'
import {UploadUserFile, UploadProps} from "element-plus";
import {OptionsColumn} from "../form/types";
import {useUpload} from "./useUpload";
import {Plus, UploadFilled} from '@element-plus/icons-vue'
import {cloneDeep} from "lodash";

const toggle = inject('reload');
const emit = defineEmits(['change', 'update:fileList'])
const props = defineProps({
  fileList: {
    type: Array as PropType<Array<UploadUserFile>>,
    default: () => []
  },
  option: {
    type: Object as PropType<OptionsColumn>,
  }
})


let {option, fileList, filterAttributes} = useUpload()

watchEffect(() => {
  console.log(props)
  fileList = props.fileList
})

const onSuccess: UploadProps['onSuccess'] = (response, uploadFile, uploadFiles) => {
  debugger
  if (!option.onSuccess) {
    if (option.type === 'uploadImg') {
      fileList = [{
        url: response[option.propsHttp?.res as string || 'data'][option.propsHttp?.url as string || 'url'],
        name: response[option.propsHttp?.res as string || 'data'][option.propsHttp?.name as string || 'name']
      }]
      emit('update:fileList', fileList)
    } else {
      const value = cloneDeep(fileList)
      value.push({
        url: response[option.propsHttp?.res as string || 'data'][option.propsHttp?.url as string || 'url'],
        name: response[option.propsHttp?.res as string || 'data'][option.propsHttp?.name as string || 'name']
      })
      emit('update:fileList', value)
    }
  } else {
    option.onSuccess(response, uploadFile, uploadFiles)
  }
}

const update = () => {
  const value = cloneDeep(fileList)
  value.push(value[0])
  console.log(value)
  emit('update:fileList', value)
  // toggle()
}
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
<script lang="ts">
export default {
  name: 'LqUpload'
}
</script>