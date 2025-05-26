<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const threeContainer = ref(null)

// 容器尺寸
const containerWidth = ref(0)
const containerHeight = ref(0)

let scene, camera, renderer, controls;

// 初始化 Three.js 场景
const initScene = () => {
  // 创建场景
  scene = new THREE.Scene();

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    containerWidth.value / containerHeight.value,
    0.1,
    1000
  );
  camera.position.set(0, 10, 10); // 设置相机位置
  camera.lookAt(0, 0, 0); //坐标原点

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    // alpha: true
  });
  // 开启物理光照计算
  renderer.physicallyCorrectLights = true;
  // 设置色调映射
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setSize(containerWidth.value, containerHeight.value)
  threeContainer.value.appendChild(renderer.domElement);

  // 光照
  // 调整光照设置
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // 增加环境光强度
  scene.add(ambientLight);

  // 添加多个方向光，改善阴影效果
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(5, 5, 5);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight2.position.set(-5, 5, -5);
  scene.add(directionalLight2);

  // 轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
}

// 加载模型
const loadModel = () => {
  const gltfLoader = new GLTFLoader()
  gltfLoader.load("/src/assets/models/su7/source/SU7.glb", (gltf) => {
    console.log(gltf)
    const carModel = gltf.scene
    carModel.traverse((child) => {
      if(child.name === "OUTSIDE") {
        child.children[0].material.color.set(0x2db7cb)
        // child.children.forEach(item => item.material.color.set(0x2db7cb))
      }
      if(child.name === 'Wheel1001') {
        child.material.metalness = 0.5;     // 调整金属度
        child.material.roughness = 0.2;     // 调整粗糙度
        child.material.envMapIntensity = 1; // 调整环境反射强度
      }
      console.log(child)
    })

    carModel.rotation.y = Math.PI
    carModel.scale.set(2, 2, 2)
    scene.add(carModel)
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
</script>

<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<style scoped>
.three-container {
  width: 100%;
  height: 400px;
}
</style>