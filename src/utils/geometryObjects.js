import * as THREE from 'three';

export function cylinderTexture(radius, textureBase, name, opacity, height) {
    let geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    let material;
    if (textureBase === null) {
        material = new THREE.MeshPhongMaterial({ transparent: true, opacity: opacity });
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