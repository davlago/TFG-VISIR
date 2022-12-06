/**
 * Nombre: Simulator
 * Descripción: Clase que controla todo, con un gameloop
 */
import * as THREE from 'three';
import Camera from './camera';


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

let container = document.getElementById('threejs');

let renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
container.appendChild(renderer.domElement);

let entities = {};

export function initSimulator() {
    entities["scene"] = new THREE.Scene();
    entities["camera"] = new Camera(sizes);
    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
    renderer.render(entities["scene"], entities["camera"].getCamera());
    for (let [entityName, entity] of Object.entries(entities)) {
        entity.update();
        entity.renderer();
    }
    window.requestAnimationFrame(gameLoop);
}