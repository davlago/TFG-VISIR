import * as THREE from 'three';

export function cylinderTexture(radius, textureBase, name, opacity, height) {
    let geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    let material;
    if (textureBase === null) {
        material = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0.75 });
    }
    else material = new THREE.MeshPhongMaterial({ map: textureBase, transparent: true, opacity: opacity });
    let cylinder = new THREE.Mesh(geometry, material);
    cylinder.name = name;
    return cylinder;
}

export function cubeTextures(size, textureArray) {
    let geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    let cubeMaterialArray = [];
    for (let x of textureArray) {
        console.log(x);
        cubeMaterialArray.push(new THREE.MeshStandardMaterial({ map: x, transparent: false, side: THREE.BackSide }));
    }
    let cube = new THREE.Mesh(geometry, cubeMaterialArray);
    return cube;

}

export function circle(radius) {
    const geometry = new THREE.CircleGeometry(radius, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const circle = new THREE.Mesh(geometry, material);
    return circle;
}

export function cylinder(radius, height) {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    let cylinder = new THREE.Mesh(geometry, material);
    return cylinder;
}

export function flag(texture) {
    // BANDERA NORMAL
    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 50, 32);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.y=190;
    
    let material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    let geometry = new THREE.PlaneGeometry(45, 30);
    let flag = new THREE.Mesh(geometry, material);


    //BILLBOARD
    // const material = new THREE.SpriteMaterial( { map: texture } );
    // const flag = new THREE.Sprite( material );
    // flag.scale.set( 60, 40, 0);


    flag.position.y = 200;
    flag.position.x = 22.5;
    const flagComplete = new THREE.Group();
    flagComplete.add(cylinder);
    flagComplete.add(flag);

    return flagComplete;
}