<!-- 热门品牌 -->
<script setup>
</script>

<template>
  <div class="brand">
    <div class="brand-item" v-for="item in 10" :key="item">
      <img src="@/assets/image/brand/benz.jpg" class="brand-image" />
      <div>奔驰</div>
    </div>
  </div>
</template>

<style scoped>
.brand {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: #fff;
}

.brand-item {
  width: calc(20% - 20px);
  text-align: center;
}

.brand-image {
  width: 100px;
}
</style>