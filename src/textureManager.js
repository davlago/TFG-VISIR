/**
 * Clase para cargar las texturas
 */

 import { TextureLoader } from "three";

export default class TextureManager {

    constructor() {
        this.textures = {};
    }

    loadTextures(materialsInfoArray){
        return new Promise((resolve, reject) => {
            let promises=[];
            for (let i in materialsInfoArray) {
                promises.push(this.load(materialsInfoArray[i]))
            }
            Promise.all(promises).then(function(){
                console.log("All textures loaded");
                resolve();
            });
        });
    }

    load(texture){
        return new Promise((resolve, reject) => {
            let textureLoader = new TextureLoader();
            textureLoader.load(texture.file,
                (object) => {
                    this.textures[texture.key]=object;
                    console.log("Loaded "+ texture.key);
                    resolve();
                });
        });
    }

    getTextures(){
        return this.textures;
    }

    getOneTexture(key){
        console.log(key);
        console.log(this.textures);
        return this.textures[key];
    }

}