/**
 * Clase para controllar la camara y la escena
 */

export default class CameraManager {

    constructor(camera, pos) {
        this.camera = camera;

        this.camera.setPosition(pos.x, pos.y, pos.z);
        let cameraGenPos = { x: pos.x, y: pos.y, z: pos.z }
        this.cameraPositions = {};
        this.cameraPositions["general"] = cameraGenPos;

    }

    /**
     * Función que realiza el update en la camara cogiendo los controles que le demos
     */
    update() {
    }

    focusPos(position, rotation) {
        this.camera.setPosition(position.x, position.y, position.z);
        this.camera.setRotation(rotation.x, rotation.y, rotation.z);
    }

    focusObj(object) {
        let pos = object.getPosition();
        this.camera.lookAt(pos);
    }

}