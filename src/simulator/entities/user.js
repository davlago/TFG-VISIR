/**
 * Clase usuario, tiene toda la información
 */

import Entity from "../../engine/entities/entity";

export default class User extends Entity{

    constructor(index, model, data) {
        super();
        this.userInfo = data;
        this.object = model;
        this.setName("User " + index);
        this.setScale(0.06, 0.06, 0.06);
    }

    /**
     * Función para actualizar entidades
     * @param {*} deltaTime 
     */
    update(deltaTime){
        this.object.position.x +=0.1;
    }
}