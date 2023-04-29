/**
 * Clase para tener las luces generales de la habitación
 */

import Entity from "./entity";

import * as THREE from "three";

export default class Light extends Entity {

    constructor(color, intensity) {
        super("light");
        this.object = new THREE.AmbientLight(color, intensity)
        this.setName("Light")
    }



    /**
     * Establecer configuración de las luces
     * @param {*} color 
     * @param {*} intensity 
     * @param {*} distance 
     */
    setConfLight(color, intensity) {
        this.object.color.setHex(color);
        this.object.intensity = intensity;
    }

    setTarget(obj, radius){
        this.object.target = obj.get3DObject();
        let angle = radius*2 + 10;
        this.object.angle = (Math.PI/180) * angle;
    }
}
