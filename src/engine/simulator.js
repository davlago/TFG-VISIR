/**
 * Clase Simulator, tiene toda la información
 */
import * as THREE from 'three';
import Camera from '../objects/camera';
import Room from '../objects/room';
import Light from '../objects/light';
import CameraManager from './cameraManager';
import Community from '../objects/community';


const roomSizeKey = "roomSize";

export default class Simulator{

    constructor(data) {
        this.data = data;
        this.renderer;
        this.CameraManager;
        this.scene;
        this.entities = {};
        this.modelsManager;
        this.texturesManager;
        this.clock = new THREE.Clock();
    }

    initSimulator(modelsManager, texturesManager){
        console.log("Iniciando Simulador");
        this.modelsManager = modelsManager;
        this.texturesManager = texturesManager;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('threejs').appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.entities["camera"] = new Camera(window.innerWidth, window.innerHeight);

        this.cameraManager = new CameraManager(this.entities["camera"].get3DObject(), this.renderer.domElement);

        this.entities["room"] = new Room(this.data[roomSizeKey],
            texturesManager.getOneTexture("windowOpen"),
            texturesManager.getOneTexture("windowClose"),
            texturesManager.getOneTexture("wood")
        );
        this.entities["light"] = new Light(0xffffff, 1, 250 );
        this.entities["community"] = new Community(this.scene, 0, 20, null,{x:0,y:20,z:0} ,modelsManager , texturesManager.getOneTexture("wood")); //Ejemplo
    
        this.addToSceneInit();
        this.lastUpdate = Date.now();
        console.log(this.scene)

        const that = this; //Para llamar al requestAnimationFrame
        window.requestAnimationFrame(function() {that.gameLoop()});
    }

    addToSceneInit(){
        for (let [entityName, entity] of Object.entries(this.entities)) {
            entity.addToScene(this.scene);
        }
    }
    
    gameLoop() {
        let deltaTimeSec = this.clock.getDelta();
        for (let [entityName, entity] of Object.entries(this.entities)) {
            entity.update(deltaTimeSec);
        }
        this.cameraManager.update();
        this.renderer.render(this.scene, this.entities["camera"].get3DObject());

        const that = this; //Para llamar al requestAnimationFrame
        window.requestAnimationFrame(function() {that.gameLoop()});
    }

}
