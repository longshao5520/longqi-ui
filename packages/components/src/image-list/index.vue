<script lang="ts">
export default {
  name: "LqImageList"
}
</script>
<script lang="ts" setup>
import {computed, PropType, ref} from "vue";
import {View} from '@element-plus/icons-vue'

const props = defineProps({
  src: {
    type: [String, Array] as PropType<string | Array<string>>,
    default: () => [],
  },
  width: {
    type: String,
    default: '100px',
  },
  height: {
    type: String,
    default: '100px',
  },
})

const imageStyle = computed(() => ({
  width: props.width.includes("px") ? props.width : `${props.width}px`,
  height: props.height.includes("px") ? props.height : `${props.height}px`,
}))

const list = computed(() => {
  if (typeof props.src === 'string') {
    return [props.src];
  } else {
    return props.src;
  }
})

const Image = ref();
const isPreview = ref(false);
const previewIndex = ref(0)
const showPreview = (index: number) => {
  previewIndex.value = index
  isPreview.value = true;
}
const closePreview = () => {
  isPreview.value = false;
  previewIndex.value = 0
}
</script>

<template>
  <span v-for="(img, index) in list" class="image-item" :style="imageStyle">
    <span class="warp" @click="showPreview(index)">
      <el-icon size="1.5em">
        <View />
      </el-icon>
    </span>
    <el-image
        ref="Image"
        class="image"
        :src="img"
    ></el-image>
  </span>
  <el-image-viewer
      v-if="isPreview"
      :url-list="list"
      :initial-index="previewIndex"
      hide-on-click-modal
      teleported
      @close="closePreview"/>
</template>

<style lang="scss" scoped>
.image-item {
  // width: 100px;
  // height: 100px;
  position: relative;
  display: inline-block;
  cursor: pointer;

  & + .image-item {
    margin-left: 10px;
  }

  .image {
    width: 100%;
    height: 100%;
  }

  .warp {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  &:hover {
    .warp {
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
}
</style>
