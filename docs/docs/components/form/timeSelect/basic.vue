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
          label: "时间选择器",
          prop: "timeSelect",
          type: "timeSelect",
        }
      ]
    });

    return {form, options}
  }
});
</script>
