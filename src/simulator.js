/**
 * Clase Simulator, tiene toda la información
 */
import * as THREE from 'three';
import Camera from './camera';
import Room from './room';
import Light from './light';
import User from './user';
import CameraManager from './cameraManager';


const roomSizeKey = "roomSize";

export default class Simulator{

    constructor(data) {
        this.data = data;
        this.renderer;
        this.CameraManager;
        this.scene;
        this.entities = {};
        this.models;
        this.textures;
        this.lastUpdate;
    }

    initSimulator(models, textures){
        console.log("Iniciando Simulador");
        this.models = models;
        this.textures = textures;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('threejs').appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.entities["camera"] = new Camera(window.innerWidth, window.innerHeight);

        this.cameraManager = new CameraManager(this.entities["camera"].get3DObject(), this.renderer.domElement);

        this.entities["room"] = new Room(this.data[roomSizeKey], textures.getWindowOpen(), textures.getWindowClose(), textures.getWood());
        this.entities["light"] = new Light(0xffffff, 1, 250 );
        this.entities["user"] = new User(models.getModelsArray()[0]); //Ejemplo
    
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
        let now = Date.now();
        let dt = now - this.lastUpdate;
        this.lastUpdate = now;
        for (let [entityName, entity] of Object.entries(this.entities)) {
            entity.update(dt);
        }
        this.cameraManager.update();
        this.renderer.render(this.scene, this.entities["camera"].get3DObject());

        const that = this; //Para llamar al requestAnimationFrame
        window.requestAnimationFrame(function() {that.gameLoop()});
    }

}