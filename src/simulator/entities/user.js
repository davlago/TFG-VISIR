/**
 * Clase usuario, tiene toda la información
 */

import Entity from "../../engine/entities/entity"

export default class User extends Entity{

    constructor(index, model, data) {
        super();
        this.info = data;
        this.object =model;
        this.setScale(0.06, 0.06, 0.06);
    }

    onUpdate(deltaTime) {
        if (this.isClicked) {
            this.setPosition(this.position.x, this.position.y + 10, this.position.z);
            this.isClicked = false;
        }

    }
    
    goDown(){
        this.setPosition(this.position.x, this.position.y - 10, this.position.z);
    }

    setCommunity(name){
        this.info.setData("community",name)
    }
}