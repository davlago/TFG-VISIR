/**
 * Nombre: Entidad
 * Descripción: TODO
 */

export default class Entity {
    constructor() {
        this.isActive = true;        
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

    onEnable() {}

    /**
     * Función para actualizar entidades
     * @param {*} deltaTime 
     */
    update(deltaTime) {}

    /**
     * Devuelve el Objecto3D
     */
    get3DObject() {}

    /**
     * Función para añadir a la scena
     * @param {*} scene 
     */
    addToScene(scene){
        scene.add(this.get3DObject());
    }
}