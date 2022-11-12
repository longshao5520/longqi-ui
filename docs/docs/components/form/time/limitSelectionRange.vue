<template>
  <lq-form v-model="form" :option="options"></lq-form>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import {defineLqForm} from "longqi-ui";


export default defineComponent({
  setup() {
    const form = reactive({});

    const makeRange = (start: number, end: number) => {
      const result: number[] = []
      for (let i = start; i <= end; i++) {
        result.push(i)
      }
      return result
    }

    const options = defineLqForm({
      column: [
        {
          label: "时间",
          prop: "time",
          type: "time",
          disabledHours: () => makeRange(0, 16).concat(makeRange(19, 23)),
          disabledMinutes: () => makeRange(0, 30),
          disabledSeconds: () => makeRange(31, 59),
        }
      ]
    });

    return {form, options}
  }
});
</script>
