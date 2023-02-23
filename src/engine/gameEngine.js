/**
 * Clase Simulator, tiene toda la información
 */
import * as THREE from 'three';
import Camera from './entities/camera';
import Room from '../simulator/entities/room';
import Light from './entities/light';
import CameraManager from './cameraManager';
import Community from '../simulator/entities/community';
import PolygonDist from '../utils/polygonDist';


const roomSizeKey = "roomSize";

export default class GameEngine{

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

    /**
     * Funcion que inicia el simulador creando las principales componentes
     * @param {*} modelsManager Manejador de modelos
     * @param {*} texturesManager Manejador de texturas
     */
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

        this.entities["light"] = new Light(0xffffff, 1, 250 );

        this.createMyEntities();

        this.addToSceneInit();

        const that = this; //Para llamar al requestAnimationFrame
        window.requestAnimationFrame(function() {that.gameLoop()});
    }

    createMyEntities(){
        //Esta función se rellena en el simulador, ya que es externa al motor de juego
    }

    /**
     * Función que añade las entitades a la scena para que se representen
     */
    addToSceneInit(){
        for (let [entityName, entity] of Object.entries(this.entities)) {
            if(Array.isArray(entity)){
                for(let e of entity){
                    e.addToScene(this.scene);   
                }
            }
            else{
                entity.addToScene(this.scene);
            }
        }
    }
    
    /**
     * Bucle de juego, para ir realizando las actualización de forma visual cada cierto tiempo, dado por un deltaTime
     */
    gameLoop() {
        let deltaTimeSec = this.clock.getDelta();
        for (let [entityName, entity] of Object.entries(this.entities)) {
            if(Array.isArray(entity)){
                for(let e of entity){
                    e.update(deltaTimeSec);   
                }
            }
            else{
                entity.update(deltaTimeSec);
            }
        }
        this.cameraManager.update();
        this.renderer.render(this.scene, this.entities["camera"].get3DObject());

        const that = this; //Para llamar al requestAnimationFrame
        window.requestAnimationFrame(function() {that.gameLoop()});
    }

}
