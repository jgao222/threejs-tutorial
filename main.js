import "./style.css";

import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const geometry = new THREE.BoxGeometry(5, 5, 5);

const myFace = new THREE.TextureLoader().load("img/2038150.jpg");
const back = new THREE.TextureLoader().load("img/frootyboispfp_background.png");
scene.background = myFace;
const material = new THREE.MeshStandardMaterial({map: myFace});
const box = new THREE.Mesh(geometry, material);

scene.add(box);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15, 0, 15)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);

// scene.add(pointLight);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(2000, 100);
scene.add(lightHelper, gridHelper);


const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
  requestAnimationFrame(animate);

  box.rotation.x += 1;
  box.rotation.y += 0.1;
  box.rotation.z += 0.1;

  controls.update();

  renderer.render(scene, camera);
}

function makeMe() {
  const geometry = new THREE.BoxGeometry(5, 5, 5);
  const material = new THREE.MeshStandardMaterial({map: myFace});
  const me = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(250));
  me.position.set(x, y, z);
  scene.add(me);
}

Array(200).fill().forEach(makeMe);

animate();