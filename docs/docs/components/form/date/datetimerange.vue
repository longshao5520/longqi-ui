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
          label: "时间日期范围",
          type: 'datetimerange',
          prop: 'datetimerange',
          format: 'YYYY-MM-DD HH:mm:ss',
          valueFormat: 'YYYY-MM-DD HH:mm:ss',
          startPlaceholder: '时间日期开始范围自定义',
          endPlaceholder: '时间日期结束范围自定义',
        }, {
          label: "日期范围",
          prop: "daterange",
          type: "daterange",
          format: 'YYYY-MM-DD',
          valueFormat: 'YYYY-MM-DD',
          startPlaceholder: '日期开始范围自定义',
          endPlaceholder: '日期结束范围自定义',
        }
      ]
    });

    return {form, options}
  }
});
</script>
