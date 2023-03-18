/**
 * Clase para tener las luces generales de la habitación
 */


import * as THREE from "three";

export default class Scene {
    constructor(  ){
        this.scene = new THREE.Scene();
    }

    add(obj){
        this.scene.add(obj);
    }

    get3DObject(){
        return this.scene;
    }

}
