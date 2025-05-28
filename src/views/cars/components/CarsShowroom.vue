<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const threeContainer = ref(null)

// 容器尺寸
const containerWidth = ref(0)
const containerHeight = ref(0)

let scene, camera, renderer, controls, carModel;

// 初始化 Three.js 场景
const initScene = () => {
  // 创建场景
  scene = new THREE.Scene();

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    35,
    containerWidth.value / containerHeight.value,
    0.1,
    1000
  );
  camera.position.set(20, 3, 0); // 设置相机位置
  camera.lookAt(0, 0, 0); //坐标原点

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  // 启用物理光照计算
  renderer.physicallyCorrectLights = true;
  // 设置色调映射以增强明暗对比
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5; // 调整曝光度
  renderer.setSize(containerWidth.value, containerHeight.value)
  threeContainer.value.appendChild(renderer.domElement);

  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  // 主光源 - 模拟太阳光
  const mainLight = new THREE.DirectionalLight(0xffffff, 2);
  mainLight.position.set(0, 10, 0);
  scene.add(mainLight);

  // 补光 - 增加车身细节
  const fillLight = new THREE.DirectionalLight(0xffffff, 1);
  fillLight.position.set(5, 5, -5);
  scene.add(fillLight);

  // 轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05;
  // 禁用缩放和平移
  controls.enableZoom = false;
  controls.enablePan = false;
  // 固定垂直角度，禁止垂直旋转
  controls.minPolarAngle = Math.PI / 2.2; // 固定仰角约60度
  controls.maxPolarAngle = Math.PI / 2.2; // 与 minPolarAngle 相同，锁定垂直角度
  // 设置目标点稍微抬高，使旋转中心更合理
  controls.target.set(0, 0.5, 0);
}

// 加载模型
const loadModel = () => {
  const gltfLoader = new GLTFLoader()
  gltfLoader.load("/src/assets/models/su7.glb", (gltf) => {
    carModel = gltf.scene
    console.log(carModel)
    carModel.traverse((child) => {
      // 优化材质
      if(child.material) {
        // 增强金属感
        child.material.metalness = 0.4;
        child.material.roughness = 0.1;
        // 调整反射
        child.material.envMapIntensity = 1.5;
        child.material.needsUpdate = true;
      }
    });
    carModel.scale.set(4, 4, 4)
    carModel.position.y = -1
    carModel.rotation.y = Math.PI * 1.5; // 旋转模型使其朝向正确方向
    scene.add(carModel)
  })
}

// 修改汽车模型外部颜色 
const setCarModelOutsideColor = (color)  => {
  const threeColor = new THREE.Color(color)
  carModel.traverse((child) => {
    if(child.name === 'OUTSIDE_6') {
      child.children[0].material.color = threeColor
    }
  })
}

// 动画循环（持续渲染）
const animate = () => {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}

onMounted(() => {
  containerWidth.value = threeContainer.value.clientWidth;
  containerHeight.value = threeContainer.value.clientHeight;
  initScene()
  loadModel()
  animate()
})

defineExpose({
  setCarModelOutsideColor
})
</script>

<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<style scoped>
.three-container {
  width: 100%;
  height: 400px;
  cursor: move;
}
</style>