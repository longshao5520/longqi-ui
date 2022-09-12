<template>
  <div class="lq-form">
    <el-form
        :model="form"
        :label-width="options.labelWidth"
        :label-position="options.labelPosition"
        :size="options.size"
        :rules="options.rules"
        :style="{width: options.width}"
    >
      <el-row>
        <template v-for="(item, index) in options.column" :key="index">
          <el-col v-if="item.display" :span="item.span || 24">
            <el-form-item
                :label="item.label"
                :label-width="item.labelWidth"
                :label-position="item.labelPosition"
                :size="item.size"
                :rules="item.rules"
            >
              <!--             style="width: 100%;"-->
              <component :is="getNodeType(item)" v-bind="{...item}" v-model="form[item.prop]">
                <template v-for="(subItem, subIndex) in item.dicData" :key="subIndex">
                  <component :is="getChildNodeType(item)"
                             v-bind="{...item,...subItem, label: item.type === 'radio' ? subItem.value : subItem.label}"
                             @input="$forceUpdate()"
                  >
                    <!--                             @clear="form[item.prop] = null"-->
                    {{ subItem.label }}
                  </component>
                </template>
              </component>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import {PropType, reactive, watch, watchEffect} from "vue";
import {LqFormOptions, OptionsColumn} from "./types";
import {cloneDeep, isNil} from "lodash";

// defineOptions({
//   name: 'LqForm',
// });

const props = defineProps({
  options: {
    type: Object as PropType<LqFormOptions>,
    required: true
  }
})

let options = reactive(props.options as LqFormOptions)
let form = reactive({})

const formInitVal = (list: Array<OptionsColumn>) => {
  let tableForm = {} as any;
  list.map(ele => {
    // if (
    //     (ARRAY_VALUE_LIST.includes(ele.type) && ele.emitPath !== false) ||
    //     (MULTIPLE_LIST.includes(ele.type) && ele.multiple) || ele.dataType === 'array'
    // ) {
    //   tableForm[ele.prop] = [];
    // } else if (RANGE_LIST.includes(ele.type) && ele.range == true) {
    //   tableForm[ele.prop] = [0, 0]
    // } else if (
    //     ['rate', 'slider', 'number'].includes(ele.type) ||
    //     ele.dataType === 'number'
    // ) {
    //   tableForm[ele.prop] = undefined;
    // } else {
    //   tableForm[ele.prop] = '';
    // }
    // if (ele.bind) {
    //   tableForm = createObj(tableForm, ele.bind);
    // }
    // 表单默认值设置
    if (!isNil(ele.value)) {
      tableForm[ele.prop] = ele.value;
      delete ele.value
    }
  });
  return tableForm;
}

watch(() => props.options, (options) => {
  form = reactive(cloneDeep(formInitVal(options.column)))
  console.log(form)
}, {deep: true, immediate: true})

watchEffect(() => {
  options = props.options as LqFormOptions
  options.size = options.size || "default";
  options.size = options.size || "default";
  options.labelWidth = options.labelWidth || "80px";
  options.labelPosition = options.labelPosition || "right";
  options.column.map(item => {
    item.clearable = item.clearable || true;
    item.display = item.display || true;
    if (["text", "textarea", "password", undefined].includes(item.type)) {
      item.placeholder = item.placeholder || "请输入 " + item.label;
    } else if (item.type === "select") {
      item.placeholder = item.placeholder || "请选择 " + item.label;
    }
  });
})


const getNodeType = (item: OptionsColumn) => {
  if (["text", "textarea", "password", undefined].includes(item.type)) {
    return "el-input";
  } else if (item.type === "checkbox" || item.type === "radio") {
    return `el-${item.type}-group`;
  } else if (item.type?.includes("date")) {
    return `el-date-picker`;
  } else {
    return `el-${item.type}`;
  }
};

const getChildNodeType = (item: OptionsColumn) => {
  if (item.type === "select") {
    return "el-option";
  } else if ((item.type === "checkbox" || item.type === "radio") && item.button) {
    return `el-${item.type}-button`;
  } else {
    return `el-${item.type}`;
  }
};

</script>
<style lang="scss" scoped></style>
