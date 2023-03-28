import * as THREE from 'three';

export function cylinder(radius, textureBase, name, opacity){
    let geometry = new THREE.CylinderGeometry(radius, radius, 17, 32);
    let material = new THREE.MeshPhongMaterial({ map: textureBase, transparent: true, opacity: opacity});
    let cylinder = new THREE.Mesh(geometry, material);
    cylinder.name = name;
    return cylinder;
}

export function cubeTextures(size, textureArray){
    let geometry = new THREE.BoxGeometry( size.x, size.y, size.z );
    let cubeMaterialArray = [];
    for(let x of textureArray){
        console.log(x);
        cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: x, transparent: false,side: THREE.BackSide} ) );
    }
    let cube = new THREE.Mesh( geometry, cubeMaterialArray);
    return cube;

}
