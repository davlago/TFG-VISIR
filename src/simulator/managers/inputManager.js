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
        window.addEventListener('dblclick', (event) => {this.onDocumentMouseUp(event, this)}, false);
    }

    onDocumentMouseUp(event, that){
        event.preventDefault();
        that.mouse.x = ( event.clientX / that.renderer.domElement.clientWidth ) * 2 - 1;
        that.mouse.y = - ( event.clientY / that.renderer.domElement.clientHeight ) * 2 + 1;
        that.raycaster.setFromCamera( that.mouse, that.camera.get3DObject() );

        let intersects = that.raycaster.intersectObjects(that.entitiesObjArray);
        if(intersects.length > 0){
            //si hay alguien de mi nivel (soy comunidad(lv1) o soy usuario (lv2) lo dessecciono y mando activar a esta)
            //Debo saber yo como inputmanager quien está pulsado?
            let selectObject = intersects[0].object;
            console.log(selectObject);
            that.entities[selectObject.name].setClicked();

        }

    }

    addEntity(entity){
        this.entities[entity.name] = entity;
        this.entitiesObjArray.push(entity.get3DObject());
    }


}