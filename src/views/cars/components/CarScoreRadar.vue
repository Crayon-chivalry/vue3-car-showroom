<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'

const radarRef = ref(null)
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

// 雷达图
const initEcharts = () => {
  chartInstance = echarts.init(radarRef.value);
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

const onResize = () => {
  chartInstance.resize()
}

onMounted(() => {
  initEcharts()
})

defineExpose({
  onResize
})
</script>

<template>
  <div class="radar">
    <div ref="radarRef" class="radar-chart"></div>
    <div class="book-btn">定制和预订</div>
    <div class="book-btn">试驾</div>
  </div>
</template>

<style scoped>
.radar-chart {
  width: 350px;
  height: 350px;
}

.book-btn {
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #000;
  border-radius: 6px;
  background-color: #fff;
  font-size: 16px;
}

.book-btn:nth-child(2) {
  color: #fff;
  background-color: #4e545c;
}

@media (max-width: 768px) {
  .radar {
    margin-top: 20px;
    order: 1;
  }

  .radar-chart {
    width: 100%;
  }
}
</style>