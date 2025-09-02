<template>
  <view
    class="slider-verify"
    :class="{ verified: isVerified }"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <view class="slider-track" ref="trackRef">
      <view class="slider-text">{{ sliderText }}</view>
      <view
        class="slider-button"
        :style="{
          left: isVerified ? 'auto' : buttonLeft + 'px',
          right: isVerified ? buttonRight + 'px' : 'auto',
        }"
        @mousedown="onMouseDown"
        @touchstart="onTouchStart"
      >
        <text
          class="slider-icon"
          :class="{
            iconfont: true,
            'icon-duigou': isVerified,
            'icon-youshuangjiantou': !isVerified,
          }"
        ></text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, reactive, toRefs } from "vue";

const props = defineProps({
  width: {
    type: Number,
    default: 315,
  },
  height: {
    type: Number,
    default: 44,
  },
});

const emit = defineEmits([
  "verify",
  "reset",
  "handlerMove",
  "update:value",
  "passCallback",
]);

const state = reactive({
  isVerified: false,
  isDragging: false,
  startX: 0,
  buttonLeft: 0,
  buttonRight: 0,
  componentWidth: 0,
});

const {
  isVerified,
  isDragging,
  startX,
  buttonLeft,
  buttonRight,
  componentWidth,
} = toRefs(state);

const trackRef = ref(null);

const sliderText = computed(() => {
  return isVerified.value ? "验证通过" : "按住滑块拖动";
});

const getNumericWidth = () => {
  return componentWidth.value || props.width;
};

const updateMaxLeft = () => {
  if (trackRef.value) {
    const query = uni.createSelectorQuery().in(trackRef.value);
    query
      .select(".slider-track")
      .boundingClientRect((rect) => {
        if (rect) {
          componentWidth.value = rect.width;
        }
      })
      .exec();
  }
};

const handleDragStart = (clientX) => {
  if (isVerified.value) return;

  isDragging.value = true;
  startX.value = clientX - buttonLeft.value;
  updateMaxLeft();
  emit("handlerMove");
};

const onMouseDown = (e) => {
  handleDragStart(e.clientX);
};

const onTouchStart = (e) => {
  handleDragStart(e.touches[0].clientX);
};

const handleDragMove = (clientX) => {
  if (!isDragging.value || isVerified.value) return;

  const numericWidth = getNumericWidth();
  let currentX = clientX - startX.value;

  if (currentX > 0 && currentX <= numericWidth - 46) {
    buttonLeft.value = currentX;
  } else if (currentX > numericWidth - 46) {
    buttonLeft.value = numericWidth - 46;
    passVerify();
  }
};

const onMouseMove = (e) => {
  handleDragMove(e.clientX);
};

const onTouchMove = (e) => {
  handleDragMove(e.touches[0].clientX);
};

const handleDragEnd = (clientX) => {
  if (!isDragging.value || isVerified.value) return;

  const numericWidth = getNumericWidth();
  let finalX = clientX - startX.value;

  if (finalX < numericWidth - 46) {
    resetPosition();
  } else {
    passVerify();
  }
  isDragging.value = false;
};

const onMouseUp = (e) => {
  handleDragEnd(e.clientX);
};

const onTouchEnd = (e) => {
  handleDragEnd(e.changedTouches[0].clientX);
};

const resetPosition = () => {
  buttonLeft.value = 0;
};

const passVerify = () => {
  isVerified.value = true;
  isDragging.value = false;
  const numericWidth = getNumericWidth();
  buttonLeft.value = numericWidth - 46;
  buttonRight.value = 0;
  emit("verify");
  emit("update:value", true);
  emit("passCallback");
};

const reset = () => {
  isVerified.value = false;
  buttonLeft.value = 0;
  buttonRight.value = 0;
  isDragging.value = false;
  startX.value = 0;
  emit("reset");
  emit("update:value", false);
};

onMounted(() => {
  nextTick(() => {
    updateMaxLeft();
  });
});

defineExpose({
  reset,
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
