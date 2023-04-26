/**
 * Nombre: Camera
 * Descripción: TODO
 */
import Entity from "./entity";
import * as THREE from 'three';

export default class Camera extends Entity {
    constructor(sizeWidth, sizeHeight) {
        super();
        this.object = new THREE.PerspectiveCamera(100, sizeWidth / sizeHeight, 1, 1000);
        this.target = null;
    }

    focusObj(pos) {
        console.log(pos);
        this.target = pos;
    }

    stopCamera() {
        this.target = null;
    }

    update(deltaTime) {
        console.log(this.position)
        if (this.target !== null) {
            this.object.position.lerp(this.target, deltaTime);
            if (Math.trunc(this.target.x) === Math.trunc(this.object.position.x) && Math.trunc(this.target.z) === Math.trunc(this.object.position.z)) this.stopCamera();
        }
    }
}
