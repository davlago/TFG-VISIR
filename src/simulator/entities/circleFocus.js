/**
 * Clase de la habitación principal
 */

import Entity from "../../engine/entities/entity"
import * as GEOMETRY from "../../utils/geometryObjects";

export default class CircleFocus extends Entity {

    constructor(radius, color, pos) {
        super();
        this.object = GEOMETRY.cylinder(radius, 3);

        console.log(this.object);
        this.object.material.color.setHex(color);
        this.setPosition(pos.x, pos.y-0.9, pos.z);
    }

}
