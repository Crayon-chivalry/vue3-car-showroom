<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 

// 获取 DOM 容器引用
const threeContainer = ref(null);

// 定义 Three.js 核心对象
let scene, camera, renderer, loader, carModel, controls;

// 容器尺寸
const containerWidth = ref(0);
const containerHeight = ref(0);

// 获取容器尺寸的函数
const getContainerSize = () => {
  const container = threeContainer.value;
  if (!container) return { width: 0, height: 0 };
  return {
    width: container.clientWidth,
    height: container.clientHeight
  };
};

// 初始化 Three.js 场景
const initScene = () => {
  // 1. 创建场景（所有3D对象的容器）
  scene = new THREE.Scene();
  scene.background = null;

  // 2. 创建相机（视角）
  const { width, height } = getContainerSize();
  camera = new THREE.PerspectiveCamera(
    75, // 视野角度（FOV）
    width / height, // 宽高比
    0.1, // 近裁剪面
    1000 // 远裁剪面
  );
  camera.position.set(5, 2, 5); // 设置相机位置 (x, y, z)
  camera.lookAt(0, 0, 0); // 让相机看向原点

  // 3. 创建渲染器（将3D场景绘制到2D画布）
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0); // 设置清除色为透明
  renderer.setSize(width, height); // 设置渲染尺寸
  renderer.shadowMap.enabled = true; // 启用阴影

  // 4. 将渲染器的画布添加到DOM
  threeContainer.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 启用阻尼效果
  controls.dampingFactor = 0.05; // 设置阻尼系数
  controls.screenSpacePanning = true; // 启用平移
  controls.minDistance = 3; // 最小缩放距离
  controls.maxDistance = 10; // 最大缩放距离
  controls.maxPolarAngle = Math.PI / 2; // 限制垂直旋转角度

  // 5. 添加灯光（没有灯光模型会显示为全黑）
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // 环境光
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // 平行光
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
};

// 加载 GLB 模型
const loadModel = async () => {
  loader = new GLTFLoader();
  
  try {
    // 加载模型文件
    const gltf = await loader.loadAsync('/src/assets/models/su7/source/SU7.glb');
    
    // 获取模型对象
    carModel = gltf.scene;
    
    // 调整模型属性
    carModel.scale.set(1, 1, 1); // 缩放模型
    carModel.position.y = -0.5; // 调整Y轴位置
    carModel.rotation.y = Math.PI; // 旋转180度（车头朝向）
    
    scene.add(carModel); // 将模型添加到场景
  } catch (error) {
    console.error('模型加载失败:', error);
  }
};

// 动画循环（持续渲染）
const animate = () => {
  requestAnimationFrame(animate); // 循环调用自身

  // 更新控制器
  controls?.update();
  
  // 如果需要旋转模型，可以在这里添加代码：
  // if (carModel) carModel.rotation.y += 0.01;
  
  renderer.render(scene, camera); // 执行渲染
};

// 组件挂载时初始化
onMounted(() => {
  initScene();
  loadModel();
  animate();
})

// 组件卸载时清理资源
onBeforeUnmount(() => {
  // 移除事件监听器
  window.removeEventListener('resize', onWindowResize);
  
  // 清理 Three.js 对象
  scene?.traverse((obj) => {
    if (obj.isMesh) {
      obj.geometry.dispose(); // 释放几何体
      obj.material.dispose(); // 释放材质
    }
  });
  controls?.dispose(); // 释放控制器
  renderer?.dispose(); // 释放渲染器
});
</script>

<template>
  <div>
    <!-- 用于挂载 Three.js 画布的容器 -->
    <div ref="threeContainer" class="three-container"></div>
  </div>
</template>

<style scoped>
.three-container {
  width: 100%;
  height: 400px;
}
</style>