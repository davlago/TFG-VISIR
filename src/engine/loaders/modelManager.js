/**
 * Clase para cargar los modelos 3D de cada persona
 */

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';


export default class ModelManager {

    constructor() {
        this.models = {};
    }

    /**
     * Crea las diferentes promesas para cada modelo del array y luego espera a que todas acaben para realizar el resolve()
     * @param {Array of Object} modelsInfoArray Donde está toda la información de los modelos a cargar
     * @returns Devuelve una promesa en la que se espera a que todo esté cargado
     */
    loadModels(modelsInfoArray) {
        return new Promise((resolve, reject) => {
            let promises = [];
            for (let i in modelsInfoArray) {
                promises.push(this.load(modelsInfoArray[i]))
            }

            Promise.all(promises).then(function () {
                console.log("All models loaded");
                resolve();
            });


        });
    }


    /**
     * Función que realiza la carga y la escala del modelo y lo va guardando en el this.models, que es nuestro array de modelos
     * @param {Object} model Objeto con la información necesaria para cargar el modelo
     * @returns devuelve una promesa que se resuelve cuando el modelo a terminado de cargarse
     */
    load(model) {
        return new Promise((resolve, reject) => {
            let fbxLoader = new FBXLoader();
            fbxLoader.load(model.file,
                (object) => {
                    object.scale.set(0.06, 0.06, 0.06);
                    this.models[model.key] = object;
                    console.log("Loaded " + model.key);
                    resolve();
                });
        });
    }

    /**
     * Función que devuelve el array de modelos
     * @returns Array de modelos
     */
    getModels() {
        return this.models;
    }

    /**
     * Función que devuelve un modelo en concreto
     * @param {String} key modelo a pedir
     * @returns Modelo pedido
     */
    getOneModel(key) {
        return this.models[key];
    }

}



