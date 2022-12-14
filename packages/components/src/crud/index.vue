<script lang="ts">
export default {
  name: "LqCrud"
}
</script>
<script lang="ts" setup>
import {LqFormOptions} from "../types";
import {PropType, ref, provide, watchEffect, computed} from "vue";
import {useCrud} from "./useCrud";
import {Search, Refresh, Close, FullScreen} from "@element-plus/icons-vue"
import {ElMessageBox} from "element-plus"
import HeaderSearch from "./header-search.vue";
import {LqImageList, LqForm} from "../index";

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
  tableLoading: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(["update:page", "update:search", "currentChange", "sizeChange", "rowSave", "rowUpdate", "rowDel", "refreshChange", "searchChange"])
let {options, pageModel, form, formOption} = useCrud()
provide("options", options)

const tableLoading = ref(false)
watchEffect(() => {
  tableLoading.value = props.tableLoading
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
// import Print from "../print/index.js"
// const elTable = ref()
const headerSearch = ref()
const headRightIcon = [{
//   icon: Printer, click: () => {
//     // console.log(unref(elTable))
//     Print(document.getElementById("tableContent"))
//   }
// }, {
  icon: Refresh,
  display: options.refreshBtn,
  click: () => {
    emit("refreshChange")
  }
}, {
  icon: Search,
  display: options.searchShowBtn,
  click: () => {
    headerSearch.value?.switchSearchShow()
  }
}]
const UPLOAD_LIST = ['upload', 'uploadImg', 'uploadImgCard']
const isUpload = (type: string) => UPLOAD_LIST.includes(type)
const searchChange = (form: any, hide: () => {}) => {
  emit("searchChange", form, hide)
}

const formType = ref("add")
const dialogType = computed(() => `el-${options.dialogType}`)
const dialogSwitch = ref(false)
const save = () => {
  formType.value = "add"
  dialogSwitch.value = true
}
const activeRowIndex = ref()
const edit = (row: any, index: number) => {
  form = row
  activeRowIndex.value = index
  formType.value = "edit"
  dialogSwitch.value = true
}
const remove = (row: any, index: number) => {
  ElMessageBox.confirm(
      '????????????????????????, ?????????????',
      '??????',
      {
        confirmButtonText: '??????',
        cancelButtonText: '??????',
        type: 'warning',
      }
  )
      .then(() => {
        emit("rowDel", row, index)
      }).catch(() => {
  })
}
const view = (row: any, index: number) => {
  console.log(row, index)
  formType.value = "view"
  dialogSwitch.value = true
}
const dialogFullscreen = () => {
  options.dialogFullscreen = !options.dialogFullscreen
}
const dialogClose = () => {
  dialogSwitch.value = false
}
</script>

<template>
  <!-- search  -->
  <header-search ref="headerSearch" v-model="search" :option="option" style="margin-bottom: 20px;"
                 @submit="searchChange"></header-search>
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
        <template v-for="(item, index) in headRightIcon" :key="index">
          <el-button v-if="item.display" :icon="item.icon" circle @click="item.click"></el-button>
        </template>
      </div>
    </div>
    <el-table
        id="tableContent"
        v-loading="tableLoading"
        ref="elTable"
        class="table-content"
        :cell-style="{height: options.rowHeight}"
        :header-cell-style="{height: options.headerHeight}"
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
          <template #default="{row, column, $index}">
            <lq-image-list v-if="isUpload(item.type)" :src="row[item.prop]"
                           :height="`calc(${options.rowHeight} - 16px)`"></lq-image-list>
            <template v-else>
              {{ typeof item.formatter === "function" ? item.formatter(row, column, row[item.prop], $index) : row[item.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column
          :label="options.menuTitle"
          :align="options.menuAlign"
          :fixed="options.menuFixed"
          :width="options.menuWidth"
      >
        <template #default="{row, $index}">
          <el-button-group class="ml-4">
            <el-button
                v-if="options.viewBtn"
                :type="options.viewBtnType"
                :icon="options.viewBtnIcon"
                text style="font-size: 14px;"
                @click="view(row, $index)"
            >
              {{ options.viewBtnText }}
            </el-button>
            <el-button
                v-if="options.editBtn"
                :type="options.editBtnType"
                :icon="options.editBtnIcon"
                text style="font-size: 14px;"
                @click="edit(row, $index)"
            >
              {{ options.editBtnText }}
            </el-button>
            <el-button
                v-if="options.delBtn"
                :type="options.delBtnType"
                :icon="options.delBtnIcon"
                text style="font-size: 14px;"
                @click="remove(row, $index)"
            >
              {{ options.delBtnText }}
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- pagination -->
    <el-row justify="end" style="padding-top: 20px;">
      <div style="user-select: none;">
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
  <component
      :is="dialogType"
      v-model="dialogSwitch"
      :width="options.dialogWidth"
      :top="options.dialogTop"
      :fullscreen="options.dialogFullscreen"
      :modal="options.dialogModal"
      :close-on-press-escape="options.dialogEscape"
      :draggable="options.dialogDrag"
      :direction="options.dialogDirection"
      :show-close="false"
      :close-on-click-modal="false"
      class="lq-crud-dialog"
  >
    <template #header>
      <div class="lq-crud-dialog-header">
        <div class="lq-crud-dialog-header-title">
          {{options[`${formType}Title`]}}
        </div>
        <div class="lq-crud-dialog-header-btn">
          <el-icon class="icon" @click="dialogFullscreen"><FullScreen /></el-icon>
          <el-icon class="icon" @click="dialogClose"><Close /></el-icon>
        </div>
      </div>
    </template>
    <lq-form v-if="dialogSwitch && ['add', 'edit'].includes(formType)" v-model="form" :option="formOption"></lq-form>
  </component>
</template>

<style lang="scss" scoped>
.icon {
  cursor: pointer;
  & + .icon {
    margin-left: 20px;
  }
}

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

.lq-crud-dialog {
  //--el-dialog-padding-primary: 0px !important;
  //padding: var(--el-dialog-padding-primary);
  &:deep(.el-dialog__header) {
    padding: 0;
    margin-right: 0;
  }
  .lq-crud-dialog-header {
    display: flex;
    justify-content: space-between;

    .lq-crud-dialog-header-title {
    }

    .lq-crud-dialog-header-btn {
    }
  }
}
</style>
