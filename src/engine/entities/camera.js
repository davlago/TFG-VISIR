/**
 * Nombre: Camera
 * Descripción: TODO
 */
import Entity from "./entity";
import * as THREE from 'three';

export default class Camera extends Entity {
    constructor(sizeWidth, sizeHeight) {
        super("camera");
        this.object = new THREE.PerspectiveCamera(100, sizeWidth / sizeHeight, 1, 1000);
        this.target = null;
        this.setName("Camera");
    }

    focusObj(pos) {
        console.log(pos);
        this.target = pos;
    }

    stopCamera() {
        this.target = null;
    }

    update(deltaTime) {
        if (this.target !== null) {
            this.object.position.lerp(this.target, deltaTime*1.5);
            if (Math.trunc(this.target.x) === Math.trunc(this.object.position.x) && Math.trunc(this.target.z) === Math.trunc(this.object.position.z)) this.stopCamera();
        }
    }
}
