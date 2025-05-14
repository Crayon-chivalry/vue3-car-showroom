<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const carouselConfig = {
  itemsToShow: 5,
  gap: 20,
  wrapAround: true,
  mouseWheel: true
}

const list = [
  {name: '小米su7', image: 'xiaomi-su7'},
  {name: '小鹏p7', image: 'xiaopeng-p7'},
  {name: '享界s9', image: 'xiangjie-s9'},
  {name: '比亚迪海豹', image: 'byd-haibao'},
  {name: '奔驰C级', image: 'benchi-c'},
  {name: '蔚来ES6', image: 'weilai-es6'},
  {name: '宝马i5', image: 'baoma-i5'},
]

const getImageUrl = (name) => {
  return new URL(`/src/assets/image/cars/${name}.png`, import.meta.url).href
}
</script>

<template>
  <div class="cars-list">
    <Carousel v-bind="carouselConfig">
      <Slide v-for="(item, index) in list" :key="index">
        <div class="cars-item">
          <img :src="getImageUrl(item.image)" class="cars-cover" />
          <div class="cars-name">{{ item.name }}</div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <!-- <Pagination /> -->
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.cars-list {
  margin-top: 20px;
}

.cars-item {
  padding: 25px 0;
  flex: 1;
  background: rgba(17, 23, 31, 0.4);
  backdrop-filter: blur(24px);
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
}

.cars-cover {
  width: 70%;
  height: 100px;
  object-fit: contain;
}

.cars-name {
  margin-top: 10px;
  color: #fff;
}

.carousel {
  --vc-nav-background: rgba(0, 0, 0, 0.3);
  --vc-nav-color: white;
  --vc-nav-color-hover: #e5e5e5;
  --vc-nav-border-radius: 50%;
  --vc-nav-width: 40px;
  --vc-nav-height: 40px;
}
</style>