/**
 * Clase para tener las luces generales de la habitación
 */

import Entity from "./entity";

import * as THREE from "three";

export default class Light extends Entity{

    constructor( color, intensity, distance ){
        super();
        this.light = new THREE.Group();
        this.light.name = "Lights";
        for(let i = 0; i< 4; i++){
            this.light.add(new THREE.PointLight( color, intensity, distance ));
        }
        this.setPosition(0, 50*0.9, 0);
    }

    setPosition(x,y,z){
        let distance = 75;
        this.light.children[0].position.set( x+distance, y, z+distance);
        this.light.children[1].position.set( x+distance, y, z-distance);
        this.light.children[2].position.set( x-distance, y, z+distance);
        this.light.children[3].position.set( x-distance, y, z-distance);
        
    }

    setConfLight(color, intensity, distance ){
        this.light.forEach((light)=>{
            light.color.setHex( color);
            light.intensity = intensity;
            light.distance = distance;
            light.castShadow = false; // default false
        })
    }

    get3DObject(){
        return this.light;
    }
}
