/**
 * Clase de la habitación principal
 */

import Entity from "../../engine/entities/entity"
import * as GEOMETRY from "../../utils/geometryObjects";

 export default class Room extends Entity{

    constructor(roomSize, textureWallOpen, textureWallClose, textureFloor){
        super();
        let cubeMaterialArray = [textureWallClose,textureWallClose,textureFloor,textureFloor,textureWallOpen,textureWallOpen];
        let size = {x:roomSize.coordX*1.25, y: roomSize.coordY,z:roomSize.coordZ*1.25}
        this.object = GEOMETRY.cubeTextures(size,cubeMaterialArray);
        this.setName("Room");
        this.setPosition(0,roomSize.coordY/2,0);

    }

}
