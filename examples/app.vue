<template>
  <div>
    <lq-form :options="options"/>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import LqForm from 'longqi-ui/src/form/src/index.vue'
import {LqFormOptions} from "longqi-ui/src/form/src/types";
// import {LqFormOptions} from "longqi-ui/lib/src/form/src/types";
console.log(LqForm)
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
    }
  ]
} as LqFormOptions)
</script>
