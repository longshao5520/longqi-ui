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
          label: '多选',
          prop: 'checkbox',
          type: 'checkbox',
          value: [0],
          dicData: [{
            label: '男',
            value: 0
          }, {
            label: '女',
            value: 1
          }, {
            label: '未知',
            value: ''
          }]
        }
      ]
    });

    return {form, options}
  }
});
</script>
