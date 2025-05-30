<script setup>
defineProps({
  name: {
    type: String,
    default: '名称'
  },
  price: {
    type: String,
    default: ''
  },
  logo: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="car-header">
    <div>
      <div class="name">{{ name }}</div>
      <div class="price">{{ price }}</div>
    </div>
    <img :src="logo" class="cars-logo" />
  </div>
</template>

<style scoped>
.car-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cars-logo {
  width: 70px;
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
</style>