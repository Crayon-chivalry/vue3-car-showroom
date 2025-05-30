<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'

import CarHeader from './components/CarHeader.vue'
import CarScoreRadar from './components/CarScoreRadar.vue'
import CarBaseInfo from './components/CarBaseInfo.vue'
import CarList from './components/CarList.vue'
import CarShowroom from './components/CarShowroom.vue'
import CarActionButtons from './components/CarActionButtons.vue'

const carShowroomRef = ref(null)
const carScoreRadarRef = ref(null)

const carInfo = {
  maxSpeed: '210Km/h',
  driveType: '后驱',
  range: '700km',
  acceleration: '5.28s'
}

const getImageUrl = (name) => {
  return new URL(`/src/assets/image/brand/${name}.png`, import.meta.url).href
}

// 设置模型外部颜色
const colorChange = (color) => {
  carShowroomRef.value.setCarModelOutsideColor(color)
}

// 处理窗口大小变化
const handleResize = () => {
  if (carScoreRadarRef.value) {
    carScoreRadarRef.value.onResize()
  }
  if (carShowroomRef.value) {
    carShowroomRef.value.onResize()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="page">
    <!-- 汽车顶部信息 -->
    <car-header name="小米SU7" price="21.59-29.99万" :logo="getImageUrl('Xiaomi')" />
    <div class="cars">
      <!-- 雷达图 -->
      <car-score-radar ref="carScoreRadarRef" />
      <div class="cars-container">
        <!-- 汽车模型展示 -->
        <car-showroom ref="carShowroomRef" />
        <!-- 操作按钮 -->
        <car-action-buttons @colorChange="colorChange" />
      </div>
      <!-- 基本信息 -->
      <car-base-info :info="carInfo" />
    </div>
    <car-list />
  </div>
</template>

<style scoped>
.page {
  padding: 40px 40px 30px;
  min-height: 100vh;
  box-sizing: border-box;
  background: radial-gradient(50% 50% at 55.20% 50%, #29375B 0%, #21272D 100%);
}

.cars {
  margin-top: 60px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.cars-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .page {
    padding: 30px;
  }

  .cars {
    display: flex;
    flex-direction: column;
  }

  .cars > div {
    width: 100%;
  }
}
</style>