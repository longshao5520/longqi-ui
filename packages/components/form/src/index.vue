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
          <el-col :span="item.span || 24">
            <el-form-item
                v-if="item.visible"
                :label="item.label"
                :label-width="item.labelWidth"
                :label-position="item.labelPosition"
                :size="item.size"
                :rules="item.rules"
            >
              <template
                  v-if="['text','textarea','password',undefined].includes(item.type)">
                <el-input
                    v-model="form[item.prop]"
                    :type="item.type"
                    :placeholder="item.placeholder ? item.placeholder : '请输入 ' + item.label"
                    :disabled="item.disabled"
                    :clearable="item.clearable"
                    :readonly="item.readonly"
                    :maxlength="item.maxlength"
                    :minlength="item.minlength"
                    :autosize="item.autosize"
                    :rows="item.rows"
                    :resize="item.resize"
                    :show-password="item.showPassword"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                    v-model="form[item.prop]"
                    :placeholder="item.placeholder ? item.placeholder : '请选择 ' + item.label"
                    :disabled="item.disabled"
                    :clearable="item.clearable"
                    :readonly="item.readonly"
                    :multiple="item.multiple"
                    :multipleLimit="item.multipleLimit"
                    :collapseTags="item.collapseTags"
                    :collapseTagsTooltip="item.collapseTagsTooltip"
                    :filterable="item.filterable"
                    :allowCreate="item.allowCreate"
                    :filterMethod="item.filterMethod"
                    :remote="item.remote"
                    :remoteMethod="item.remoteMethod"
                    :defaultFirstOption="item.defaultFirstOption"
                    :loadingText="item.loadingText"
                    style="width: 100%"
                >
                  <el-option v-for="dic in item.dicData" :key="dic.value" :label="dic.label"
                             :value="dic.value"></el-option>
                </el-select>
              </template>
              <template v-if="item.type === 'checkbox'">
                <el-checkbox-group v-model="form[item.prop]" :disabled="item.disabled" :border="item.border">
                  <template v-if="item.button">
                    <el-checkbox-button v-for="dic in item.dicData" :key="dic.value" :label="dic.value">
                      {{ dic.label }}
                    </el-checkbox-button>
                  </template>
                  <template v-if="!item.button">
                    <el-checkbox v-for="dic in item.dicData" :key="dic.value" :label="dic.value">
                      {{ dic.label }}
                    </el-checkbox>
                  </template>
                </el-checkbox-group>
              </template>
              <template v-if="item.type === 'radio'">
                <el-radio-group v-model="form[item.prop]" :disabled="item.disabled" :border="item.border">
                  <template v-if="item.button">
                    <el-radio-button v-for="dic in item.dicData" :key="dic.value" :label="dic.value">
                      {{ dic.label }}
                    </el-radio-button>
                  </template>
                  <template v-if="!item.button">
                    <el-radio v-for="dic in item.dicData" :key="dic.value" :label="dic.value">
                      {{ dic.label }}
                    </el-radio>
                  </template>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import 'element-plus/dist/index.css'
import {
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElRow,
  ElSelect
} from 'element-plus'
import {PropType, reactive, watchEffect} from "vue";
import {LqFormOptions} from "./types";

defineOptions({
  name: 'LqForm',
});

const props = defineProps({
  options: {
    type: Object as PropType<LqFormOptions>
  }
})

let options = reactive(props.options as LqFormOptions)

watchEffect(() => {
  options = props.options as LqFormOptions
  options.size = options.size ? options.size : 'default'
  options.labelWidth = options.labelWidth ? options.labelWidth : '80px'
  options.labelPosition = options.labelPosition ? options.labelPosition : 'right'
  options.column.map(item => {
    item.visible = item.visible ? item.visible : true
    item.clearable = item.clearable ? item.clearable : true
  })
})

const form = reactive({})

</script>
<style lang="scss" scoped></style>
