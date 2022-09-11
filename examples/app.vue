<template>
  <div>
    <lq-form :options="options"/>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {LqFormOptions} from "longqi-ui/form/src/types";

const options = reactive({
  // labelWidth: '100px',
  column: [
    {
      label: '用户名',
      prop: 'username',
      span: 12
    },
    {
      label: '密码',
      prop: 'password',
      type: 'password',
      showPassword: true,
      span: 12
    }, {
      label: '兴趣',
      prop: 'interest',
      type: 'select',
      span: 8,
      dicData: [
        {
          label: '篮球',
          value: '篮球',
        }, {
          label: '足球',
          value: '足球',
        }, {
          label: '乒乓球',
          value: '乒乓球',
        }
      ]
    }, {
      label: '兴趣',
      prop: 'checkbox',
      type: 'checkbox',
      span: 8,
      dicData: [{
        label: '篮球',
        value: '篮球',
      }, {
        label: '足球',
        value: '足球',
      }, {
        label: '乒乓球',
        value: '乒乓球',
      }]
    }, {
      label: '性别',
      prop: 'radio',
      type: 'radio',
      span: 8,
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
    }
  ]
} as LqFormOptions)
</script>
