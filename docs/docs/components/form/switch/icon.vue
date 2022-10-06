<template>
  <lq-form v-model="form" :option="options"></lq-form>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import {defineLqForm} from "longqi-ui";
import { Check, Close } from '@element-plus/icons-vue'

export default defineComponent({
  setup() {
    const form = reactive({});

    const options = defineLqForm({
      column: [
        {
          label: "开关",
          prop: "switch",
          type: "switch",
          activeIcon: Check,
          inactiveIcon: Close,
        },
        {
          label: "开关",
          prop: "switch",
          type: "switch",
          activeIcon: Check,
          inactiveIcon: Close,
          inlinePrompt: true,
        }
      ]
    });

    return {form, options}
  }
});
</script>
