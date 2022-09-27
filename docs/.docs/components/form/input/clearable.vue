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
        label: "输入框",
        prop: "input",
        clearable: false
      }]
    });

    return {form, options}
  }
});
</script>
