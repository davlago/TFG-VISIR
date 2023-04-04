/**
 * Clase de la comunidad
 */
import Entity from "../../engine/entities/entity"
import * as GEOMETRY from "../../utils/geometryObjects";

export default class Community extends Entity {

    constructor(index, radius, data, pos, textureBase) {
        super();
        this.communityInfo = data;
        this.cylinder = GEOMETRY.cylinder(radius, textureBase, index, 1, 3);
        this.isActive = true;
        this.object = this.cylinder; //Comunidad, con grupo de usuarios, y la representación grafica
        this.setPosition(pos.x, pos.y, pos.z);
    }

    addUser(idUser, user) {
        this.childrenEntities[idUser] = user;
    }

    onUpdate(deltaTime) {
        if (this.isClicked) {
            this.cylinder.material.color = {r: 136, g: 8, b: 8}
            console.log(this.cylinder)        
            this.isClicked = false;
        }

    }

    goDown(){
        this.cylinder.material.color = {r: 1, g: 1, b: 1}
    }
}