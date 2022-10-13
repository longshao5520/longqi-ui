<template>
  <div>
    <!--    <lq-form v-model="form" :option="options" style="width: 800px;"/>-->
    <lq-crud v-model="form" v-model:page="page" :data="data" :option="option"
             @currentChange="(value) => page.currentPage = value"/>
    <!--    <lq-image-list :src="list" width="100"></lq-image-list>-->
  </div>
</template>

<script lang="ts" setup>
import {defineLqCrud, defineLqForm} from 'longqi-ui/src/types'
import {reactive} from "vue";

// const list = reactive([
//   "http://file.cs08.cn/file/group1/M00/00/77/rBABQmL_WjeAH-z_AABLCAiM9To988.png",
//   "http://file.cs08.cn/file/group1/M00/06/75/rBABQGMPDqOAGn0oAAD7M6ojpvs931.png",
//   "http://file.cs08.cn/file/group1/M00/00/77/rBABQmL_WjeAH-z_AABLCAiM9To988.png",
//   "http://file.cs08.cn/file/group1/M00/06/75/rBABQGMPDqOAGn0oAAD7M6ojpvs931.png",
//   "http://file.cs08.cn/file/group1/M00/00/77/rBABQmL_WjeAH-z_AABLCAiM9To988.png",
// ])

const form = reactive({})

const page = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 200,
  // pagerCount: 5,
})

const data = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const option = defineLqCrud({
  card: true,
  searchShowBtn: true,
  column: [{
    prop: "name",
    label: "名字",
    search: true,
  }, {
    prop: "address",
    label: "地址"
  }, {
    prop: "date",
    label: "日期"
  }]
})

const options = defineLqForm({
  column: [{
    label: "照片墙",
    prop: "file",
    type: "uploadImgCard",
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
    // tip: '1111',
  }, {
    label: '输入框',
    prop: 'input',
    value: '默认值'
  }, {
    label: '数字输入框',
    prop: 'num',
    type: 'number',
    value: 2
  }, {
    label: '下拉框',
    prop: 'select',
    type: 'select',
    dicData: [{
      label: '字典1',
      value: 0
    }, {
      label: '字典2',
      value: 1
    }],
    value: 0
  }, {
    label: '多选',
    prop: 'checkbox',
    type: 'checkbox',
    dicData: [{
      label: '男',
      value: 0
    }, {
      label: '女',
      value: 1
    }, {
      label: '未知',
      value: ''
    }]
  }, {
    label: '单选',
    prop: 'radio',
    type: 'radio',
    dicData: [{
      label: '男',
      value: 0
    }, {
      label: '女',
      value: 1
    }, {
      label: '未知',
      value: ''
    }]
  }, {
    label: "禁止日期",
    prop: "date",
    type: "date",
    disabledDate(time) {
      return time.getTime() < Date.now();
    },
  }, {
    label: "时间",
    prop: "time",
    type: "time",
  }, {
    label: '开关',
    prop: 'switch',
    type: 'switch',
    activeValue: 1,
    activeText: '开',
    inactiveValue: 0,
    inactiveText: '关',
    value: 1
  }, {
    label: '评价',
    prop: 'rate',
    type: 'rate',
  }, {
    label: "初始化值",
    prop: "slider",
    type: 'slider',
    value: 2
  }, {
    label: "快捷方式",
    prop: "date",
    type: "date",
    shortcuts: [{
      text: '今天',
      value: () => new Date()
    }, {
      text: '昨天',
      value() {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        return date
      }
    }, {
      text: '一周前',
      value() {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        return date
      }
    }]
  }]
})
</script>
