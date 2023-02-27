/**
 * Nombre: Camera
 * Descripción: TODO
 */
import Entity from "./entity";
import * as THREE from 'three';
import { Vector3 } from "three/build/three.module";

export default class Camera extends Entity {
    constructor(sizeWidth, sizeHeight) {
        super();
        this.object = new THREE.PerspectiveCamera(100, sizeWidth / sizeHeight, 1, 1000)
    }

    lookAt(pos){
        let newVector = new Vector3(pos.x, pos.y, pos.y);
        this.object.lookAt(newVector);
    }
}