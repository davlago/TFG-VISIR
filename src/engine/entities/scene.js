/**
 * Clase para tener las luces generales de la habitación
 */


import * as THREE from "three";


export default class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.entities = {};
    }

    /**
     * Actualiza el estado de todas las entidades en el juego.
     * @param {number} deltaTimeSec - El tiempo transcurrido desde la última actualización en segundos.
     */
    add(name, entity) {
        if (Array.isArray(entity)) {
            for (let e of entity) {
                this.scene.add(e.get3DObject());
                this.entities[e.name] = e;
                if (e.hasChildren()) {
                    let childrens = e.getChildrenEntities();
                    for (let [entityName, entity] of Object.entries(childrens)) {
                        this.scene.add(entity.get3DObject())
                        this.entities[entityName] = entity;
                    }
                }
            }
        }
        else {
            this.scene.add(entity.get3DObject());
            this.entities[name] = entity;
        }
    }

    /**
     * Elimina una entidad de la escena según su nombre.
     * @param {string} name - El nombre de la entidad a eliminar.
     */
    remove(name) {
        if (this.entities[name] !== undefined) {
            if (this.entities[name].isObject3D) {
                this.scene.remove(this.entities[name])
            }
            else {
                this.scene.remove(this.entities[name].get3DObject());
            }
        }
    }

    /**
     * Actualiza el estado de todas las entidades en la escena.
     * @param {number} deltaTimeSec - El tiempo transcurrido desde la última actualización en segundos.
     */
    update(deltaTimeSec) {
        for (let [entityName, entity] of Object.entries(this.entities)) {
            if (Array.isArray(entity)) {
                for (let e of entity) {
                    e.update(deltaTimeSec);
                }
            }
            else {
                entity.update(deltaTimeSec);
            }
        }
    }

    getCamera() {
        return this.entities.camera.get3DObject();
    }

    getEntity(key) {
        return this.entities[key];
    }

    get3DObject() {
        return this.scene;
    }

}
