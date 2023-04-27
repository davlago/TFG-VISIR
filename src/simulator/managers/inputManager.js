/**
 * Clase para controllar la camara y la escena
 */

import * as THREE from 'three';

export default class InputManager {

    constructor(camera, renderer, setSelected, getSelected) {
        this.setSelected = setSelected;
        this.getSelected = getSelected;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.entities = {};
        this.renderer = renderer;
        this.entitiesObjArray = [];
        this.camera = camera;
        this.eventsList = []
        this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this)
        window.addEventListener('dblclick', (event) => { this.onDocumentMouseUp(event) }, false);
    }

    onDocumentMouseUp(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = this.raycaster.intersectObjects(this.entitiesObjArray, true);
        if (intersects.length > 0) {
            let selectObject = intersects[0].object;
            while(selectObject.name === ""){
                selectObject = selectObject.parent;
            }
            if(selectObject.type === "SkinnedMesh"){
                selectObject = selectObject.parent;
            }
            console.log(selectObject.name);
            let entitySelected = this.getSelected();
            let name = selectObject.name;
            if(selectObject.name.split("-")[0] === "Flag"){
                name = selectObject.name.split("-")[1]
            }
            if(entitySelected !== undefined){
                let entitySelectedName = entitySelected.getName()
                if(selectObject.name !== entitySelectedName){
                    this.entities[entitySelectedName].goDown();
                    this.entities[name].setClicked();
                    this.setSelected(this.entities[name]);
                }   
            }
            else{
                this.entities[name].setClicked();
                this.setSelected(this.entities[name]);
            }
        }

    }

    addEntity(entity) {
        this.entities[entity.name] = entity;
        this.entitiesObjArray.push(entity.get3DObject());
    }
}
