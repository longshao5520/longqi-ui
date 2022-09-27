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
          label: "输入框",
          prop:'input',
          type:'input'
        },
        {
          label: "输入框",
          prop: "input1"
        }
      ]
    });

    return {form, options}
  }
});
</script>
