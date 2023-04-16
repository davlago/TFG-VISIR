/**
 * Clase para controllar la camara y la escena
 */

import { OrbitControls } from '../../utils/OrbitControls';
export default class CameraManager {

    constructor(camera, pos, renderer) {
        this.camera = camera;
        this.camera.setPosition(pos.x, pos.y, pos.z);
        let cameraGenPos = { x: pos.x, y: pos.y, z: pos.z }
        this.controls = new OrbitControls( this.camera.get3DObject(), renderer.domElement );
        this.controls.enablePan = false; //Deshabilitar mover
        this.target = null;

    }

    setPosition(name) {
        let pos = this.cameraPositions[name];
        this.camera.setPosition(pos.x, pos.y + 50, pos.z)
    }

    focusObj(object, zoom) {
        let pos = object.getPosition();
        this.target = pos;

        let newPos = {x:pos.x, y:pos.y+zoom, z:pos.z+zoom}
        this.camera.focusObj(newPos);
    }

    noFocusObj(object, zoomY, zoomZ){
        let pos = object.getPosition().clone();
        pos.y = 0;
        this.target = pos;

        let newPos = {x:pos.x, y:pos.y+zoomY, z:pos.z+zoomZ}
        console.log(newPos)
        this.camera.focusObj(newPos);
    }

    update(deltaTime){
        if(this.target !==null){
            this.controls.target.lerp(this.target,deltaTime);
        }
        this.controls.update();
    }

}