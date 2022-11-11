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
          label: "时间",
          prop: "time",
          type: "time",
          format: 'HH:mm:ss',
          valueFormat: 'HH:mm:ss'
        }, {
          label: "周",
          prop: "week",
          type: "week",
          format: "YYYY 第 ww 周"
        }, {
          label: "月",
          prop: "month",
          type: "month",
        }, {
          label: "月范围",
          prop: "monthrange",
          type: "monthrange",
          format: 'YYYY-MM',
          valueFormat: 'YYYY-MM'
        }, {
          label: "年",
          prop: "year",
          type: "year",
        }, {
          label: "多个日期",
          prop: "dates",
          type: "dates",
          format: "YYYY-MM-DD",
          valueFormat: "YYYY-MM-DD",
        }
      ]
    });

    return {form, options}
  }
});
</script>
