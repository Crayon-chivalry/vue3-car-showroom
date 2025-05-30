<script setup>
defineProps({
  info: {
    type: Object,
    default: () => ({
      maxSpeed: '',
      driveType: '',
      range: '',
      acceleration: ''
    })
  }
})
</script>

<template>
  <div class="cars-info">
    <div class="cars-info-item">
      <div class="info-title">最高时速</div>
      <div class="info-value">{{ info.maxSpeed }}</div>
    </div>
    <div class="cars-info-item">
      <div class="info-title">驱动方式</div>
      <div class="info-value">{{ info.driveType }}</div>
    </div>
    <div class="cars-info-item">
      <div class="info-title">续航</div>
      <div class="info-value">{{ info.range }}</div>
    </div>
    <div class="cars-info-item">
      <div class="info-title">百公里加速</div>
      <div class="info-value">{{ info.acceleration }}</div>
    </div>
    <div class="details-btn">详情</div>
  </div>
</template>

<style scoped>
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
  font-size: 16px;
}

@media (max-width: 768px) {
  .cars-info {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
  }

  .cars-info-item {
    flex: 1;
    text-align: center;
  }

  .details-btn {
    width: 100%;
  }

  .cars-info-item:nth-child(n+2) {
    margin-top: 0;
  }
}
</style>