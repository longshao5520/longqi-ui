<template>
  <div class="lq-form">
    <el-form
        ref="formRef"
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
                      style="width: 100%;"
                  />
                  <el-transfer
                      v-else-if="item.type === 'transfer'"
                      v-model="form[item.prop]"
                      v-bind="{...filterAttributes(item)}"
                      style="width: 100%;"
                  />
                  <lq-upload
                      v-else-if="isUpload(item.type)"
                      ref="upload"
                      v-model="form[item.prop]"
                      :option="item"
                      style="width: 100%;"
                  />

                  <component
                      v-else
                      :is="getComponent(item)"
                      v-bind="{...filterAttributes(item)}"
                      v-model="form[item.prop]"
                      :style="{width: ['switch'].includes(item.type) ? '' : '100%'}"
                      @keyup.enter.native="enterChange(formRef)"
                  >
                    <template v-if="['radio', 'checkbox', 'select'].includes(item.type)">
                      <component
                          v-for="(subItem, subIndex) in item.dicData" :key="subIndex"
                          :is="getMultipleOptionsComponent(item)"
                          v-bind="{...item,...subItem, label: item.type !== 'select' ? subItem.value : subItem.label}"
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
      <el-row v-if="options.menuBtn" :justify="options.menuPosition">
        <el-button v-if="options.submitBtn" :icon="options.submitIcon" :loading="loading" :disabled="loading" type="primary" @click="submit(formRef)">
          {{ options.submitText }}
        </el-button>
        <el-button v-if="options.emptyBtn" :icon="options.emptyIcon" :loading="loading" :disabled="loading" @click="resetForm(formRef)">
          {{ options.emptyText }}
        </el-button>
        <slot name="menuForm"></slot>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
export default {
  name: "LqForm"
}
</script>
<script lang="ts" setup>
import {PropType, ref} from "vue";
import {LqFormOptions} from "./types";
import {useForm} from "./useForm";
import {FormInstance} from "element-plus";

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

const emit = defineEmits(["submit"])

const formRef = ref<FormInstance>()

const {options, form, isDate, isUpload, getComponent, getMultipleOptionsComponent, filterAttributes} = useForm()
const loading = ref(false)

const show = () => {
  options.column.map(item => {
    item.disabled = true;
  })
  loading.value = true
}
const hide = () => {
  options.column.map(item => {
    item.disabled = false;
  })
  loading.value = false
}

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  show()
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit("submit", form, hide)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const enterChange = (formEl: FormInstance | undefined) => {
  if (options.enter) {
    submit(formEl)
  }
}

const upload = ref()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  Object.keys(form).map(item => {
    delete  form[item]
  })
  upload.value.map((item: any) => {
    item.clearFiles()
  })
}

const validate = () => {}
const validateField = () => {}
const updateDic = () => {}

</script>
<style lang="scss" scoped>
.lq-form {

}

</style>
