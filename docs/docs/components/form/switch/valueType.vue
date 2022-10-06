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
          label: "开关",
          prop: "switch",
          type: "switch",
          activeValue: 1,
          inactiveValue: 0,
          value: 1,
        },
      ]
    });

    return {form, options}
  }
});
</script>
