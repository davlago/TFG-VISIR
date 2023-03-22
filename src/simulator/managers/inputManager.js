/**
 * Clase para controllar la camara y la escena
 */

import * as THREE from 'three';

export default class InputManager {

    constructor(camera, renderer) {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.entities = {};
        this.renderer = renderer;
        this.entitiesObjArray =[];
        this.camera = camera;
        this.eventsList = []
        this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this)
        window.addEventListener('dblclick', (event) => {this.onDocumentMouseUp(event)}, false);
    }

    onDocumentMouseUp(event){
        event.preventDefault();
        this.mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;
        this.raycaster.setFromCamera( this.mouse, this.camera.get3DObject() );

        let intersects = this.raycaster.intersectObjects(this.entitiesObjArray);
        if(intersects.length > 0){
            //si hay alguien de mi nivel (soy comunidad(lv1) o soy usuario (lv2) lo dessecciono y mando activar a esta)
            //Debo saber yo como inputmanager quien está pulsado?
            let selectObject = intersects[0].object;
            console.log(selectObject);
            this.entities[selectObject.name].setClicked();

        }

    }

    addEntity(entity){
        this.entities[entity.name] = entity;
        this.entitiesObjArray.push(entity.get3DObject());
    }


}