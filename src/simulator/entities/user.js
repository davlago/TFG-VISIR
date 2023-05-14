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

    goDown() {
        this.isClicked = false;
    }

    setCommunity(name) {
        this.info.setData("community", name)
    }

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