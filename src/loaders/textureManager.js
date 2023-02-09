/**
 * Clase para cargar las texturas
 */

import { TextureLoader } from "three";

export default class TextureManager {

    constructor() {
        this.textures = {};
    }

    /**
     * Crea las diferentes promesas para cada textura del array y luego espera a que todas acaben para realizar el resolve()
     * @param {Array of Object} materialsInfoArray Donde está toda la información de las texturas a cargar
     * @returns Devuelve una promesa en la que se espera a que todo esté cargado
     */
    loadTextures(materialsInfoArray) {
        return new Promise((resolve, reject) => {
            let promises = [];
            for (let i in materialsInfoArray) {
                promises.push(this.load(materialsInfoArray[i]))
            }
            Promise.all(promises).then(function () {
                console.log("All textures loaded");
                resolve();
            });
        });
    }

    /**
     * Función que realiza la carga de la textura y la va guardando en el this.textures, que es nuestro array de texturas
     * @param {Object} texture Objeto con la información necesaria para cargar la textura
     * @returns devuelve una promesa que se resuelve cuando la textura a terminado de cargarse
     */
    load(texture) {
        return new Promise((resolve, reject) => {
            let textureLoader = new TextureLoader();
            textureLoader.load(texture.file,
                (object) => {
                    this.textures[texture.key] = object;
                    console.log("Loaded " + texture.key);
                    resolve();
                });
        });
    }

    /**
     * Función que devuelve el array de texturas
     * @returns Array de texturas
     */
    getTextures() {
        return this.textures;
    }

    /**
     * Función que devuelve una textura en concreto
     * @param {String} key textura a pedir
     * @returns Textura pedida
     */
    getOneTexture(key) {
        return this.textures[key];
    }

}