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
          label: "下拉框",
          prop: "select",
          type: "select",
          dicData: [{
            label: "字典1",
            value: 0,
          }, {
            label: "字典2",
            value: 1,
          }],
        }
      ]
    });

    return {form, options}
  }
});
</script>
