/**
 * Clase usuario, tiene toda la información
 */

import Entity from "../../engine/entities/entity";

export default class User extends Entity{

    constructor(model, index) {
        super();
        this.data = index;
        this.user = model;
        this.setPosition(0,0,0);
    }

    /**
     * Función para actualizar entidades
     * @param {*} deltaTime 
     */
    update(deltaTime){
        this.user.position.x +=0.1;
    }

    /** Establecer posición del usuario
    * @param {*} x 
    * @param {*} y altura
    * @param {*} z 
    */
    setPosition(x,y,z){
        this.user.position.set(x,y,z);
    }

    /**
     * Devuelve el Objecto3D
     */
    get3DObject() {
        return this.user;
    }
}