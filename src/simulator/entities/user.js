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
            let pos = {x: this.position.x, y: this.position.y + 10, z: this.position.z}
            this.object.position.lerp(pos,deltaTime);
            let scale = {x:0.1, y:0.1, z:0.1}
            this.object.scale.lerp(scale,deltaTime);
        }
        else{
            this.object.position.lerp(this.position,deltaTime);
            let scale = {x:0.06, y:0.06, z:0.06}
            this.object.scale.lerp(scale,deltaTime);
        }

    }
    
    goDown(){
        this.isClicked = false;
    }

    setCommunity(name){
        this.info.setData("community",name)
    }
}