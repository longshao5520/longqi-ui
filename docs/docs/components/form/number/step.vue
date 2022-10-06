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
      column: [{
        label: "数字输入框",
        prop: "input",
        type:"number",
        step: 2,
      }]
    });

    return {form, options}
  }
});
</script>
