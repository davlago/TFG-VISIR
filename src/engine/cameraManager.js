/**
 * Clase para controllar la camara y la escena
 */

import {OrbitControls} from  'three/examples/jsm/controls/OrbitControls';

export default class CameraManager{

    constructor(camera, renderer) {
        this.camera = camera;
        this.controls = new OrbitControls( camera, renderer );
        this.controls.update()

    }

    update() {
        this.controls.update()
    }
}