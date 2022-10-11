<script lang="ts">
export default {
  name: "LqCrud"
}
</script>
<script lang="ts" setup>
import {LqFormOptions} from "../types";
import {computed, PropType, reactive} from "vue";
import {useCrud} from "./useCrud";
import {Search, Refresh, Printer} from "@element-plus/icons-vue"
import {ElMessageBox} from "element-plus"

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
const emit = defineEmits(["update:page", "update:search", "currentChange", "sizeChange", "rowSave", "rowUpdate", "rowDel"])
let {options, pageModel, form} = useCrud()

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

const save = () => {
}
const edit = (row: any, index: number) => {
  form = reactive(row)
}
const remove = (row: any, index: number) => {
  ElMessageBox.confirm(
      '此操作将永久删除, 是否继续?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        emit("rowDel", row, index)
      })
}
const view = () => {
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
const headRightIcon = [{
  icon: Printer, click: () => {
  }
}, {
  icon: Refresh, click: () => {
  }
}, {
  icon: Search, click: () => {
  }
}]
</script>

<template>
  <!-- search  -->

  <!-- content -->
  <!--      :header-cell-style="headerRowStyle"-->
  <!--      :cell-style="headerRowStyle"-->
  <component :is="options.card ? 'el-card' : 'div'" :header="options.title" :shadow="options.card ? 'always' : 'never'">
    <div class="table-header">
      <div class="header-button-lf">
        <el-button
            v-if="options.addBtn"
            :type="options.addBtnType"
            :icon="options.addBtnIcon"
            @click="save"
        >
          {{ options.addBtnText }}
        </el-button>
      </div>
      <div class="header-button-ri">
        <el-button v-for="item in headRightIcon" :icon="item.icon" circle @click="item.click"></el-button>
      </div>
    </div>
    <el-table
        ref="elTable"
        class="table-content"
        :cell-style="{height: options.rowHeight}"
        :header-cell-style="{height: options.rowHeight}"
        :stripe="options.stripe"
        :border="options.border"
        :data="data"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
    >
      <el-table-column
          v-if="options.index"
          type="index"
          align="center"
          :width="options.indexWidth"
          :fixed="options.indexFixed"
      />
      <el-table-column
          v-if="options.selection"
          type="selection"
          align="center"
          :width="options.selectionWidth"
          :fixed="options.selectionFixed"
          :reserve-selection="options.reserveSelection"
      />
      <el-table-column
          v-if="options.expand"
          type="expand"
          align="center"
          :width="options.expandWidth"
          :fixed="options.expandFixed"
      />
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
                text style="font-size: 14px;"
                @click="view(item, scope.index)"
            >
              {{ options.viewBtnText }}
            </el-button>
            <el-button
                v-if="options.editBtn"
                :type="options.editBtnType"
                :icon="options.editBtnIcon"
                text style="font-size: 14px;"
                @click="edit"
            >
              {{ options.editBtnText }}
            </el-button>
            <el-button
                v-if="options.delBtn"
                :type="options.delBtnType"
                :icon="options.delBtnIcon"
                text style="font-size: 14px;"
                @click="remove"
            >
              {{ options.delBtnText }}
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- pagination -->
    <el-row justify="end" style="padding-top: 20px;">
      <div>
        <el-pagination
            v-model:currentPage="pageModel.currentPage"
            v-model:page-size="pageModel.pageSize"
            :page-size="pageModel.pageSize"
            :background="pageModel.background"
            :layout="pageModel.layout"
            :total="pageModel.total"
            :pager-count="pageModel.pagerCount"
            :page-sizes="pageModel.pageSizes"
            @size-change="sizeChange"
            @current-change="currentChange"
        />
      </div>
    </el-row>
  </component>
</template>

<style lang="scss" scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-content {
  width: 100%;
  //--el-table-header-bg-color: var(--el-fill-color-light);
  --el-table-header-bg-color: #f6f9f9;
  --el-table-header-text-color: #000000;
}
</style>
