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
          label: "日期",
          prop: "datetime",
          type: "datetime",
        }, {
          label: "快捷方式",
          prop: "date",
          type: "date",
          shortcuts: [{
            text: '今天',
            value: () => new Date(),
          }, {
            text: '昨天',
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            }
          }, {
            text: '一周前',
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              return date;
            }
          }]
        }, {
          label: "禁止日期",
          prop: "date",
          type: "date",
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        }
      ]
    });

    return {form, options}
  }
});
</script>
