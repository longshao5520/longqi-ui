<template>
  <div v-loading.lock="loading">
    <el-upload
        v-model:file-list="fileList"
        v-bind="{...filterAttributes()}"
        :list-type="listType"
        :class="{'avatar-uploader': option.type === 'uploadImg'}"
        :on-success="onSuccess"
    >
<!--        :on-change="handleFileChange"-->
<!--        :http-request="httpUpload"-->
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
<!--    <el-button type="primary" @click="updateList">数据更新</el-button>-->
  </div>
</template>

<script lang="ts" setup>
import {PropType, watchEffect, inject, computed, ref, reactive} from 'vue'
import {UploadUserFile, UploadProps} from "element-plus";
import {OptionsColumn, uploadCallback} from "../form/types";
import {useUpload} from "./useUpload";
import {Plus, UploadFilled} from '@element-plus/icons-vue'
import {cloneDeep} from "lodash";
import axios from "axios";
import dayjs from "dayjs";

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<UploadUserFile>>,
    default: () => []
  },
  option: {
    type: Object as PropType<OptionsColumn>,
  }
})
const loading = ref(false)

let {option, fileList, filterAttributes} = useUpload()

const listType = computed(() => {
  if (option.type === 'uploadImg') {
    return 'picture';
  } else if (option.type === 'uploadImgCard') {
    return 'picture-card';
  } else {
    return 'text'
  }
})

let uploadRes: Record<string, any> = reactive({})
const fileUrlKey = computed(() => {
  return option.propsHttp?.url || 'url'
}).value
const fileNameKey = computed(() => {
  return option.propsHttp?.name || 'name'
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
