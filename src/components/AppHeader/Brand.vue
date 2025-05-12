<!-- 热门品牌 -->
<script setup>
const list = [
  { id: 1, name: '奥迪', englishName: 'Audi' },
  { id: 2, name: '宝马', englishName: 'BMW' },
  { id: 3, name: '奔驰', englishName: 'Mercedes-Benz' },
  { id: 4, name: '保时捷', englishName: 'Porsche' },
  { id: 5, name: '本田', englishName: 'Honda' },
  { id: 6, name: '比亚迪', englishName: 'BYD' },
  { id: 7, name: '大众', englishName: 'Volkswagen' },
  { id: 8, name: '凯迪拉克', englishName: 'Cadillac' },
  { id: 9, name: '雷克萨斯', englishName: 'Lexus' },
  { id: 10, name: '小米', englishName: 'Xiaomi' },
  { id: 11, name: '法拉利', englishName: 'Ferrari' },
];

const getImageUrl = (englishName) => {
  return new URL(`/src/assets/image/brand/${englishName}.png`, import.meta.url).href
}
</script>

<template>
  <div class="brand">
    <div class="brand-item" v-for="item in list" :key="item.id">
      <img :src="getImageUrl(item.englishName)" class="brand-image" />
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.brand {
  padding: 40px 0 60px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px 20px;
  color: #000;
  background-color: #fff;
}

.brand-item {
  width: calc(20% - 20px);
  text-align: center;
  cursor: pointer;
}

.brand-image {
  width: 80px;
}
</style>