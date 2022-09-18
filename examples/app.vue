<template>
  <div>
    <!--    <lq-form v-model="form" :option="options" style="width: 800px;"/>-->
<!--    <LqUpload v-if="isRouterAlive" v-model:fileList="file" :option="fileOption"/>-->
<!--    <LqUpload v-model:fileList="file" :option="fileOption1"/>-->
    <LqUpload v-if="isRouterAlive" v-model:fileList="file" :option="fileOption2"/>
  </div>
</template>

<script lang="ts" setup>
import {LqFormOptions,OptionsColumn} from 'longqi-ui/src/form/types'
import {nextTick, provide, reactive, ref} from "vue";

// 局部组件刷新
const isRouterAlive = ref(true);
const reload = () => {
  // 删除组件
  isRouterAlive.value = false;
  nextTick(() => {
    // 重新渲染组件
    isRouterAlive.value = true;
  });
};
provide("reload", reload);

const file = reactive([{
  name: 'food.jpeg',
  url: 'http://file.cs08.cn/file/group1/M00/06/7D/rBABQWMamfuAHHcuAAJZakE_zgg707.jpg'
}])
const fileOption = reactive({
  type: "upload",
  action: "https://file.cs08.cn/file/uploadUtil",
  // showFileList: false,
  name: 'file',
  drag: true,
  propsHttp: {
    name: 'fileName'
  }
} as OptionsColumn)
const fileOption1 = reactive({
  type: "uploadImg",
  action: "https://file.cs08.cn/file/uploadUtil",
  showFileList: false,
  name: 'file',
  propsHttp: {
    name: 'fileName'
  }
})
const fileOption2 = reactive({
  type: "uploadImgCard",
  action: "https://file.cs08.cn/file/uploadUtil",
  // showFileList: false,
  name: 'file',
  propsHttp: {
    name: 'fileName'
  }
})

const uploadChange = () => {
  console.log(fileOption2)
}

// const form = reactive({} as { file: string })
//
// const options = reactive({
//   width: "400px",
//   column: [{
//     label: "照片墙",
//     prop: "file",
//     type: "uploadImgCard",
//     action: "https://file.cs08.cn/file/uploadUtil",
//     showFileList: false,
//     name: 'file',
//     // value: [{name: 'food.jpeg', url: 'http://file.cs08.cn/file/group1/M00/06/7D/rBABQWMamfuAHHcuAAJZakE_zgg707.jpg'}],
//     // value: 'http://file.cs08.cn/file/group1/M00/06/7D/rBABQWMamfuAHHcuAAJZakE_zgg707.jpg',
//     propsHttp: {
//       url: "url",
//       name: "fileName",
//       res: "data",
//     },
//     // tip: '1111',
//     // onSuccess: (response, uploadFile) => {
//     //   console.log(response.data.url)
//     //   form.file = response.data.url
//     // }
//   },{
//     label: "附件",
//     prop: "file1",
//     type: "upload",
//     action: "https://file.cs08.cn/file/uploadUtil",
//     name: 'file',
//     drag: true,
//     value: [{name: 'food.jpeg', url: 'http://file.cs08.cn/file/group1/M00/06/7D/rBABQWMamfuAHHcuAAJZakE_zgg707.jpg'}],
//     // value: 'http://file.cs08.cn/file/group1/M00/06/7D/rBABQWMamfuAHHcuAAJZakE_zgg707.jpg',
//     propsHttp: {
//       url: "url",
//       name: "fileName",
//       res: "data",
//     },
//     // tip: '1111',
//     // onSuccess: (response, uploadFile) => {
//     //   console.log(response.data.url)
//     //   form.file = response.data.url
//     // }
//   }]
// } as LqFormOptions)
</script>
