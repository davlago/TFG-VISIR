/**
 * Clase Simulator, tiene toda la información
 */
import * as THREE from 'three';
import Camera from './entities/camera';
import Scene from './entities/scene';
import Stats from 'stats.js';
import CameraManager from './managers/cameraManager';
import * as simulatorMap from '../../assets/data/simulatorMap.json';
const generalCameraPositionKey = "cameraGeneralPosition";
import Light from './entities/light';
import AnimationManager from './managers/animationManager';
import InputManager from './managers/inputManager';


export default class GameEngine{

    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.scene = new Scene();
        this.entities = {};
        this.modelManager;
        this.gameLoop = this.gameLoop.bind(this)
        this.texturesManager;
        this.clock = new THREE.Clock();
        this.stats;
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
        let container =  document.getElementById('threejs');
        container.appendChild(this.renderer.domElement);
        this.stats = new Stats();
		container.appendChild( this.stats.dom );
        this.scene.add("light", new Light(0xffffff, 1))
        this.scene.add("camera", new Camera(window.innerWidth, window.innerHeight));

        this.createManagers();

        await this.createMyEntities();

        window.requestAnimationFrame(this.gameLoop);
    }

    /**
     * Crea los gestores de la simulación, como el gestor de la cámara, el gestor de animaciones y el gestor de entrada.
     */
    createManagers(){
        this.cameraManager = new CameraManager(this.scene.getEntity("camera"), simulatorMap[generalCameraPositionKey], this.renderer);
        this.animationManager = new AnimationManager();
        this.inputManager = new InputManager(this.scene.getCamera(), this.renderer);

        this.postCreateManagers()
    }

    postCreateManagers(){}

    /**
     * Crea las entidades personalizadas de la simulación.
     * @returns {Promise} Una promesa que se resuelve una vez que se han creado las entidades personalizadas.
     */
    createMyEntities(){
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    postUpdates(){}
    
    /**
     * Bucle de juego, para ir realizando las actualización de forma visual cada cierto tiempo, dado por un deltaTime
     */
    gameLoop() {
        this.stats.begin();
        let deltaTimeSec = this.clock.getDelta();
        this.scene.update(deltaTimeSec);
        this.postUpdates(deltaTimeSec);
        let scene = this.scene.get3DObject();
        this.renderer.render(scene, this.scene.getCamera());
        this.stats.end();

        window.requestAnimationFrame(this.gameLoop);
    }

}
