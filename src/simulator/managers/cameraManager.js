/**
 * Clase para controllar la camara y la escena
 */

export default class CameraManager {

    constructor(camera, pos) {
        this.camera = camera;
        //PROVISIONAL
        this.camera.setRotation(-1.5708,0,0)

        this.camera.setPosition(pos.x, pos.y, pos.z);
        let cameraGenPos = { x: pos.x, y: pos.y, z: pos.z }
        this.cameraPositions = {};
        this.cameraPositions["general"] = cameraGenPos;

    }

    setPosition(name) {
        let pos = this.cameraPositions[name];
        this.camera.setPosition(pos.x, pos.y + 100, pos.z)
    }

    addCameraPosition(name, pos) {
        this.cameraPositions[name] = pos;
    }
    focusObj(object) {
        let pos = object.position;
        //this.camera.lookAt(pos);
    }

}