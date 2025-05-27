<!-- 更自由 有阴影 等 -->
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
    alpha: true
  });
  // 启用物理光照计算
  renderer.physicallyCorrectLights = true;
  // 设置色调映射以增强明暗对比
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5; // 调整曝光度
  // 启用阴影
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(containerWidth.value, containerHeight.value)
  threeContainer.value.appendChild(renderer.domElement);

  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  // 2. 主光源 - 模拟太阳光
  const mainLight = new THREE.DirectionalLight(0xffffff, 2);
  mainLight.position.set(0, 10, 0);
  mainLight.castShadow = true;
  // 调整阴影相机参数
  mainLight.shadow.camera.left = -10;
  mainLight.shadow.camera.right = 10;
  mainLight.shadow.camera.top = 10;
  mainLight.shadow.camera.bottom = -10;
  mainLight.shadow.camera.near = 0.1;
  mainLight.shadow.camera.far = 40;
  // 提高阴影质量
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.radius = 3;
  scene.add(mainLight);

  // 3. 补光 - 增加车身细节
  const fillLight = new THREE.DirectionalLight(0xffffff, 1);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);

  // 4. 底部柔光 - 增加车底细节
  const bottomLight = new THREE.DirectionalLight(0xffffff, 0.3);
  bottomLight.position.set(0, -5, 0);
  scene.add(bottomLight);

  // scene.add(directionalLight);
  // // 添加方向光辅助器
  // const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
  // scene.add( helper );


  // 创建地面
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0
    })
  )
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -0.5;
  ground.receiveShadow = true; // 使地面接收阴影
  scene.add(ground);


  // 轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05;
  // 设置视角限制
  controls.minDistance = 5;  // 最小缩放距离
  controls.maxDistance = 20; // 最大缩放距离
  // 垂直旋转角度限制
  controls.minPolarAngle = Math.PI / 4;  // 最小仰角 (45度)
  controls.maxPolarAngle = Math.PI / 2;  // 最大仰角 (90度)

// 禁用平移
controls.enablePan = false;

// 设置目标点稍微抬高，使旋转中心更合理
controls.target.set(0, 1, 0);
}

// 加载模型
const loadModel = () => {
  const gltfLoader = new GLTFLoader()
  gltfLoader.load("/src/assets/models/su7.glb", (gltf) => {
    const carModel = gltf.scene
    console.log(carModel)
    // carModel.traverse((child) => {
    //   console.log(child)
    //   if(child.name === 'OUTSIDE_6') {
    //     child.children[0].material.color.set(0xe02020)
    //   }
    // })
    // carModel.rotation.y = Math.PI
    carModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        // child.receiveShadow = true;
      }
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
    carModel.scale.set(3, 3, 3)
    // carModel.position.set(0, 0, 0); // 设置模型位置
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