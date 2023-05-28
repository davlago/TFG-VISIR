import * as THREE from 'three';

export default class AnimationManager {

    constructor() {
        this.mixer = new THREE.AnimationMixer();
        this.actions = [];
    }

    /**
     * Anima una entidad reproduciendo su animación principal.
     * @param {Entity} entity - La entidad a animar.
     */
    animateEntity(entity) {
        let object = entity.get3DObject();
        if (object.animations.length > 0) {
            const action = this.mixer.clipAction(object.animations[0], object);
            action.play();
            this.actions.push(action);
        }
    }

    /**
     * Para las animaciones
     */
    stopAnimate() {
        this.actions.forEach((action) => action.stop());
        this.mixer.stopAllAction();
        this.actions = [];
    }

    /**
     * Actualiza las animaciones con el tiempo transcurrido.
     * @param {number} deltaTime - El tiempo transcurrido desde la última actualización.
     */
    update(deltaTime) {
        this.mixer.update(deltaTime);
    }

}