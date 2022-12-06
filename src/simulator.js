import MyScene from './myScene.js';
/**
 * Nombre: Simulator
 * Descripción: Clase que controla todo, con un gameloop
 */

export default class Simulator {
    constructor() {
        this.parar = false;
        this.myScene;
    }

    init(){
        console.log("Empiezo simulación");
        this.myScene = new MyScene();
        this.myScene.renderer();
    }

    gameLoop(){
        
    }

}