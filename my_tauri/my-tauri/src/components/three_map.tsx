import React, { useState } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const width = window.innerWidth,
  height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 10, 30);

const scene = new THREE.Scene();

// 环境光
// var ambientLight = new THREE.AmbientLight(0x404040); // 软光
// scene.add(ambientLight);
// 平行光
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

const line_material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
const line_geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(line_geometry, line_material);
scene.add(line);

const text_loader = new FontLoader();
text_loader.load('fonts/hel.json', (loaded_font) => {
  const text_material = new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 0.5 });
  const text_geometry = new TextGeometry('hello three', {
    font: loaded_font,
    size: 20,
    height: 5,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1,
  });
  const text_mesh = new THREE.Mesh(text_geometry, text_material);
  const text_center = new THREE.Vector3(0, 10, 0);
  text_mesh.position.copy(text_center);
  text_mesh.rotation.setFromVector3(new THREE.Vector3(Math.PI / 12, 0, 0));
  console.log("add text mesh")
  scene.add(text_mesh);
})

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const gltf_loader = new GLTFLoader();

gltf_loader.load( 'models/palworld_pink_cat.glb', function ( gltf ) {
  gltf.scene.position.set(-50, -10, 0);
  scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animation);
renderer.domElement.style.cursor = 'pointer';
document.body.appendChild(renderer.domElement);

// animation

function animation(time: number) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}

var mouseDown = false;
var lastMouseX = 0;
var lastMouseY = 0;

function onMouseDown(event: any) {
  // 鼠标被按下
  mouseDown = true;
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
}

function onMouseMove(event: any) {
  // 如果鼠标没有被按下，则不执行任何操作
  if (!mouseDown) {
    return;
  }
  // 计算鼠标移动的距离
  var deltaX = event.clientX - lastMouseX;
  var deltaY = event.clientY - lastMouseY;

  // 根据鼠标移动的距离来更新相机的位置
  // 这里的更新逻辑根据实际情况调整
  camera.position.x -= deltaX * 0.8 * camera.position.z / 1000;
  camera.position.y += deltaY * 0.8 * camera.position.z / 1000;

  // 更新上一次鼠标的位置
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
}

function onMouseUp(event: any) {
  // 鼠标释放
  mouseDown = false;
}

function onWheel(event: any) {
  event.preventDefault();

  // 计算缩放系数，这里的0.1是缩放速度，可以根据需要调整
  var zoomFactor = 1.0 + (event.deltaY > 0 ? 0.1 : -0.1);

  // 更新相机位置
  camera.position.multiply(new THREE.Vector3(1, 1, zoomFactor));

  // 可选：为了保持目标位置在视野中心，你可能需要调整相机的lookAt
  // camera.lookAt(scene.position); // 假设你的目标是场景的中心
}

// 添加事件监听器
renderer.domElement.addEventListener('wheel', onWheel, false);
renderer.domElement.addEventListener('mousedown', onMouseDown, false);
renderer.domElement.addEventListener('mousemove', onMouseMove, false);
renderer.domElement.addEventListener('mouseup', onMouseUp, false);

type ThreeMapProps = {
  // children: React.ReactNode;
};

const ThreeMap: React.FC<ThreeMapProps> = ({}) => {
  return <div>Hello, ThreeMap!</div>;
};

export { ThreeMap };
