/**
 * Nombre: myScene
 * Descripción:  TODO
 */
 import Entity from './entity';
 import Camera from './camera';
 import * as THREE from 'three';

let container = document.getElementById( 'threejs' );
let scene;
let renderer;

export default class myScene extends Entity {
    constructor() {
        super();
        this.camera = new Camera();
        scene = new THREE.Scene();
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
