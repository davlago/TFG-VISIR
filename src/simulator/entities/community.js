/**
 * Clase de la comunidad
 */
import Entity from "../../engine/entities/entity"
import * as GEOMETRY from "../../utils/geometryObjects";

export default class Community extends Entity {

    constructor(index, radius, data, pos, textureBase) {
        super();
        this.info = data;
        this.cylinder = GEOMETRY.cylinderTexture(radius, textureBase, index, 1, 3);
        this.object = this.cylinder; //Comunidad, con grupo de usuarios, y la representación grafica
        this.setPosition(pos.x, pos.y, pos.z);
        this.radius = radius;
    }

    addUser(idUser, user) {
        user.setCommunity(this.getName())
        this.childrenEntities[idUser] = user;
    }

    onUpdate(deltaTime) {
        if (this.isClicked) {
            this.isClicked = false;
        }

    }


    getRadius(){
        return this.radius;
    }

    goDown(){
    }
}