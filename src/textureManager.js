/**
 * Clase para cargar las texturas
 */

 import { TextureLoader } from "three";

export default class TextureManager {

    constructor() {
        this.loader = new TextureLoader();
        this.woodMaterial;
        this.brickMaterial;
        this.windowCloseMaterial;
        this.windowOpenMaterial;
    }

    loadTextures(){
        this.woodMaterial = this.loader.load('../textures/wood-texture.jpg');
        this.brickMaterial = this.loader.load('../textures/brick-wall.jpg');
        this.windowOpenMaterial = this.loader.load('../textures/windowOpen.png');
        this.windowCloseMaterial = this.loader.load('../textures/windowClose.png');

    }

    getWood(){
        return this.woodMaterial;
    }

    getBrick(){
        return this.brickMaterial;
    }

    getWindowClose(){
        return this.windowCloseMaterial;
    }
    
    getWindowOpen(){
        return this.windowOpenMaterial;
    }

}