import * as THREE from 'three';

export default class AnimationManager {

    constructor() {
        this.mixer = new THREE.AnimationMixer();
        this.actions = [];
    }

    animateEntity(entity){
        let object = entity.get3DObject();
        const action = this.mixer.clipAction(object.animations[0], object);
        action.play();
        this.actions.push(action);
    }

    stopAnimate() {
        this.actions.forEach((action) => action.stop());
        this.mixer.stopAllAction();
        this.actions = [];
    }

    update(deltaTime) {
        this.mixer.update(deltaTime);
    }

}