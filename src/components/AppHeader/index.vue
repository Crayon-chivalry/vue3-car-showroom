<script setup>
import { ref } from "vue";

import Brand from "./Brand.vue";

// 导航栏主题
const theme = ref('light');

const menuList = [
  { id: 1, name: "热门车型", popover: true, url: "" },
  { id: 2, name: "热门品牌", popover: true, url: "" },
  { id: 3, name: "门店", popover: false, url: "" },
  { id: 4, name: "售后", popover: false, url: "" },
  { id: 5, name: "关于我们", popover: false, url: "" },
];

// 弹出框的样式
const popperStyle = {
  inset: '40px auto auto 0',
  borderRadius: 0,
  boxShadow: 'none'
}

// 弹出框显示时的回调
const onShowPopover = () => {
  theme.value = 'dark';
}

// 弹出框隐藏时的回调
const onHidePopover = () => {
  theme.value = 'light';
}
</script>

<template>
  <div class="app-header" :class="{'dark-theme': theme == 'dark'}">
    <!-- logo -->
    <img src="@/assets/image/logo-white.png" class="logo-image" v-if="theme == 'light'" />
    <img src="@/assets/image/logo-black.png" class="logo-image" v-else />

    <!-- 菜单栏 -->
    <div class="menu">
      <template v-for="item in menuList" :key="item.id">
        <el-popover
          placement="bottom"
          :show-arrow="false"
          width="100vw"
          :popper-style="popperStyle"
          @show="onShowPopover"
          @hide="onHidePopover"
          v-if="item.popover"
        >
          <template #reference>
            <div class="menu-item">{{ item.name }}</div>
          </template>
          <!-- 热门品牌组件 -->
          <brand v-if="item.id == 2" />
        </el-popover>
        <div class="menu-item" v-else>{{ item.name }}</div>
      </template>
    </div>

    <!-- 工具栏 -->
    <div class="tool">
      <el-icon size="21" class="tool-icon"><Search /></el-icon>
      <el-icon size="21" class="tool-icon"><SetUp /></el-icon>
    </div>
  </div>
</template>

<style scoped>
.app-header {
  position: fixed;
  padding: 0 40px;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}

.logo-image {
  width: 35px;
}

.menu {
  height: 100%;
  display: flex;
  gap: 20px;
  font-size: 14px;
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
  color: #fff;
  cursor: pointer;
}

.dark-theme {
  color: #000;
  background-color: #fff;
}

.dark-theme .tool-icon {
  color: #000;
}
</style>
