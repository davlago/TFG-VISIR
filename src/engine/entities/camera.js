/**
 * Nombre: Camera
 * Descripción: TODO
 */
import Entity from "./entity";
import * as THREE from 'three';

export default class Camera extends Entity {
    constructor(sizeWidth, sizeHeight) {
        super();
        this.object = new THREE.PerspectiveCamera(100, sizeWidth / sizeHeight, 1, 1000)
    }
}