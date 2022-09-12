<template>
  <div>
    <lq-form :options="options"/>
  </div>
</template>

<script lang="ts" setup>
import {LqFormOptions} from 'longqi-ui/lib/types'
import {reactive} from "vue";

// console.log(defineOptions)

// const options1 = defineOptions()

const options = reactive({
  width: "400px",
  column: [{
    label: "用户名",
    prop: "username"
    // span: 12
  }, {
    label: "介绍",
    prop: "remote",
    type: "textarea",
    autosize: { minRows: 3, maxRows: 6 },
    resize: "none",
    rows: 5,
    showWordLimit: true,
    maxlength: 200
    // span: 12
  }, {
    label: "密码",
    prop: "password",
    type: "password",
    showPassword: true
    // span: 12
  }, {
    label: "兴趣",
    prop: "interest",
    type: "select",
    // span: 8,
    dicData: [
      {
        label: "篮球",
        value: "篮球"
      }, {
        label: "足球",
        value: "足球"
      }, {
        label: "乒乓球",
        value: "乒乓球"
      }
    ]
  }, {
    label: "兴趣",
    prop: "checkbox",
    type: "checkbox",
    // span: 8,
    dicData: [{
      label: "篮球",
      value: "篮球"
    }, {
      label: "足球",
      value: "足球"
    }, {
      label: "乒乓球",
      value: "乒乓球"
    }]
  }, {
    label: "性别",
    prop: "radio",
    type: "radio",
    // button: true,
    // border: true,
    // span: 8,
    dicData: [{
      label: "男",
      value: 0
    }, {
      label: "女",
      value: 1
    }, {
      label: "未知",
      value: ""
    }]
  }, {
    label: "开关",
    prop: "switch",
    type: "switch"
  }, {
    label: "日期范围",
    prop: "datetimerange",
    type: "datetimerange",
    rangeSeparator: "To",
    startPlaceholder: "Start date",
    endPlaceholder: "End date"
  }]
} as LqFormOptions)
</script>
