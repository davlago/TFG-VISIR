/**
 * Nombre: Simulator
 * Descripción: Clase que controla todo, con un gameloop
 */
import * as THREE from 'three';
import Camera from './camera';
import Room from './room';
import Light from './light';
import User from './user';
import Controller from './controller';


const sizes = {
    width: window.innerWidth*0.985,
    height: window.innerHeight*0.975
}
const roomSize ={
    x:200,
    y:50,
    z:200
}

let renderer;
let scene;
let entities = {};
/**
 * 
 * @param {*} models 
 * @param {*} textures 
 */
export function initSimulator(models, textures) {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    document.getElementById('threejs').appendChild(renderer.domElement);

    scene = new THREE.Scene();
    entities["camera"] = new Camera(sizes);
    entities["controller"] = new Controller(entities["camera"].get3DObject(), renderer.domElement);
    
    entities["room"] = new Room(roomSize, textures.getWindowOpen(), textures.getWindowClose(), textures.getWood());
    entities["light"] = new Light(0xffffff, 1, 250 );
    entities["user"] = new User(models.getModelsArray()[0]); //Ejemplo
    
    addToSceneInit();
    window.requestAnimationFrame(gameLoop);
}

function addToSceneInit(){
    scene.add(entities["room"].get3DObject());
    //scene.add(entities["user"].get3DObject());
    scene.add(entities["light"].get3DObject());
    entities["camera"].addToScene(scene);
    entities["user"].addToScene(scene);
    console.log(scene);
}

function gameLoop() {
    // Calcular dt
    for (let [entityName, entity] of Object.entries(entities)) {
        entity.update(); // Pasar el dt
        //entity.renderer();
    }
    renderer.render(scene, entities["camera"].get3DObject());
    window.requestAnimationFrame(gameLoop);
}