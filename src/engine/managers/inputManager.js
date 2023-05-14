/**
 * Clase para controllar la camara y la escena
 */

import * as THREE from 'three';

export default class InputManager {

    constructor(camera, renderer, animationManager) {
        this.setSelected;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.entities = {};
        this.renderer = renderer;
        this.entitiesObjArray = [];
        this.camera = camera;
        this.eventsList = []
        this.handleClick = this.handleClick.bind(this)
        this.animationManager = animationManager;
        window.addEventListener('dblclick', (event) => { this.handleClick(event) }, false);
    }

    setFunctionSelect(setSelected){
        this.setSelected = setSelected;
    }

    handleClick(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = this.raycaster.intersectObjects(this.entitiesObjArray, true);
        if (intersects.length > 0) {
            let selectObject = intersects[0].object;
            this.setSelected(selectObject);
        }

    }

    addEntity(entity) {
        this.entitiesObjArray.push(entity.get3DObject());
    }
}