/**
 * Nombre: myScene
 * Descripción:  TODO
 */
 import Entity from './entity';
 import Camera from './camera';
 import * as THREE from 'three';

let container = document.getElementById( 'threejs' );
let renderer;

export default class myScene extends Entity {
    constructor() {
        super();
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });

        container.appendChild( renderer.domElement );
    }

    update(){

    }

    renderer(){
        renderer.render(this.scene, this.camera.getCamera());
    }

}
