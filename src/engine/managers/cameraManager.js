/**
 * Clase para controllar la camara y la escena
 */

import { OrbitControls } from '../../utils/OrbitControls';
export default class CameraManager {

    constructor(camera, pos, renderer) {
        this.camera = camera;
        this.camera.setPosition(pos.x, pos.y, pos.z);
        this.controls = new OrbitControls( this.camera.get3DObject(), renderer.domElement );
        this.controls.enablePan = false; //Deshabilitar mover
        this.target = null;
        window.addEventListener('contextmenu', (event) => {
            this.camera.stopCamera()
        });
    }

    /**
     * Establece la posición de la cámara según un nombre predefinido.
     * @param {string} name - El nombre asociado a la posición de la cámara.
     */
    setPosition(name) {
        let pos = this.cameraPositions[name];
        this.camera.setPosition(pos.x, pos.y + 50, pos.z)
    }

    /**
     * Establece el enfoque de la cámara en un objeto y realiza un acercamiento.
     * @param {Object3D} object - El objeto al que se desea enfocar la cámara.
     * @param {number} zoom - El valor de zoom para acercar la cámara.
     */
    focusObj(object, zoom) {
        let pos = object.getPosition();
        this.target = pos;

        let newPos = {x:pos.x, y:pos.y+zoom, z:pos.z+zoom}
        this.camera.focusObj(newPos);
    }

    /**
     * Desactiva el enfoque de la cámara en un objeto y realiza un acercamiento.
     * @param {Object3D} object - El objeto del que se desea quitar el enfoque de la cámara.
     * @param {Vector3} zoom - El valor de zoom para acercar la cámara en cada eje (x, y, z).
     */
    noFocusObj(object, zoom){
        let pos = object.getPosition().clone();
        pos.y = 0;
        this.target = pos;

        let newPos = {x:pos.x, y:pos.y+zoom.y, z:pos.z+zoom.z}
        console.log(newPos)
        this.camera.focusObj(newPos);
    }

    /**
     * Actualiza el estado de la cámara en función del tiempo transcurrido y del objetivo establecido.
     * @param {number} deltaTime - El tiempo transcurrido desde la última actualización.
     */
    update(deltaTime){
        if(this.target !==null){
            this.controls.target.lerp(this.target,deltaTime*1.5);
        }
        this.controls.update();
    }

}