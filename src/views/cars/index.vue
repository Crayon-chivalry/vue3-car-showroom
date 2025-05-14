<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

import CarsList from './components/carsList.vue'

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

onMounted(() => {
  initEcharts()
})
</script>

<template>
  <div class="page">
    <!-- 汽车顶部信息 -->
    <div class="cars-header">
      <div>
        <div class="name">Mercedes-AMG S-Class</div>
        <div class="price">$96,000</div>
      </div>
      <img src="@/assets/image/brand/Mercedes-Benz.png" class="cars-logo" />
    </div>
    <div class="cars-content">
      <!-- 汽车评分 -->
       <div class="cars-content-left">
        <div ref="chartRef" class="radar-chart"></div>
        <div class="btn">定制和预订</div>
        <div class="btn">试驾</div>
       </div>
      <!-- 汽车模型 -->
      <div class="cars-model">
        <img src="@/assets/image/cars/cars-test.png" style="width: 70%;" />
      </div>
      <!-- 基本信息 -->
      <div class="cars-info">
        <div class="cars-info-item">
          <div class="info-title">Top Speed</div>
          <div class="info-value">212</div>
        </div>
        <div class="cars-info-item">
          <div class="info-title">Max Power</div>
          <div class="info-value">212</div>
        </div>
        <div class="cars-info-item">
          <div class="info-title">Engine</div>
          <div class="info-value">212</div>
        </div>
        <div class="cars-info-item">
          <div class="info-title">0 - 60 MPH</div>
          <div class="info-value">212</div>
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
  width: 300px;
  height: 300px;
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
  text-align: center;
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