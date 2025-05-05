<!-- 热门品牌 -->
<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const $emit = defineEmits(['update:show'])
</script>

<template>
  <div class="brand" v-if="show">
    <div class="brand-item" v-for="item in 10" :key="item">
      <img src="@/assets/image/brand/benz.jpg" class="brand-image" />
      <div>奔驰</div>
    </div>
  </div>
</template>

<style scoped>
.brand {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.brand-item {
  width: calc(20% - 20px);
  text-align: center;
}

.brand-image {
  width: 100px;
}
</style>