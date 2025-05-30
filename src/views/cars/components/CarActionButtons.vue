<script setup>
import { ref } from 'vue';

const $emit = defineEmits(['colorChange'])

const colorList = [
  {id: 1, name: '海湾蓝', color: '#199BBC'},
  {id: 2, name: '璀璨洋红', color: '#9A044C'},
  {id: 3, name: '橄榄绿', color: '#717A60'},
  {id: 4, name: '熔岩橙', color: '#FE5F20'},
  {id: 5, name: '珍珠白', color: '#F5F5F5'},
  {id: 6, name: '霞光紫', color: '#685377'},
]

const colorActive = ref(1)
const linkList = [
  {id: 1, name: '外观', src: ''},
  {id: 2, name: '内饰', src: ''},
  {id: 3, name: '空间', src: ''},
  {id: 4, name: '全局内饰', src: ''}
]

const colorClick = (item) => {
  colorActive.value = item.id
  console.log(item.color)
  $emit('colorChange', item.color)
}
</script>

<template>
  <div class="action-buttons">
    <div class="color-list">
      <div 
        class="color-item" 
        :class="{'color-item-active': colorActive == item.id}" 
        v-for="item in colorList" :key="item.id" 
        :style="{'--color': item.color}"
        @click="colorClick(item)"
      ></div>
    </div>
    <div class="link">
      <div class="link-item" v-for="item in linkList" :key="item.id">
        <span>{{ item.name }}</span>
        <img src="@/assets/image/link.png" class="link-image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
}

.color-list {
  display: flex;
  gap: 20px;
}

.color-item {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background-color: var(--color);
  cursor: pointer;
}

.color-item-active::after {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid #fff;
}

.link {
  display: flex;
  gap: 35px;
}

.link-item {
  padding: 4px 8px;
  display: flex;
  align-items: center;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.link-item:hover {
  background-color: rgba(90, 105, 143, .4);
}

.link-image {
  width: 20px;
}

@media (max-width: 768px) {
  .action-buttons {
    display: block;
  }

  .color-list {
    justify-content: center;
  }

  .link {
    margin-top: 20px;
    justify-content: center;
  }
}
</style>