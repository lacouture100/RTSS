
let myMesh;
let light1, light2, light3, light4, light5, light6;
let sphereArray = [];


function createEnvironment(scene) {

  const intensity = 2.5;
  const distance = 100;
  const decay = 2.0;

  const c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;

  const sphere = new THREE.SphereGeometry( 0.25, 16, 8 );


  console.log("Adding environment");

  // Add lights

  light1 = new THREE.PointLight( c1, intensity, distance, decay );
  light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
  scene.add( light1 );

  light2 = new THREE.PointLight( c2, intensity, distance, decay );
  light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c2 } ) ) );
  scene.add( light2 );

  light3 = new THREE.PointLight( c3, intensity, distance, decay );
  light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c3 } ) ) );
  scene.add( light3 );

  light4 = new THREE.PointLight( c4, intensity, distance, decay );
  light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c4 } ) ) );
  scene.add( light4 );

  light5 = new THREE.PointLight( c5, intensity, distance, decay );
  light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c5 } ) ) );
  scene.add( light5 );

  light6 = new THREE.PointLight( c6, intensity, distance, decay );
  light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c6 } ) ) );
  scene.add( light6 );

   
  // add planets

  let texture = new THREE.TextureLoader().load("../assets/texture.png");
  let myGeometry = new THREE.SphereGeometry(3, 12, 12);
  let myMaterial = new THREE.MeshBasicMaterial({ map: texture });


  for ( let i = 0; i < 5000; i ++ ) {

    mesh = new THREE.Mesh(myGeometry, myMaterial);

    mesh.position.x = 400 * ( 0.5 - Math.random() );
    mesh.position.y = 50 * ( 0.5 - Math.random() ) + 25;
    mesh.position.z = 200 * ( 0.5 - Math.random() );

    mesh.rotation.y = 3.14 * ( 0.5 - Math.random() );
    mesh.rotation.x = 3.14 * ( 0.5 - Math.random() );

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    scene.add( mesh );
    sphereArray.push(mesh);

  }

  


  ///////////


  // Water
/*
  const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

  const water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load( '../assets/waternormals.jpg', function ( texture ) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      } ),
      alpha: 1.0,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    }
  );

  water.rotation.x = - Math.PI / 2;

  scene.add( water );
*/


  console.log("Added environment");

}


function updateEnvironment(scene) {

  moveLights(50);


}

function addLights(scene){
  
  light1 = new THREE.PointLight( c1, intensity, distance, decay );
  light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
  scene.add( light1 );

  light2 = new THREE.PointLight( c2, intensity, distance, decay );
  light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c2 } ) ) );
  scene.add( light2 );

  light3 = new THREE.PointLight( c3, intensity, distance, decay );
  light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c3 } ) ) );
  scene.add( light3 );

  light4 = new THREE.PointLight( c4, intensity, distance, decay );
  light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c4 } ) ) );
  scene.add( light4 );

  light5 = new THREE.PointLight( c5, intensity, distance, decay );
  light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c5 } ) ) );
  scene.add( light5 );

  light6 = new THREE.PointLight( c6, intensity, distance, decay );
  light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c6 } ) ) );
  scene.add( light6 );

   
  const dlight = new THREE.DirectionalLight( 0xffffff, 0.05 );
  dlight.position.set( 0.5, 1, 0 ).normalize();
  scene.add( dlight );

}


function moveLights(distanceFromCenter){
  const time = Date.now() * 0.0025;
				const d = distanceFromCenter;

				light1.position.x = Math.sin( time * 0.1 ) * d;
        light1.position.y = 5;
				light1.position.z = Math.cos( time * 0.1 ) * d;

				light2.position.x = Math.cos( time * 0.1 ) * d;
        light2.position.y = 5;
				light2.position.z = Math.sin( time * 0.1 ) * d;

				light3.position.x = Math.sin( time * 0.1 ) * d;
        light3.position.y = 5;
				light3.position.z = Math.sin( time * 0.1 ) * d;

				light4.position.x = Math.sin( time * 0.3 ) * d;
        light4.position.y = 5;
				light4.position.z = Math.sin( time * 0.5 ) * d;

				light5.position.x = Math.cos( time * 0.3 ) * d;
        light5.position.y = 5;
				light5.position.z = Math.sin( time * 0.5 ) * d;

				light6.position.x = Math.cos( time * 0.7 ) * d;
        light6.position.y = 5;
				light6.position.z = Math.cos( time * 0.5 ) * d;
}