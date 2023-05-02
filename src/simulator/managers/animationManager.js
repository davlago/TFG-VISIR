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

    animateOneEntity(entity) {
        this.stopAnimate()
        if (entity.getType() === "user") {
            let object = entity.get3DObject();
            const action = this.mixer.clipAction(object.animations[0], object);
            action.play();
            this.actions.push(action);
        }
        else {
            for (let [entityName, user] of Object.entries(entity.getChildrenEntities())) {
                let object = user.get3DObject();
                const action = this.mixer.clipAction(object.animations[0], object);
                action.play();
                this.actions.push(action);
            }
        }

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