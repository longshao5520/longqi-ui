<script lang="ts">
export default {
  name: "LqCrud"
}
</script>
<script lang="ts" setup>
import {LqFormOptions} from "../form/types";
import {PropType} from "vue";
import {useCrud} from "./useCrud";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  },
  option: {
    type: Object as PropType<LqFormOptions>,
    required: true
  },
  page: {
    type: Object,
    default: () => ({})
  },
  search: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(["update:page", "update:search", "currentChange", "sizeChange"])
const {page} = useCrud()
const currentChange = (value: number) => {
  emit("currentChange", value, value - 1)
}
const sizeChange = (value: number) => {
  emit("sizeChange", value, value - 1)
}

const select = () => {
}
const selectAll = () => {
}
const selectionChange = () => {
}
const rowClick = () => {
}
const rowDblclick = () => {
}
</script>

<template>
  <!-- search  -->

  <!-- content -->
  <el-table
      :data="data"
      style="width: 100%"
      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
  >
    <template v-for="(item, index) in option.column" :key="index">
      <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
      >
      </el-table-column>
    </template>
  </el-table>
  <!-- pagination -->
  <el-row justify="center" style="padding-top: 20px;">
    <div>
      <el-pagination
          v-model:currentPage="page.currentPage"
          v-model:page-size="page.pageSize"
          :page-size="page.pageSize"
          :background="page.background"
          :layout="page.layout"
          :total="page.total"
          :pager-count="page.pagerCount"
          :page-sizes="page.pageSizes"
          @size-change="sizeChange"
          @current-change="currentChange"
      />
    </div>
  </el-row>
</template>

<style></style>
