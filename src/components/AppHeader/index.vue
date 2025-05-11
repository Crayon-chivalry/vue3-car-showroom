<script setup>
import { ref } from "vue";

import Brand from "./Brand.vue";

// 导航栏主题
const theme = ref("light");

const menuList = [
  { id: 1, name: "热门车型", url: "", showDrawer: true },
  { id: 2, name: "热门品牌", url: "", showDrawer: true },
  { id: 3, name: "门店", url: "", showDrawer: false },
  { id: 4, name: "售后", url: "", showDrawer: false }, 
  { id: 5, name: "关于我们", url: "", showDrawer: false }
];

const showDrawer = ref(false);

// 鼠标移入事件
const onMouseenter = (item) => {
  console.log("鼠标移入", item);
  if (item.id == 2) {
    showDrawer.value = true;
    theme.value = "dark";
  }
};

// 鼠标移出事件
const onMouseleave = () => {
  console.log("鼠标移出");
  showDrawer.value = false;
  theme.value = "light";
};
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
        @mouseleave="onMouseleave"
      >
        <span>{{ item.name }}</span>
        <Transition name="drawer-slide">
          <div class="drawer" v-if="showDrawer && item.showDrawer">
            <!-- 热门品牌 -->
            <brand />
          </div>
        </Transition>
      </div>
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
  z-index: 99;
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
  z-index: 9999;
}

.dark-theme .tool-icon {
  color: #000;
}

.drawer {
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 8;
  transform-origin: top; /* 设置变形的原点在顶部 */
}

/* 弹框动画样式 */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: all 0.3s ease;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
</style>
