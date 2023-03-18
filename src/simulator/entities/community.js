/**
 * Clase de la comunidad
 */
import RenderableEntity from "../../engine/entities/renderableEntity";
import * as GEOMETRY from "../../utils/geometryObjects";

export default class Community extends RenderableEntity {

    constructor(index, radius, data, pos, textureBase) {
        super();
        this.communityInfo = data;
        this.cylinder = GEOMETRY.cylinder(radius, textureBase, index, 0);
        this.childrenGroup.name = "Community " + index;

        this.object = this.cylinder; //Comunidad, con grupo de usuarios, y la representación grafica
        this.setPosition(pos.x, pos.y, pos.z);
    }

    addUser(idUser, user){
        this.childrenEntities[idUser] = user;
        this.childrenGroup.add(user.get3DObject());
    }

}