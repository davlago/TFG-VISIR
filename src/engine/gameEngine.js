/**
 * Clase Simulator, tiene toda la información
 */
import * as THREE from 'three';
import Camera from './entities/camera';



const roomSizeKey = "roomSize";

export default class GameEngine{

    constructor() {
        this.renderer;
        this.CameraManager;
        this.scene;
        this.entities = {};
        this.modelManager;
        this.texturesManager;
        this.clock = new THREE.Clock();
    }

    /**
     * Funcion que inicia el simulador creando las principales componentes
     * @param {*} modelManager Manejador de modelos
     * @param {*} texturesManager Manejador de texturas
     */
    async initSimulator(modelManager, texturesManager){
        console.log("Iniciando Simulador");
        this.modelManager = modelManager;
        this.texturesManager = texturesManager;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('threejs').appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.entities["camera"] = new Camera(window.innerWidth, window.innerHeight);

        await this.createMyEntities();

        this.createManagers();


        this.addToSceneInit();

        const that = this; //Para llamar al requestAnimationFrame
        window.requestAnimationFrame(function() {that.gameLoop()});
    }

    createManagers(){
    }

    createMyEntities(){
        return new Promise((resolve, reject) => {
            resolve();
        });
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
