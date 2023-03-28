import * as THREE from 'three';


/**
 * Nombre: Entidad
 * Descripción: TODO
 */

export default class Entity {

    constructor(name) {
        this.object;
        this.isActive = false;
        this.isClicked = false;
        this.isActivated = false;
        this.position = { x: 0, y: 0, z: 0 };
        this.scale = { x: 1, y: 1, z: 1 };
        this.childrenGroup = new THREE.Group(); //Grupo de usuarios;
        this.childrenEntities = {};
        this.name = "No_Name";
    }

    setClicked(){
        this.isClicked = true;
    }

    hasChildren(){
        return !(this.childrenGroup.children.length === 0);
    }

    getChildrenGroup(){
        return this.childrenGroup;
    }
    getIsActive() {
        return this.isActive;
    }

    setIsActive(activate) {
        this.isActive = activate;
    }

    getPosition() {
        return this.object.position;
    }

    setPosition(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.object.position.set(x, y, z);
        this.childrenGroup.position.set(x,y,z);
    }

    getScale() {
        return this.scale;
    }

    setName(name){
        this.name = name;
        this.object.name = name;
    }

    getName(){
        return this.name;
    }

    setScale(x, y, z) {
        this.scale.x = x;
        this.scale.y = y;
        this.scale.z = z;

        this.object.scale.set(x, y, z);
    }

    getRotation() {
        return this.rotation;
    }

    setRotation(x,y,z) {
        this.object.rotation.x = x;
        this.object.rotation.y = y;
        this.object.rotation.z = z;
    }

    get3DObject() {
        return this.object;
    }


    /**
     * Función para activar entidades
     */
    activate() {
        if (!this.isActive) {
            this.isActive = true;
        }
        this.onEnable();
    }

    /**
     * Función para ¿? entidades
     */
    onEnable() { }

    /**
     * Función para actualizar entidades
     * @param {*} deltaTime 
     */
    update(deltaTime) {

    }

}