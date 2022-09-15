<template>
  <div class="lq-form">
    <el-form
        :model="form"
        :label-width="options.labelWidth"
        :label-position="options.labelPosition"
        :size="options.size"
    >
      <el-row>
        <template v-for="(item, index) in options.column" :key="index">
          <el-col v-if="item.display" :span="item.span || 24">
            <el-form-item
                :label="item.label + (item.labelSuffix || options.labelSuffix)"
                :label-width="item.labelWidth"
                :label-position="item.labelPosition"
                :size="item.size"
                :rules="item.rules"
            >
              <template #default>
                <slot :name="item.prop">
                  <el-date-picker
                      v-if="isDate(item.type)"
                      v-model="form[item.prop]"
                      v-bind="{...filterAttributes(item)}"
                  />
                  <el-transfer
                      v-else-if="item.type === 'transfer'"
                      v-model="form[item.prop]"
                      v-bind="{...filterAttributes(item)}"
                  />
                  <el-upload
                      v-else-if="item.type === 'upload'"
                      v-model="form[item.prop]"
                      v-bind="{...filterAttributes(item)}"
                  >
                    <el-button type="primary">点击上传</el-button>
                  </el-upload>
                  <component
                      v-else
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
                </slot>
              </template>
              <template #label>
                <slot :name="`${item.prop}Label`"></slot>
              </template>
              <template #error>
                <slot :name="`${item.prop}Error`"></slot>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <el-row>
        <slot name="menuForm">
          <el-button v-if="options.submitBtn" :icon="Select" type="primary">{{ options.submitText }}</el-button>
          <el-button v-if="options.emptyBtn" :icon="Delete">{{ options.submitText }}</el-button>
        </slot>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import {PropType, reactive, watch} from "vue";
import {LqFormOptions, OptionsColumn} from "./types";
import {cloneDeep, isNil} from "lodash";
import {useForm} from "./useForm";
import {Delete, Select} from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  option: {
    type: Object as PropType<LqFormOptions>,
    required: true
  }
})

const {options, isDate, getComponent, getMultipleOptionsComponent, filterAttributes} = useForm()

let form = reactive({})


const formInitVal = (list: Array<OptionsColumn>) => {
  let tableForm = {} as any;
  list.map(ele => {
    if (!isNil(ele.value)) {
      tableForm[ele.prop] = ele.value;
      // } else {
      //   tableForm[ele.prop] = null;
    }
  });
  return tableForm;
}

watch(() => props.option, (option) => {
  form = reactive(cloneDeep(formInitVal(option.column)))
  console.log(form)
}, {deep: true, immediate: true})


</script>
<style lang="scss" scoped>
.lq-form {

}

</style>
