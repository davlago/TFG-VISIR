/**
 * Clase usuario, tiene toda la información
 */

import Entity from "../../engine/entities/entity"

export default class User extends Entity {

    constructor(index, model, data) {
        super("user");
        this.info = data;
        this.object = model;
        this.setName(index);
        this.setScale(0.06, 0.06, 0.06);
    }

    /**
     * Método de actualización de la entidad.
     * @param {number} deltaTime - El tiempo transcurrido desde la última actualización.
     */
    onUpdate(deltaTime) {
        if (this.isClicked) {
            let pos = { x: this.position.x, y: this.position.y + 10, z: this.position.z }
            this.object.position.lerp(pos, deltaTime * 1.5);
            let scale = { x: 0.1, y: 0.1, z: 0.1 }
            this.object.scale.lerp(scale, deltaTime * 1.5);
        }
        else {
            this.object.position.lerp(this.position, deltaTime * 1.5);
            let scale = { x: 0.06, y: 0.06, z: 0.06 }
            this.object.scale.lerp(scale, deltaTime * 1.5);
        }

    }

    /**
     * Desciende la entidad.
     */
    goDown() {
        this.isClicked = false;
    }

    /**
     * Establece la comunidad a la que pertenece la entidad.
     * @param {string} name - El nombre de la comunidad.
     */
    setCommunity(name) {
        this.info.setData("community", name)
    }

    /**
     * Establece la opacidad de la entidad y sus objetos hijos.
     * @param {boolean} b - El valor de opacidad a establecer.
     */
    setOpacity(b) {
        this.object.children.forEach(function (objeto) {
            if (objeto.type === "Flag") {
                objeto.children[0].material.opacity = b;
            }
            else if (objeto.type !== "Bone") {
                objeto.material = objeto.material.clone(); // crear una nueva instancia de material
                objeto.material.opacity = b;
                objeto.material.transparent = true;
            }
        });
    }
}