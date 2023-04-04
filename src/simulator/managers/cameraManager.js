/**
 * Clase para controllar la camara y la escena
 */

import { OrbitControls } from '../../utils/OrbitControls';
export default class CameraManager {

    constructor(camera, pos, renderer) {
        this.camera = camera;
        //PROVISIONAL
        this.camera.setRotation(-1.5708,0,0)

        this.camera.setPosition(pos.x, pos.y, pos.z);
        let cameraGenPos = { x: pos.x, y: pos.y, z: pos.z }
        this.cameraPositions = {};
        this.cameraPositions["general"] = cameraGenPos;
        this.controls = new OrbitControls( this.camera.get3DObject(), renderer.domElement );
        this.controls.enablePan = false; //Deshabilitar mover

    }

    setPosition(name) {
        let pos = this.cameraPositions[name];
        this.camera.setPosition(pos.x, pos.y + 50, pos.z)
    }

    addCameraPosition(name, pos) {
        let newPos = pos;
        newPos.y +=50;
        this.cameraPositions[name] = newPos;
    }
    focusObj(object) {
        let pos = object.getPosition();
        console.log(pos);
        this.controls.target = pos;
    }
    update(deltaTime){
        this.controls.update();
    }

}