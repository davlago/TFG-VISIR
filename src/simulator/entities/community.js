/**
 * Clase de la comunidad
 */
import Entity from "../../engine/entities/entity"
import * as GEOMETRY from "../../utils/geometryObjects";

export default class Community extends Entity {

    constructor(index, radius, data, pos, textureBase) {
        super();
        this.communityInfo = data;
        this.cylinder = GEOMETRY.cylinder(radius, textureBase, index, 0);
        this.childrenGroup.name = "Community " + index;
        this.isActive = true;
        this.object = this.cylinder; //Comunidad, con grupo de usuarios, y la representación grafica
        this.setPosition(pos.x, pos.y, pos.z);
    }

    addUser(idUser, user) {
        this.childrenEntities[idUser] = user;
        this.childrenGroup.add(user.get3DObject());
    }

    update(deltaTime) {
        if (this.isActive) {
            if (this.isClicked) {
                this.setPosition(this.position.x, this.position.y + 10, this.position.z);
                this.isClicked = false;
            }
        }
    }

    desactivate() {
        this.setPosition(this.position.x, this.position.y - 10, this.position.z);
        this.isActive = true;
        for (const [key, value] of Object.entries(this.childrenEntities)) {
            value.isActive = false;
        }

    }

}