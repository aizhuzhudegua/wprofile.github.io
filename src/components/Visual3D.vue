<template>
    <div ref="sceneContainer" class="sceneContainer"></div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, computed } from 'vue';
import { useStore } from 'vuex';
// 1. 导入 Three.js 库
import * as THREE from 'three';
// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 导入 lil-gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import Type3D from '../utils/type'
import Time from '../utils/Time'

const store = useStore();
const isToggleAxes = computed({
    get: () => store.state.visual3D.isToggleAxes,
    set: (value) => {
        store.dispatch('visual3D/toggleAxesAction', value); // 调用 Vuex action 设置新值
    }
});
const isToggleGrid = computed({
    get: () => store.state.visual3D.isToggleGrid,
    set: (value) => {
        store.dispatch('visual3D/toggleGridAction', value); // 调用 Vuex action 设置新值
    }
});

const fps = computed({
    get: () => store.state.visual3D.fps,
    set: (value) => {
        store.dispatch('visual3D/setFpsVal', value); // 调用 Vuex action 设置新值
    }
});

const props = defineProps({
    width: {
        type: Number,
        default: window.innerWidth // 如果未传递，则使用默认值
    },
    height: {
        type: Number,
        default: window.innerHeight // 如果未传递，则使用默认值
    }
});

const res = ref([]);
const sceneContainer = ref(null);
const scene = new THREE.Scene();  // 创建场景
const renderer = new THREE.WebGLRenderer({ antialias: true }); // 创建一个 WebGL 渲染器

// 创建相机
const camera = new THREE.PerspectiveCamera(
    45, // 视野角度
    props.width / props.height, // 相机的宽高比
    1, // 近裁剪面
    1000 // 远裁剪面
);


camera.position.set(20, 20, 20); // 设置相机的位置
camera.lookAt(0, 0, 0); // 相机朝向场景中心
renderer.setSize(props.width, props.height);

// 创建白色天空盒
const skyBoxGeometry = new THREE.BoxGeometry(100, 100, 100); // 创建一个大的立方体
const skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.BackSide }); // 设置材质为白色（BackSide 为内部可见）
const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial); // 创建天空盒网格
scene.add(skyBox); // 将天空盒添加到场景中


const createDirectionLight = () => {
    let color = 0xffffff;
    // 创建平行光
    const directionalLight = new THREE.DirectionalLight(color, 1); // 颜色为白色，强度为1
    directionalLight.position.set(5, 10, 7); // 设置光源的位置
    directionalLight.castShadow = true; // 使光源投射阴影

    // 添加光源到场景中
    scene.add(directionalLight);

    // 创建太阳图标
    const sunTexture = new THREE.TextureLoader().load('/sun.png'); // 加载太阳图标的纹理
    const sunMaterial = new THREE.SpriteMaterial({ map: sunTexture }); // 使用加载的纹理创建材质
    const sunSprite = new THREE.Sprite(sunMaterial); // 创建精灵对象
    sunSprite.scale.set(2, 2, 1); // 调整精灵的大小
    sunSprite.position.set(5, 10, 7); // 设置太阳的位置，跟平行光的位置一致
    scene.add(sunSprite); // 将太阳图标添加到场景中

    
    const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
    scene.add( helper );

}
createDirectionLight();
// 可以设定阴影的相关参数



// 创建 PBR 材质
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff, // 基础颜色
    roughness: 0.5, // 粗糙度
    metalness: 0.5, // 金属度
    //map: new THREE.TextureLoader().load('path/to/diffuse-map.jpg'), // 漫反射贴图
    //metalnessMap: new THREE.TextureLoader().load('path/to/metalness-map.jpg'), // 镜面反射贴图
    //roughnessMap: new THREE.TextureLoader().load('path/to/roughness-map.jpg'), // 粗糙度贴图
    //normalMap: new THREE.TextureLoader().load('path/to/normal-map.jpg'), // 法线贴图
    //envMap: yourEnvironmentMap // 环境贴图（如果需要环境反射的话）
});


const addObj3d = (scene, type) => {
    let obj; // 创建立方体网格
    let helper;
    if (type == Type3D.CUBE) {
        // 创建立方体的几何体和材质
        const cubeGeometry = new THREE.BoxGeometry(2, 2, 2); // 创建一个 2x2x2 的立方体几何体
        obj = new THREE.Mesh(cubeGeometry, cubeMaterial);
        helper = new THREE.BoxHelper( obj, 0xffff00 );
    }
    else if (type == Type3D.SPHERE) {
        // 创建立方体的几何体和材质
        const cubeGeometry = new THREE.SphereGeometry(2); // 创建一个 2x2x2 的立方体几何体
        const cubeMaterial = new THREE.MeshNormalMaterial(); // 使用法线材质，自动为立方体的每一个面设定颜色
        
        obj = new THREE.Mesh(cubeGeometry, cubeMaterial);
    }
    // 调整物体材质以允许阴影
    obj.receiveShadow = true; // 物体接收阴影
    obj.castShadow = true; // 物体投射阴影
    scene.add(obj);
    obj.add(helper);
}

