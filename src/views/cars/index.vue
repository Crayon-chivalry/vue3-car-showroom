<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

import CarsList from './components/carsList.vue'
import CarsShowroom from './components/CarsShowroom.vue'
import CarsToolBar from './components/CarsToolBar.vue'

const chartRef = ref(null)
let chartInstance = null

const radarNameList = [
  { name: '外观', max: 5},
  { name: '内饰', max: 5},
  { name: '配置', max: 5},
  { name: '空间', max: 5},
  { name: '操控', max: 5},
  { name: '动力', max: 5},
]
const radarValueList = [4.2, 3.5, 2.8, 3.9, 4.3, 4.1, 4.5]

const carsShowroomRef = ref(null)

// 雷达图
const initEcharts = () => {
  chartInstance = echarts.init(chartRef.value);
  const option = {
    radar: {
      radius: '65%',
      indicator: radarNameList,
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#343c49']
        }
      },
      splitLine: {
        show: false
      },
      axisName: {
         formatter: (name) => {
          const index = radarNameList.findIndex(item => item.name === name);
          return `${name}\n${radarValueList[index]}`
        },
        align: 'center',
      }
    },
    series: [
      {
        name: 'score',
        type: 'radar',
        symbol: 'none',
        lineStyle: {
          color: 'white'
        },
        data: [
          {
            value: radarValueList,
            name: '评分',
            areaStyle: {
              opacity: 1,
              color: '#85898f'
            },
          }
        ],
      }
    ]
  }
  chartInstance.setOption(option)
}

// 设置模型外部颜色
const colorChange = (color) => {
  carsShowroomRef.value.setCarModelOutsideColor(color)
}

// 处理窗口大小变化
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
  if (carsShowroomRef.value) {
    // 调用3D组件的更新方法
    carsShowroomRef.value.onResize()
  }
}

onMounted(() => {
  initEcharts()
  // window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="page">
    <!-- 汽车顶部信息 -->
    <div class="cars-header">
      <div>
        <div class="name">小米SU7</div>
        <div class="price">21.59-29.99万</div>
      </div>
      <img src="@/assets/image/brand/Xiaomi.png" class="cars-logo" />
    </div>
    <div class="cars-content">
      <!-- 汽车评分 -->
       <div class="cars-content-left">
        <div ref="chartRef" class="radar-chart"></div>
        <div class="btn">定制和预订</div>
        <div class="btn">试驾</div>
       </div>
      <!-- 汽车模型/展示 -->
      <div class="cars-model">
        <cars-showroom ref="carsShowroomRef" />
        <cars-tool-bar @colorChange="colorChange" />
      </div>
      <!-- 基本信息 -->
      <div class="cars-info">
        <div class="cars-info-item">
          <div class="info-title">最高时速</div>
          <div class="info-value">210Km/h</div>
        </div>
        <div class="cars-info-item">
          <div class="info-title">驱动方式</div>
          <div class="info-value">后驱</div>
        </div>
        <div class="cars-info-item">
          <div class="info-title">续航</div>
          <div class="info-value">700km</div>
        </div>
        <div class="cars-info-item">
          <div class="info-title">百公里加速</div>
          <div class="info-value">5.28s</div>
        </div>
        <div class="details-btn">详情</div>
      </div>
    </div>
    <cars-list />
  </div>
</template>

<style scoped>
.page {
  padding: 40px;
  min-height: 100vh;
  box-sizing: border-box;
  background: radial-gradient(50% 50% at 55.20% 50%, #29375B 0%, #21272D 100%);
}

.cars-header {
  display: flex;
  justify-content: space-between;
}

.cars-logo {
  width: 60px;
  height: 60px;
}

.name {
  font-size: 32px;
  font-weight: bold;
  color: #fff;
}

.price {
  margin-top: 8px;
  font-size: 24px;
  color: #fff;
}

.cars-content {
  margin-top: 60px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.radar-chart {
  width: 350px;
  height: 350px;
}

.cars-content-left .btn {
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #000;
  border-radius: 6px;
  background-color: #fff;
}

.cars-content-left .btn:nth-child(2) {
  color: #fff;
  background-color: #4e545c;
}

.cars-model {
  flex: 1;
}

.cars-info-item {
  text-align: right;
}

.cars-info-item:nth-child(n+2) {
  margin-top: 32px;
}

.info-title {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.4);
}

.info-value {
  margin-top: 4px;
  color: #fff;
  font-size: 24px;
}

.details-btn {
  margin-top: 32px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #fff;
  border-radius: 6px;
  background-color: #4e545c;
}
</style>