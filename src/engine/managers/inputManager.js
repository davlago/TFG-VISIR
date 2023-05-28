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

    /**
     * Agrega un observador a la lista de observadores.
     * @param {Observer} observer - El observador a agregar.
     */
    addObserver(observer){
        this.observers.push(observer);
    }

    /**
     * Maneja el evento de clic del mouse.
     * @param {MouseEvent} event - El evento de clic del raton.
     */
    handleClick(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = this.raycaster.intersectObjects(this.entitiesObjArray, true);
        if (intersects.length > 0) {
            let selectObject = intersects[0].object;
            for(let x of this.observers){
                x.update("selectObject",selectObject);
            }
        }
        else{
            for(let x of this.observers){
                x.update("noObject");
            }
        }

    }

    /**
     * Agrega una entidad a la lista de entidades para realizar intersecciones con el raycaster.
     * @param {Entity} entity - La entidad a agregar.
    */ 
    addEntity(entity) {
        this.entitiesObjArray.push(entity.get3DObject());
    }
}