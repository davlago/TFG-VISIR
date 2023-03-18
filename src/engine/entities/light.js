/**
 * Clase para tener las luces generales de la habitación
 */

import Entity from "./entity";

import * as THREE from "three";

export default class Light extends Entity{

    constructor( color, intensity, distance ){
        super();
        this.object = new THREE.PointLight( color, intensity, distance );
        this.object.name = "Light";
    }



    /**
     * Establecer configuración de las luces
     * @param {*} color 
     * @param {*} intensity 
     * @param {*} distance 
     */
    setConfLight(color, intensity, distance ){
        this.light.forEach((light)=>{
            light.color.setHex( color);
            light.intensity = intensity;
            light.distance = distance;
            light.castShadow = false; // default false
        })
    }
}
