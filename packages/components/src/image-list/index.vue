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
    // default: '100px',
  },
  height: {
    type: String,
    // default: '100px',
  },
  hideOnClickModal: {
    type: Boolean,
    default: true
  },
  fit: {
    type: String as PropType<"fill" | "contain" | "cover" | "none" | "scale">,
    values: ['', 'contain', 'cover', 'fill', 'none', 'scale-down'],
    default: '',
  },
  loading: {
    type: String,
    values: ['eager', 'lazy'],
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  scrollContainer: {
    type: [String, HTMLElement] as PropType<string | HTMLElement>,
  },
  zIndex: {
    type: Number,
  },
  alt: {
    type: String,
  },
})

const imageStyle = computed(() => ({
  width: props.width,
  height: props.height,
}))

const list = computed(() => {
  if (typeof props.src === "string") {
    if (props.src.includes(",")) {
      return props.src.split(",")
    } else {
      return [props.src];
    }
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
      <el-icon size="1.1em">
        <View/>
      </el-icon>
    </span>
    <el-image
        ref="Image"
        class="image"
        :src="img"
        :alt="alt"
        :fit="fit"
        :loading="loading"
        :lazy="lazy"
        :scroll-container="scrollContainer"
        :z-index="zIndex"
    ></el-image>
  </span>
  <el-image-viewer
      v-if="isPreview"
      :url-list="list"
      :initial-index="previewIndex"
      :hide-on-click-modal="hideOnClickModal"
      teleported
      @close="closePreview"/>
</template>

<style lang="scss" scoped>
.image-item {
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
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
