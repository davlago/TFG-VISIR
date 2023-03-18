import * as THREE from 'three';

export function cylinder(radius, textureBase, name, opacity){
    let geometry = new THREE.CylinderGeometry(radius, radius, 17, 32);
    let material = new THREE.MeshPhongMaterial({ map: textureBase, transparent: true, opacity: opacity});
    let circle = new THREE.Mesh(geometry, material);
    circle.name = name;
    return circle;
}


