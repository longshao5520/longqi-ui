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
                  <lq-upload
                      v-else-if="isUpload(item.type)"
                      v-model="form[item.prop]"
                      :option="item"
                      style="width: 100%;"
                  />

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
      <el-row v-if="options.menuBtn" :justify="options.menuPosition">
        <el-button v-if="options.submitBtn" :icon="options.submitIcon" type="primary">
          {{ options.submitText }}
        </el-button>
        <el-button v-if="options.emptyBtn" :icon="options.emptyIcon">{{ options.emptyText }}</el-button>
        <slot name="menuForm">
        </slot>
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
import {PropType} from "vue";
import {LqFormOptions} from "./types";
import {useForm} from "./useForm";

defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  option: {
    type: Object as PropType<LqFormOptions>,
    required: true
  }
})

const {options, form, isDate, isUpload, getComponent, getMultipleOptionsComponent, filterAttributes} = useForm()


</script>
<style lang="scss" scoped>
.lq-form {

}

</style>
