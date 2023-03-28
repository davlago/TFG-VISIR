/**
 * Clase Simulator, tiene toda la información
 */
import * as THREE from 'three';
import Camera from './entities/camera';
import Scene from './entities/scene';



const roomSizeKey = "roomSize";

export default class GameEngine{

    constructor() {
        this.renderer = new THREE.WebGLRenderer();;
        this.scene = new Scene();
        this.entities = {};
        this.modelManager;
        this.gameLoop = this.gameLoop.bind(this)
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
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('threejs').appendChild(this.renderer.domElement);

        this.scene.add("camera", new Camera(window.innerWidth, window.innerHeight));

        this.createManagers();

        await this.createMyEntities();

        window.requestAnimationFrame(this.gameLoop);
    }

    createManagers(){
    }

    createMyEntities(){
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    postUpdates(){
    }
    
    /**
     * Bucle de juego, para ir realizando las actualización de forma visual cada cierto tiempo, dado por un deltaTime
     */
    gameLoop() {
        let deltaTimeSec = this.clock.getDelta();
        this.scene.update(deltaTimeSec);
        this.postUpdates(deltaTimeSec);
        let scene = this.scene.get3DObject();
        this.renderer.render(scene, this.scene.getCamera());
        window.requestAnimationFrame(this.gameLoop);
    }

}
