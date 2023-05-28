/**
 * Clase de la comunidad
 */
import Entity from "../../engine/entities/entity"
import * as GEOMETRY from "../../utils/geometryObjects";

export default class Community extends Entity {

    constructor(index, radius, data, pos, textureBase) {
        super("community");
        this.info = data;
        this.cylinder = GEOMETRY.cylinderTexture(radius, textureBase, index, 1, 3);
        this.object = this.cylinder; //Comunidad, con grupo de usuarios, y la representación grafica
        this.setName(index);
        this.setPosition(pos.x, pos.y, pos.z);
        this.radius = radius;
    }

    /**
     * Agrega un usuario a la comunidad.
     * @param {string} idUser - El identificador del usuario.
     * @param {User} user - El objeto de usuario a agregar.
     */
    addUser(idUser, user) {
        user.setCommunity(this.getName())
        this.childrenEntities[idUser] = user;
    }

    /**
     * Método de actualización de la comunidad.
     * @param {number} deltaTime - El tiempo transcurrido desde la última actualización.
     */
    onUpdate(deltaTime) {
        if (this.isClicked) {
            this.isClicked = false;
        }

    }

    /**
     * Obtiene el radio de la comunidad.
     * @returns {number} El radio de la comunidad.
     */
    getRadius(){
        return this.radius;
    }

    goDown(){
    }
}