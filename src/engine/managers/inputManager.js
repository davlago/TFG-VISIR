/**
 * Clase para controllar la camara y la escena
 */

import * as THREE from 'three';

export default class InputManager {

    constructor(camera, renderer) {
        this.setSelected;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.entities = {};
        this.renderer = renderer;
        this.entitiesObjArray = [];
        this.observers = [];
        this.camera = camera;
        this.handleClick = this.handleClick.bind(this)
        window.addEventListener('dblclick', (event) => { this.handleClick(event) }, false);
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    handleClick(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = this.raycaster.intersectObjects(this.entitiesObjArray, true);
        if (intersects.length > 0) {
            let selectObject = intersects[0].object;
            for(let x of this.observers){
                x.update(selectObject);
            }
        }

    }

    addEntity(entity) {
        this.entitiesObjArray.push(entity.get3DObject());
    }
}