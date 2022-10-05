<template>
  <lq-form v-model="form" :option="options"></lq-form>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import {defineLqForm} from "longqi-ui";


export default defineComponent({
  setup() {
    const form = reactive({});

    const options = defineLqForm({
      column: [
        {
          label: "普通滑块",
          prop: "slider",
          type: 'slider',
        },{
          label: "初始化值",
          prop: "slider",
          type: 'slider',
          value:2
        }, {
          label: "隐藏提示",
          prop: "slider",
          type: 'slider',
          showTooltip:false
        }, {
          label: "格式化值",
          prop: "slider",
          type: 'slider',
          formatTooltip: function(val) {
            return '格式化的值' + val;
          }
        }, {
          label: "禁用",
          prop: "slider",
          type: 'slider',
          disabled:true
        }
      ]
    });

    return {form, options}
  }
});
</script>
