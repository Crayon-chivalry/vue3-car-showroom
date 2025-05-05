<script setup>
import { ref } from 'vue'
import { Search, International } from '@icon-park/vue-next';

import Brand from './Brand.vue'

const menuList = [
  {id: 1, name: '热门车型', url: ''},
  {id: 2, name: '热门品牌', url: ''},
  {id: 3, name: '门店', url: ''},
  {id: 4, name: '售后', url: ''},
  {id: 5, name: '关于我们', url: ''},
]

const showBrand = ref(false)

// 菜单项鼠标移入事件
const menuMouseenter = (item) => {
  if(item.id == 2) showBrand.value = true
}

// 菜单项鼠标移出事件
const menuMouseleave = (item) => {
  if(item.id == 2) showBrand.value = false
}
</script>

<template>
  <div class="app-header">
    <!-- logo -->
    <img src="@/assets/image/logo-white.png" class="logo-image" />

    <!-- 菜单栏 -->
    <div class="menu">
      <div class="menu-item" v-for="item in menuList" :key="item.id" @mouseenter="menuMouseenter(item)" @mouseleave="menuMouseleave(item)">
        {{ item.name }}
      </div>
    </div>

    <!-- 工具栏 -->
    <div class="tool">
      <search theme="outline" size="21" fill="#fff" class="tool-icon" />
      <international theme="outline" size="21" fill="#fff" class="tool-icon" />
    </div>

    <!-- 热门品牌组件 -->
    <brand v-model:show="showBrand" />
  </div>
</template>

<style scoped>
.app-header {
  position: fixed;
  padding: 0 40px;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: rgba(255, 255, 255, .4); */
}

.logo-image {
  width: 35px;
}

.menu {
  height: 100%;
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #fff;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
}

.tool {
  display: flex;
  gap: 30px;
}

.tool-icon {
  cursor: pointer;
}
</style>