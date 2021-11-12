<template>
   <div class="boxs">
        <div class="maskLoading" v-if="isLoading">
            <div class="loading">
                <div :style="{width : loadingWidth +'%' }"></div>
            </div>
            <div style="padding-left: 10px;">{{loadingWidth}}%</div>
        </div>
        <div class="mask">
            <p>x : {{x}} y:{{y}} z :{{z}}</p>
            <button @click="isAutoFun">转动车</button>
            <button @click="stop">停止</button>
            <div class="flex">
                <div @click="setCarColor(index)" v-for="(item,index) in colorAry"
                     :style="{backgroundColor : item}" :key="index"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref, reactive,toRefs } from 'vue'
    import * as THREE from 'three'
    import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
      //车身颜色数组
    const colorAry = [
        "rgb(216, 27, 67)", "rgb(142, 36, 170)", "rgb(81, 45, 168)", "rgb(48, 63, 159)", "rgb(30, 136, 229)", "rgb(0, 137, 123)",
        "rgb(67, 160, 71)", "rgb(251, 192, 45)", "rgb(245, 124, 0)", "rgb(230, 74, 25)", "rgb(233, 30, 78)", "rgb(156, 39, 176)",
        "rgb(0, 0, 0)"
    ] // 车身颜色数组 
    let isLoading = ref(true)
    let loadingWidth = ref(0)
    const loader = new GLTFLoader()
    
    let scene: any
    let renderer: any
    let camera: any
    let directionalLight: any
    let hemisphereLight: any
    let dhelper: any
    let hHelper: any
    let controls: any
     //相机的默认坐标
    const defaultMap = {
        x: 300,
        y: 8,
        z: 0,
    }
    const map = reactive(defaultMap)//把相机坐标设置成可观察对象
    const {x, y, z} = toRefs(map)//输出坐标给模板使用
    //创建场景
    const setScene = ()=>{
        scene = new THREE.Scene()
        renderer = new THREE.WebGLRenderer()
        renderer.setSize(1500, 800)
        document.querySelector('.boxs')?.appendChild(renderer.domElement)
    }

    //创建相机  
    const setCamera = () => {
        const {x, y, z} = defaultMap
        camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000)
        camera.position.set(x, y, z)
    }

        // 设置模型控制
    const setControls = () => {
        controls = new OrbitControls(camera, renderer.domElement)
        controls.maxPolarAngle = 0.9 * Math.PI / 2
        controls.enableZoom = true
        controls.autoRotate = true
        controls.addEventListener('change', render)
    }

     //返回坐标信息
     const render = () => {
        map.x = Number.parseInt(camera.position.x)
        map.y = Number.parseInt(camera.position.y)
        map.z = Number.parseInt(camera.position.z)
    }


     // 设置灯光
     const setLight = () => {
        directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
        directionalLight.position.set(-4, 8, 4)
        dhelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000)
        hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4)
        hemisphereLight.position.set(0, 8, 0)
        hHelper = new THREE.HemisphereLightHelper(hemisphereLight, 5)
        scene.add(directionalLight)
        scene.add(hemisphereLight)
    }
    
        //是否自动转动
    const isAutoFun = () => {
        controls.autoRotate = true
    }
    //停止转动
    const stop = () => {
        controls.autoRotate = false
    }

    //设置车身颜色
    const setCarColor = (index) => {
        const currentColor = new THREE.Color(colorAry[index])
        scene.traverse(child => {
            if (child.isMesh) {
                console.log(child.name)
                if (child.name.includes('door_')) {
                    child.material.color.set(currentColor)
                }
            }
        })
    }

    //初始化所有函数 
    const init = async() => {
        const gltf: GLTF = await loadFile('/assets/tesla_2018_model_3/scene.gltf')
        setScene()
        setCamera()
        setLight()
        setControls()
        scene.add(gltf.scene)
        loop()
    }
    //通过Promise处理一下loadfile函数
    const loadFile = (url): Promise<GLTF> => {
        return new Promise(((resolve, reject) => {
            loader.load(url,
                (gltf: GLTF) => {
                    resolve(gltf)
                }, ({loaded, total}) => {
                    let load = Math.abs(loaded / total * 100)
                    loadingWidth.value = load
                    if (load >= 100) {
                        setTimeout(() => {
                            isLoading.value = false
                        }, 1000)
                    }
                    console.log((loaded / total * 100) + '% loaded')
                },
                (err) => {
                    reject(err)
                }
            )
        }))
    }

    //使场景、照相机、模型不停调用
     const loop = () => {
        requestAnimationFrame(loop)
        renderer.render(scene, camera)
    }
    //用vue钩子函数调用
    onMounted(init)
</script>

<style>
    .maskLoading {
        background: #000;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1111111;
        color: #fff;
    }

    .maskLoading .loading {
        width: 400px;
        height: 20px;
        border: 1px solid #fff;
        background: #000;
        overflow: hidden;
        border-radius: 10px;

    }

    .maskLoading .loading div {
        background: #fff;
        height: 20px;
        width: 0;
        transition-duration: 500ms;
        transition-timing-function: ease-in;
    }

    canvas {
        width: 100%;
        height: 100%;
        margin: auto;
    }

    .mask {
        color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .flex {
        display: flex;
        flex-wrap: wrap;
        padding: 20px;

    }

    .flex div {
        width: 10px;
        height: 10px;
        margin: 5px;
        cursor: pointer;
    }
</style>