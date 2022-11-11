<template>
  <lq-form v-model="form" :option="options"></lq-form>
  {{ form }}
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
          span: 24,
          defaultTime: [
            new Date(2000, 1, 1, 0, 0, 0),
            new Date(2000, 2, 1, 23, 59, 59)
          ],
          format: 'YYYY-MM-DD HH:mm:ss',
          valueFormat: 'YYYY-MM-DD HH:mm:ss',
          startPlaceholder: '时间日期开始范围自定义',
          endPlaceholder: '时间日期结束范围自定义',
        }
      ]
    });

    return {form, options}
  }
});
</script>
