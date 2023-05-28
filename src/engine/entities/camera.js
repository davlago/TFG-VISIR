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

/**
 * Establece la posición de enfoque de la cámara.
 * @param {THREE.Vector3} pos - La posición en la que se desea enfocar la cámara.
 */
    focusObj(pos) {
        this.target = pos;
    }

    
    /**
     * Elimina el target de la camara
     */
    stopCamera() {
        this.target = null;
    }

/**
 * Actualiza la posición de la cámara en función de la posición objetivo.
 * @param {number} deltaTime - El tiempo transcurrido desde la última actualización.
 */
    update(deltaTime) {
        if (this.target !== null) {
            this.object.position.lerp(this.target, deltaTime*1.5);
            if (Math.trunc(this.target.x) === Math.trunc(this.object.position.x) && Math.trunc(this.target.z) === Math.trunc(this.object.position.z)) this.stopCamera();
        }
    }
}
