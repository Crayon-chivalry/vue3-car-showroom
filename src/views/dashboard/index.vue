<script setup>
// 轮播数据
const list = [
  { id: 1, image: 'swiper1.jpg' },
  { id: 2, image: 'swiper2.jpg' },
  { id: 3, image: 'swiper3.jpg' },
]

// 获取静态资源
const getImageUrl = (name) => {
  return new URL(`/src/assets/image/${name}`, import.meta.url).href
}
</script>

<template>
  <div>
    <!-- 顶部导航栏 -->
    <app-header />

    <!-- 轮播图 -->
    <el-carousel height="100vh" arrow="never" :interval="5000">
      <el-carousel-item v-for="item in list" :key="item.id">
        <img :src="getImageUrl(item.image)" class="swiper-image" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.swiper-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
