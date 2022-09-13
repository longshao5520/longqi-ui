<template>
  <div class="lq-form">
    <el-form
        :model="form"
        :label-width="options.labelWidth"
        :label-position="options.labelPosition"
        :size="options.size"
        :rules="options.rules"
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
              <el-date-picker
                  v-if="isDate(item.type)"
                  v-model="form[item.prop]"
                  v-bind="{...filterAttributes(item)}"
              />
              <component
                  v-if="!isDate(item.type)"
                  :is="getComponent(item)"
                  v-bind="{...filterAttributes(item)}"
                  v-model="form[item.prop]"
              >
                <template v-if="['radio', 'checkbox', 'select'].includes(item.type)">
                  <component
                      v-for="(subItem, subIndex) in item.dicData" :key="subIndex"
                      :is="getMultipleOptionsComponent(item)"
                      v-bind="{...item,...subItem, label: item.type === 'radio' ? subItem.value : subItem.label}"
                  >
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
import {PropType, reactive, watch} from "vue";
import {LqFormOptions, OptionsColumn} from "./types";
import {cloneDeep, isNil} from "lodash";
import {useForm} from "./useForm";

const props = defineProps({
  options: {
    type: Object as PropType<LqFormOptions>,
    required: true
  }
})

const {options, isDate, getComponent, getMultipleOptionsComponent, filterAttributes} = useForm()

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


</script>
<style lang="scss" scoped></style>
