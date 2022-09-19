# Input输入框

## 基本用法

<div>
    <lq-form v-model="form" :option="options"></lq-form>
</div>

<script lang="ts">
import {defineComponent, reactive} from "vue";
export default defineComponent({
    setup() {
        const form = reactive({});

        const options = reactive({
          column: [{
            label: "用户名",
            prop: "username"
          }]
        });

        return {form,options}
    }
});
</script>

::: tip
当`type`为`input`时可以不写,默认为`input`
:::

```vue

<template>
  <lq-form v-model="form" :option="options"></lq-form>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";

export default defineComponent({
  setup() {
    const form = reactive({});

    const options = reactive({
      column: [{
        label: "用户名",
        prop: "username"
      }]
    });

    return {form, options}
  }
});
</script>
```
