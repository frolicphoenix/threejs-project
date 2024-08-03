// console.log("javascript is working");
// alert("well hello there")
import './styles.css';
import * as THREE from 'three';
import gsap from 'gsap';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// console.log(THREE);

//Scene
const scene = new THREE.Scene();

//Object
    
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0xff0000});

const mesh = new THREE.Mesh(geometry,material);
mesh.position.set(0, 0, 1);
mesh.scale.set(1,1,1);
mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0)

// const group = new THREE.Group();
// group.scale.y = 2;
// group.rotation.y = 1;
// scene.add(group);

// const redcube = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color:0xff0000})
// )
// redcube.position.x = 2;
// group.add(redcube);

// const bluecube = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color:0x3D85C6})
// )
// bluecube.position.x = -1;
// group.add(bluecube);

// const yellowcube = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color:0xF1C232})
// )
// yellowcube.position.x = 0;
// group.add(yellowcube);
    
// console.log(mesh.position.length());
scene.add(mesh);

//Aspect Ratio
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);
camera.position.z = 3;

scene.add(camera);

// console.log(mesh.position.normalize());

//Adding a cursor
const cursor = {
    x: 0,
    y:0
};

window.addEventListener('mousemove', (event) => {

    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);

    console.log(cursor.x, cursor.y);
});


//Canvas
const canvas = document.querySelector('canvas.webgl');

// //Axes helper
// const axesHelper = new THREE.AxesHelper(1);
// scene.add(axesHelper);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 2;


//Renderer
const Renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
Renderer.setSize(sizes.width, sizes.height);

// console.log(scene);
// console.log(camera);

//Animation
// let time = Date.now();

// const clock = new THREE.Clock();

// gsap.to(mesh.position, { duration: 1, delay: 1, x:2 });

const tick = () => {
    // console.log('tick');

    //Adaption to the framerate
    // const currentTime = Date.now();
    // const deltaTime = currentTime - time;
    // time = currentTime;
    
    // const elapsedTime = clock.getElapsedTime();

    // //updating objects to animate
    // mesh.position.x = Math.cos(elapsedTime);
    // mesh.rotation.y = Math.sin(elapsedTime);

    // camera.position.x = Math.sin(elapsedTime);
    // camera.rotation.y = Math.sin(elapsedTime);
    
    
    camera.rotation.x = cursor.x;
    camera.rotation.y = cursor.y;
    camera.lookAt(mesh.position);

    //update controls
    controls.update();
    
    //Render
    Renderer.render(scene, camera);

    //Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
