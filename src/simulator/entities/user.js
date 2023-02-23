/**
 * Clase usuario, tiene toda la información
 */

import Entity from "../../engine/entities/entity";

export default class User extends Entity{

    constructor(model, index) {
        super();
        this.data = index;
        this.object = model;
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