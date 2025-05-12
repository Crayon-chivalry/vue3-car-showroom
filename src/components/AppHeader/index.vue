<script setup>
import { ref } from "vue";

import Brand from "./Brand.vue";
import HotCars from "./HotCars.vue";

// 导航栏主题
const theme = ref("light");
const activeMenuId = ref('')

const menuList = [
  { id: 1, name: "热门车型", url: "", showDrawer: true },
  { id: 2, name: "热门品牌", url: "", showDrawer: true },
  { id: 3, name: "门店", url: "", showDrawer: false },
  { id: 4, name: "售后", url: "", showDrawer: false }, 
  { id: 5, name: "关于我们", url: "", showDrawer: false }
];

const showDrawer = ref(false);

// 菜单栏鼠标移入事件
const onMouseenter = (item) => {
  activeMenuId.value = item.id
  if (item.showDrawer) {
    theme.value = "dark";
    showDrawer.value = true;
  }
};

// 菜单栏鼠标移出事件
const onMouseleave = (item) => {
  if(item.showDrawer && showDrawer.value) {
    showDrawer.value = false;
    theme.value = "light";
  }
};

// drawer 弹框鼠标移入事件
const drawerMouseleave = (e) => {
  const relatedTarget = e.relatedTarget;
  if(relatedTarget && relatedTarget.classList.contains('el-overlay')) {
    showDrawer.value = false
    theme.value = "light";
  }
}
</script>

<template>
  <div class="app-header" :class="{ 'dark-theme': theme == 'dark' }">
    <!-- logo -->
    <img src="@/assets/image/logo-white.png" class="logo-image" v-if="theme == 'light'" />
    <img src="@/assets/image/logo-black.png" class="logo-image" v-else />

    <!-- 菜单栏 -->
    <div class="menu">
      <div
        class="menu-item"
        v-for="item in menuList"
        :key="item.id"
        @mouseenter="onMouseenter(item)"
        @mouseleave="onMouseleave(item)"
        
      >
        <span class="menu-name">{{ item.name }}</span>
        <!-- 弹框 热门车型/热门品牌 -->
        <el-drawer 
          v-model="showDrawer" 
          direction="ttb" 
          :with-header="false" 
          size="auto" 
          body-class="drawer-body" 
          @mouseleave="drawerMouseleave"
          v-if="item.showDrawer && activeMenuId == item.id"
        >
          <component :is="activeMenuId == 1 ? HotCars : Brand" />
        </el-drawer>
      </div>
    </div>

    <!-- 工具栏 -->
    <div class="tool">
      <el-icon size="21" class="tool-icon"><Search /></el-icon>
      <el-icon size="21" class="tool-icon"><SetUp /></el-icon>
    </div>
  </div>
</template>

<style scopeds>
.app-header {
  position: fixed;
  padding: 0 40px;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  transition: all .4s;
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
}

.menu-name {
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
  z-index: 9999;
}

.dark-theme .tool-icon {
  color: #000;
}

.el-overlay {
  top: 40px;
}

.drawer-body {
  padding: 0;
}
</style>
