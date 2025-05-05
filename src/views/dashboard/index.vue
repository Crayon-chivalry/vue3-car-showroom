<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'


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
    <app-header />

    <Carousel :autoplay="6000" :wrap-around="true" height="100vh">
      <Slide v-for="item in list" :key="item.id">
        <img :src="getImageUrl(item.image)" class="swiper-image" />
      </Slide>

      <template #addons>
        <!-- <Navigation /> -->
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.swiper-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.carousel {
  --vc-pgn-background-color: hsla(0,0%,100%,.3);
  --vc-pgn-active-color: white;
  --vc-pgn-border-radius: 2px;
  --vc-pgn-height: 3px;
  --vc-pgn-width: 25px;
}
</style>
