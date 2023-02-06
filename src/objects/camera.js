/**
 * Nombre: Camera
 * Descripción: TODO
 */
import Entity from "./entity";
import * as THREE from 'three';

export default class Camera extends Entity {
    constructor(sizeWidth, sizeHeight) {
        super();
        this.camera = new THREE.PerspectiveCamera(100, sizeWidth / sizeHeight, 1, 1000)
        this.setPosition(0,100,150);
        this.camera.rotateX(-0.5)
    }

    setPosition(x,y,z){
        this.camera.position.set(x,y,z);
    }

    get3DObject() {
        return this.camera;
    }

}