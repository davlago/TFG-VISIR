/**
 * Clase para controllar la camara y la escena
 */

import {OrbitControls} from  'three/examples/jsm/controls/OrbitControls';
import Entity from './entity';

export default class Controller extends Entity{

    constructor(camera, renderer) {
        super();
        this.camera = camera;
        this.controls = new OrbitControls( camera, renderer );
        this.controls.update()

    }

    update() {
        this.controls.update()
    }
}