// 创建网格辅助对象
const gridHelper = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff); // 创建一个白色的 20x20 的网格
gridHelper.material.transparent = true; // 设置材质为透明
gridHelper.material.opacity = 0.5; // 设置透明度
if (isToggleGrid.value) {
    if (!scene.children.includes(gridHelper)) { // 如果场景中未包含 gridHelper，则添加
        scene.add(gridHelper); // 将网格添加到场景中
    }
}
// 创建坐标系辅助对象
const axesHelper = new THREE.AxesHelper(10); // 创建一个坐标轴，长度为 10
if (isToggleAxes.value) {
    if (!scene.children.includes(axesHelper)) { // 如果场景中未包含 axesHelper，则添加
        scene.add(axesHelper); // 将坐标轴添加到场景中
    }
}

const ToggleGirdHelper = () => {
    if (isToggleGrid.value) {
        if (!scene.children.includes(gridHelper)) { // 如果场景中未包含 gridHelper，则添加
            scene.add(gridHelper); // 将网格添加到场景中

        }
    } else {
        if (scene.children.includes(gridHelper)) { // 如果场景中已经包含 gridHelper，则移除
            scene.remove(gridHelper); // 移除场景中的网格
        }
    }
}
const ToggleAxesHelper = () => {
    if (isToggleAxes.value) {
        if (!scene.children.includes(axesHelper)) { // 如果场景中未包含 gridHelper，则添加
            scene.add(axesHelper); // 将网格添加到场景中

        }
    } else {
        if (scene.children.includes(axesHelper)) { // 如果场景中已经包含 gridHelper，则移除
            scene.remove(axesHelper); // 移除场景中的网格
        }
    }
}


// addCube();
// addHelper();

const save = () => {
    console.log("....")
    console.log(scene.toJSON());
    const jsonString = JSON.stringify(scene, null, 2); // 转为字符串格式，2 是缩进级别
    const blob = new Blob([jsonString], { type: 'application/json' });
    // 创建一个链接元素来下载文件
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // 创建 Blob URL
    link.download = 'scene.json'; // 设置下载的文件名称
    // 触发下载
    document.body.appendChild(link);  // 将链接添加到 DOM
    link.click(); // 模拟点击下载链接
    document.body.removeChild(link);  // 下载后移除链接
}

// 加载场景
const loadSceneFromJson = (jsonString) => {
    const loader = new THREE.ObjectLoader();
    const loadedScene = loader.parse(JSON.parse(jsonString)); // 从字符串加载场景
    // scene = null;
    scene.add(loadedScene); // 将加载的场景添加到当前场景中
};

const resize = (w, h) => {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

// public函数
defineExpose({ loadSceneFromJson, save, resize });


const time = new Time();
let acc = 0;
renderer.setAnimationLoop(() => {
    const deltaTime = performance.now() - (time.lastTime || performance.now());
    time.lastTime = performance.now(); // 更新最后时间
    // 更新计时器
    acc += deltaTime;
    time.update(deltaTime);

    if (acc >= 500) {
        fps.value = time.display();
        acc = 0;
    }

    // 确保只对 gridHelper 进行添加或移除
    ToggleGirdHelper();
    ToggleAxesHelper();
    renderer.render(scene, camera); // 使用渲染器渲染场景和相机

});

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement); // 创建轨道控制器，实现交互
// 设置带阻力惯性 
controls.enableDamping = true; // 启用惯性
// 设置阻力系数
controls.dampingFactor = 0.05; // 阻尼因子
// 设置旋转速度
controls.autoRotate = true; // 使视角自动旋转

const displayState = () => {
    sceneContainer.value.appendChild(stats.domElement);
    sceneContainer.value.removeChild(stats.domElement);
}

onMounted(() => {
    addObj3d(scene, Type3D.CUBE);
    console.log(scene);
    // 创建渲染器
    sceneContainer.value.appendChild(renderer.domElement); // 将渲染器的 DOM 元素添加到界面
    // // 创建 GUI 实例
    // const gui = new GUI();
    // const obj = { number1: 1, number2: 40 }

    // gui.add(obj, 'number1', 0, 1, 0.1); // min, max, step

});

</script>

<style>
/* 样式可以根据需要添加 */
.sceneContainer {
    position: relative;
}
</style>
