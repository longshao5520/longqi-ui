<script lang="ts">
export default {
  name: "LqCrud"
}
</script>
<script lang="ts" setup>
import {LqFormOptions} from "../types";
import {computed, PropType} from "vue";
import {useCrud} from "./useCrud";

defineProps({
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
const {options, page} = useCrud()
console.log(options)

const headerRowStyle = computed(() => {
  return {
    "text-align": "center"
  }
})

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
  <!--      :header-cell-style="headerRowStyle"-->
  <!--      :cell-style="headerRowStyle"-->
  <el-table
      style="width: 100%;"
      :data="data"
      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
  >
    <template v-for="(item, index) in options.column" :key="index">
      <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :fixed="item.fixed"
      >
      </el-table-column>
    </template>
    <el-table-column
        :label="options.menuTitle"
        :align="options.menuAlign"
        :fixed="options.menuFixed"
        :width="options.menuWidth">
      <template #default="scope">
        <el-button-group class="ml-4">
          <el-button
              v-if="options.viewBtn"
              :type="options.viewBtnType"
              :icon="options.viewBtnIcon"
              text style="font-size: 14px;">
            {{ options.viewBtnText }}
          </el-button>
          <el-button
              v-if="options.editBtn"
              :type="options.editBtnType"
              :icon="options.editBtnIcon"
              text style="font-size: 14px;">
            {{ options.editBtnText }}
          </el-button>
          <el-button
              v-if="options.delBtn"
              :type="options.delBtnType"
              :icon="options.delBtnIcon"
              text style="font-size: 14px;">
            {{ options.delBtnText }}
          </el-button>
        </el-button-group>
      </template>
    </el-table-column>
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
