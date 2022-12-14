/**
 * Nombre: Entidad
 * Descripción: TODO
 */

export default class Entity {
    constructor() {
        this.isActive = true;        
    }

    activate() {
        if (!this.isActive) {
            this.isActive = true;
        }
        this.onEnable();
    }

    update() {

    }

    get3DObject() {

    }

    
    addToScene(scene){
        scene.add(this.get3DObject());
    }

    onEnable() {}
    

}