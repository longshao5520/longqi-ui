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
          label: "日期",
          prop: "datetime",
          type: "datetime",
          format: 'YYYY年MM月DD日 HH时mm分ss秒',
          valueFormat: 'YYYY-MM-DD HH:mm:ss',
        }, {
          label: "时间戳",
          prop: "datetime",
          type: "datetime",
          format: 'YYYY-MM-DD HH:mm:ss',
          valueFormat: 'timestamp',
        }
      ]
    });

    return {form, options}
  }
});
</script>
