<script lang="ts">
export default {
  name: "headerSearch"
}
</script>
<script lang="ts" setup>
import {computed, PropType} from "vue";
import {LqCrudOptions, LqFormOptions} from "../types";
import LqForm from "../form/index.vue"
import {useCrud} from "./useCrud";
import {Search} from "@element-plus/icons-vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  option: {
    type: Object as PropType<LqCrudOptions>,
    required: true
  },
})
// const options = inject("options") as LqCrudOptions
const {searchShow, options} = useCrud()
let formOption = computed(() => {
  const column = options.column.filter(item => item.search)
  column.map(item => {
    item.span = 8
  })
  return {
    column,
    submitText: "搜索",
    submitIcon: Search
  } as LqFormOptions
})

const searchLen = computed<number>(() => {
  let count = 0;
  options.column.map(ele => {
    if (ele.search) count++
  })
  return count
})
console.log(searchLen)
const searchFlag = computed(() => {
  return searchLen.value !== 0
})


// formOption.column = options.column.filter(item => item.search)
</script>

<template>
  <component
      v-if="searchFlag"
      v-show="searchShow && searchFlag"
      :is="options.card ? 'el-card' : 'div'"
      :shadow="options.card ? 'always' : 'never'"
  >
    <lq-form v-model="modelValue" :option="formOption"></lq-form>
  </component>
</template>

<style lang="scss" scoped></style>
