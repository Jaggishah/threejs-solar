import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import starsTexture from '/dist/stars.jpg';
import sunTexture from '/dist/sun.jpg';
import mercuryTexture from '/dist/mercury.jpg';
import venusTexture from '/dist/venus.jpg';
import earthTexture from '/dist/earth.jpg';
import marsTexture from '/dist/mars.jpg';
import jupiterTexture from '/dist/jupiter.jpg';
import neptuneTexture from '/dist/neptune.jpg';
import plutoTexture from '/dist/pluto.jpg';
import saturnTexture from '/dist/saturn.jpg';
import saturnRingTexture from '/dist/saturn ring.png';
import uranusTexture from '/dist/uranus.jpg';
import uranusRingTexture from '/dist/uranus ring.png';

const renderer = new THREE.WebGLRenderer({ antialias : true});

const w = window.innerWidth;
const h = window.innerHeight;
const container = document.body;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(w,h);

container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
])


// const boxMesh = new THREE.Mesh(
//   new THREE.BoxGeometry(),
//   new THREE.MeshBasicMaterial()
// )
// scene.add(boxMesh);
const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
})
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun)


const fov = 75;
const aspect = w/h;


const camera = new THREE.PerspectiveCamera(fov, aspect,0.1,1000);
camera.position.z = 140;
camera.position.y = 140
camera.position.x = -90

const controls = new OrbitControls(camera,renderer.domElement);
controls.update();
controls.enableDamping = true;
controls.dampingFactor = 0.2;


const ambientLight = new THREE.AmbientLight(0xFFFFF);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 500, 30000)
pointLight.position.x = 20
scene.add(pointLight);
// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
// scene.add( pointLightHelper );

function createPlanet(size,texture, position ,ring){
  const geo = new THREE.SphereGeometry(size,30,30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture)
  })
  const mesh = new THREE.Mesh(geo,mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if(ring){
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.x = position
    ringMesh.rotateX( Math.PI * - 0.5)
    obj.add(ringMesh);


  }
  scene.add(obj);
  mesh.position.x = position
  return{ mesh, obj }
}

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.0,venusTexture,44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
});
const uranus = createPlanet(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture
});
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);

function animate(){
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  mars.mesh.rotateY(0.018);
  jupiter.mesh.rotateY(0.04);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  

  mercury.obj.rotateY(0.04);
  venus.obj.rotateY(0.02);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.008);
  jupiter.obj.rotateY(0.002);
  neptune.obj.rotateY(0.0001);
  saturn.obj.rotateY(0.0009);
  pluto.obj.rotateY(0.00007);
  uranus.obj.rotateY(0.0004);
  renderer.render(scene,camera)

}

renderer.setAnimationLoop( animate);



