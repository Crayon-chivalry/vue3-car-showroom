import { ref } from 'vue'

export const windowWidth = ref(window.innerWidth)
export const isMobile = ref(windowWidth.value <= 768)

function setRootFontSize() {
  const designWidth = 1920 // PC设计稿宽度
  const baseSize = 192 // PC端基准值

  windowWidth.value = window.innerWidth
  isMobile.value = windowWidth.value <= 768

  let fontSize
  if (isMobile.value) {
    // 移动端采用 PC 设计稿等比缩放
    fontSize = (windowWidth.value / designWidth) * baseSize * 3.5
  } else {
    // PC端采用 1920 设计稿的计算方式, 大于则按PC端基准值
    fontSize = windowWidth.value >= designWidth 
      ? baseSize
      : (windowWidth.value / designWidth) * baseSize
  }
  document.documentElement.style.fontSize = fontSize + 'px'
}

setRootFontSize()

// 当屏幕大小变化时，调用
window.addEventListener('resize', () => {
  setRootFontSize ()
})