/**
 * Clase usuario, tiene toda la información
 */

import RenderableEntity from "../../engine/entities/renderableEntity";
export default class User extends RenderableEntity{

    constructor(index, model, data) {
        super();
        this.userInfo = data;
        this.object = model;
        this.setScale(0.06, 0.06, 0.06);
    }

}