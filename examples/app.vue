<template>
  <div>
    <lq-form v-model="form" :option="options" style="width: 800px;"/>
  </div>
</template>

<script lang="ts" setup>
import {defineLqForm} from 'longqi-ui/src/form/types'
import {reactive} from "vue";

const form = reactive({})

const options = defineLqForm({
  column: [{
    label: "照片墙",
    prop: "file",
    type: "upload",
    action: "https://file.cs08.cn/file/uploadUtil",
    showFileList: false,
    drag: true,
    showThumbnail: true,
    name: 'file',
    value: [{name: 'food.jpeg', url: 'https://file.cs08.cn/file/group1/M00/06/7D/rBABQWMamfuAHHcuAAJZakE_zgg707.jpg'}],
    propsHttp: {
      url: "url",
      name: "fileName",
      res: "data",
    },
    tip: '1111',
  }]
})
</script>
