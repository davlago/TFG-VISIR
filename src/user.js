/**
 * Clase usuario, tiene toda la información
 */

import Entity from "./entity";

export default class User extends Entity{

    constructor(model) {
        super();
        this.user = model;
        this.setPosition(0,0,0);
    }

    renderer(){
        this.user.position.x +=0.1;
    }

    setPosition(x,y,z){
        this.user.position.set(x,y,z);
    }

    get3DObject() {
        return this.user;
    }
}