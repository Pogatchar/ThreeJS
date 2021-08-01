import * as THREE from "/build/three.module.js";
import { OrbitControls } from "/jsm/controls/OrbitControls.js";
import Stats from "/jsm/libs/stats.module.js";

// global variables
let scene;
let camera;
let renderer;
const canvas = document.querySelector(".webgl");
 




// scene setup
scene = new THREE.Scene();

// camera setup
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;
scene.add(camera);

// renderer setup
renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

// orbit control setup
const controls = new OrbitControls(camera, renderer.domElement);

// earth geometry
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);

// earth material
const earthMaterial = new THREE.MeshPhongMaterial({
  roughness: 1,
  metalness: 0,
  map: THREE.ImageUtils.loadTexture("texture/earthmap1k.jpg"),
  bumpMap: THREE.ImageUtils.loadTexture("texture/earthbump.jpg"),
  bumpScale: 0.3,
  
});

// earth mesh
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);
 

// // cloud Geometry
// const cloudGeometry = new THREE.SphereGeometry(1.46, 30, 30);

// // cloud metarial
// const cloudMetarial = new THREE.MeshPhongMaterial({
//   map: THREE.ImageUtils.loadTexture("texture/earthCloud.png"),
//   transparent: true,
// });

// // cloud mesh
// const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMetarial);
// scene.add(cloudMesh);




// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture("texture/galaxy.png"),
  side: THREE.BackSide,
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

// ambient light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientlight);

// point light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

// point light helper
const Helper = new THREE.PointLightHelper(pointLight);
scene.add(Helper);





// paris geometry
const moon1Geometry = new THREE.SphereGeometry(0.025, 32, 50);
const moon1Material = new THREE.MeshPhongMaterial({color:0xff0000});
const moon1Mesh = new THREE.Mesh(moon1Geometry, moon1Material);


// bangi geometry
const moon2Geometry = new THREE.SphereGeometry(0.025, 32, 50);
const moon2Material = new THREE.MeshPhongMaterial({color:0xffff00});
const moon2Mesh = new THREE.Mesh(moon2Geometry, moon2Material);
 


// sud geometry
const moon3Geometry = new THREE.SphereGeometry(0.025, 32, 50);
const moon3Material = new THREE.MeshPhongMaterial({color:0x0000ff});
const moon3Mesh = new THREE.Mesh(moon3Geometry, moon3Material);
 
 
// sayada geometry
const moon4Geometry = new THREE.SphereGeometry(0.025, 32, 50);
const moon4Material = new THREE.MeshPhongMaterial({color:0x008000});
const moon4Mesh = new THREE.Mesh(moon4Geometry, moon4Material);
 



// convertissuer de repère 
function colcposFormLatLonRad (latt, lon) {

  var phi =   (latt)*(Math.PI/180);
  var theta = (lon+180)*(Math.PI/180);

  let x = -(Math.cos(phi)*Math.cos(theta));
  let z = (Math.cos(phi)*Math.sin(theta));
  let y = (Math.sin(phi));

  return{x,y,z};
  }



 // points coordinations  

let point1 = {
    lat: 48.8566,
    lng: 2.3514
}
let point2 = {
  lat: 35.6681,
  lng: 10.8926
}
let point3 = {
  lat: 4.3907153,
  lng: 18.5509126
}
let point4 = {
  lat: 35.6828,
  lng: 139.7594
}



// point liste 
let Pline = [
  point1,
  point2,
  point3,
  point4,
]




 



// init pos point 
let pos1 = colcposFormLatLonRad(point1.lat, point1.lng);
let pos2 = colcposFormLatLonRad(point2.lat, point2.lng);
let pos3 = colcposFormLatLonRad(point3.lat, point3.lng);
let pos4 = colcposFormLatLonRad(point4.lat, point4.lng);




// for (var i = 0; i< Pline.length-1; i++) {
//   let pos1 = colcposFormLatLonRad(Pline[i].lat, Pline[i].lng);
//   let pos2 = colcposFormLatLonRad(Pline[i+1].lat, Pline[i+1].lng);
//   let mesh = new THREE.mesh(
//     new THREE.SphereGeometry(0.025, 32, 50),
//     new THREE.MeshBasicMaterial({color:0xff0000})
//   )
//   mesh.position.set(pos1.x,pos1.y,pos1.z)
//   pivotPoint.add(mesh);
// }




moon1Mesh.position.set(pos1.x,pos1.y,pos1.z);
moon2Mesh.position.set(pos2.x,pos2.y,pos2.z);
moon3Mesh.position.set(pos3.x,pos3.y,pos3.z);
moon4Mesh.position.set(pos4.x,pos4.y,pos4.z);



// inti curve entre deux point 




// pivot
const pivotPoint = new THREE.Object3D();
pivotPoint.add(moon1Mesh);
pivotPoint.add(moon2Mesh);
pivotPoint.add(moon3Mesh);
pivotPoint.add(moon4Mesh);
scene.add(pivotPoint);

getline(pos1,pos2); 










function getline(p1,p2) {  


  let v1 = new THREE.Vector3(p1.x,p1.y,p1.z);
  let v2 = new THREE.Vector3(p2.x,p2.y,p2.z);
  let points = [] ;

  for ( let  i=0 ; i <20 ; i++  ) { 
    let p = new THREE.Vector3().lerpVectors(v1,v2,i/20)
    p.normalize();
    p.multiplyScalar (1 + 0.02*Math.sin(Math.PI*i/20)) ;
    points.push(p);
  }


  let path = new THREE.CatmullRomCurve3(points)
  const geometry = new THREE.TubeGeometry( path, 20, 0.005, 8, false );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const mesh = new THREE.Mesh( geometry, material );
  pivotPoint.add( mesh );




}
  








// handling resizing
 
window.addEventListener(
  "resize",
  () => {
   
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

);
  
 

const animate = () => {
  requestAnimationFrame(animate);
  //  starMesh.rotation.y -= 0.0004;
  earthMesh.rotation.y -= 0.0039;
  // //  cloudMesh.rotation.y -= 0.0008;
  
  pivotPoint.rotation.y -= 0.0039;
 

  controls.update();
  render();
 
};

// rendering
const render = () => {
  renderer.render(scene, camera);
    
};

 

 
 

animate();


// camera.position.x = -30;
// camera.position.y = 30;
// camera.position.z = 80;
//	camera.rotation.x = - Math.PI / 8;
//	camera.rotation.y = - Math.PI / 8;
//	camera.rotation.z = - Math.PI / 24;

