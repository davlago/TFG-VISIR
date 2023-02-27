/**
 * Nombre: Entidad
 * Descripción: TODO
 */

export default class Entity {

    constructor() {
        this.object;
        this.isActive = true;
        this.position = { x: 0, y: 0, z: 0 };
        this.scale = { x: 1, y: 1, z: 1 };
    }

    getIsActive() {
        return this.isActive;
    }

    setIsActive(activate) {
        this.isActive = activate;
    }

    getPosition() {
        return this.position;
    }

    setPosition(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.object.position.set(x, y, z);
    }

    getScale() {
        return this.scale;
    }

    setName(name){
        this.object.name = name;
    }

    getName(){
        return this.object.name;
    }

    setScale(x, y, z) {
        this.scale.x = x;
        this.scale.y = y;
        this.scale.z = z;

        this.object.scale.set(x, y, z);
    }

    getRotation() {
        return this.rotation;
    }

    setRotation(x,y,z) {
        this.object.rotateX(x);
        this.object.rotateX(y);
        this.object.rotateX(z);
    }

    get3DObject() {
        return this.object;
    }


    /**
     * Función para activar entidades
     */
    activate() {
        if (!this.isActive) {
            this.isActive = true;
        }
        this.onEnable();
    }

    /**
     * Función para ¿? entidades
     */
    onEnable() { }

    /**
     * Función para actualizar entidades
     * @param {*} deltaTime 
     */
    update(deltaTime) { }

    /**
     * Función para añadir a la scena
     * @param {*} scene 
     */
    addToScene(scene) {
        scene.add(this.get3DObject());
    }
}