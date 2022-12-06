/**
 * Nombre: Camera
 * Descripción: TODO
 */

import Entity from "./entity";
import * as THREE from 'three';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

export default class Camera extends Entity {
    constructor() {
        super();
        this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        this.camera.position.x = 0
        this.camera.position.y = 0
        this.camera.position.z = 2
    }

    getCamera(){
        return this.camera;
    }

}