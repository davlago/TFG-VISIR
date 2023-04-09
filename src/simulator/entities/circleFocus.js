/**
 * Clase de la habitación principal
 */

import Entity from "../../engine/entities/entity"
import * as GEOMETRY from "../../utils/geometryObjects";

export default class CircleFocus extends Entity {

    constructor(radius, color, pos) {
        super();
        this.object = GEOMETRY.circle(radius)
        console.log(this.object);
        this.object.material.color.setHex(color);
        this.setPosition(pos.x, pos.y, pos.z);
        this.setRotation(-1.5708, 0, 0);
    }

}
