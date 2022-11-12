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
          label: "时间范围",
          prop: "time",
          type: "time",
          isRange: true,
          rangeSeparator: "到",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
        },
        {
          label: "时间范围",
          prop: "time2",
          type: "time",
          value: [
            new Date(2016, 9, 10, 8, 40),
            new Date(2016, 9, 10, 9, 40),
          ],
          isRange: true,
          arrowControl: true,
        }
      ]
    });

    return {form, options}
  }
});
</script>
