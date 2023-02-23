/**
 * Clase Simulator, tiene toda la información
 */
import * as THREE from 'three';
import Camera from '../objects/camera';
import Room from '../objects/room';
import Light from '../objects/light';
import CameraManager from './cameraManager';
import Community from '../objects/community';
import PolygonDist from '../utils/polygonDist';


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

        this.entities["room"] = new Room(this.data[roomSizeKey],
            texturesManager.getOneTexture("windowOpen"),
            texturesManager.getOneTexture("windowClose"),
            texturesManager.getOneTexture("wood")
        );
        this.entities["light"] = new Light(0xffffff, 1, 250 );

        //Creación de comunidades
        //De momento manual
        this.entities["communities"] = [];
        this.polygonDist = new PolygonDist();
        let vertexArray = this.polygonDist.generatePolygon(5, this.data[roomSizeKey].coordX/2.8);
        console.log(vertexArray)   
        for(let i = 0; i < vertexArray.length-1; i++){
            let community = new Community(0, 20, null, vertexArray[i] ,modelsManager , texturesManager.getOneTexture("wood"));
            this.entities["communities"].push(community)
        }
        
    
        this.addToSceneInit();
        this.lastUpdate = Date.now();
        console.log(this.scene)

        const that = this; //Para llamar al requestAnimationFrame
        window.requestAnimationFrame(function() {that.gameLoop()});
    }

    /**
     * Función que añade las entitades a la scena para que se representen
     */
    addToSceneInit(){
        for (let [entityName, entity] of Object.entries(this.entities)) {
            console.log(entityName)
            console.log(entity)
            if(Array.isArray(entity)){
                for(let e of entity){
                    e.addToScene(this.scene);   
                }
            }
            else{
                entity.addToScene(this.scene);
            }
            console.log(entityName);
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
