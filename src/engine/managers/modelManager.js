/**
 * Clase para cargar los modelos 3D de cada persona
 */

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';



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
                if (modelsInfoArray[i].format === "3mf") {
                    promises.push(this.load3mf(modelsInfoArray[i]))
                }
                else if (modelsInfoArray[i].format === "fbx") {
                    promises.push(this.loadFbx(modelsInfoArray[i]))
                }
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
    load3mf(model) {

        return new Promise((resolve, reject) => {

            let threeMFLoader = new ThreeMFLoader();
            try {
                threeMFLoader.load(model.file,
                    (object) => {
                        this.models[model.key] = object;
                        console.log("Loaded ",object);
                        resolve();
                    });
            } catch (err) {
                console.log("Error in load model ",model.key)
            }
        });

    };

    /**
    * Función que realiza la carga y la escala del modelo y lo va guardando en el this.models, que es nuestro array de modelos
    * @param {Object} model Objeto con la información necesaria para cargar el modelo
    * @returns devuelve una promesa que se resuelve cuando el modelo a terminado de cargarse
    */
    loadFbx(model) {
        return new Promise((resolve, reject) => {
            let fBXLoader = new FBXLoader();
            try {

                fBXLoader.load(model.file,
                    (object) => {
                        this.models[model.key] = object;
                        console.log("Loaded ",object);
                        resolve();
                    });
            } catch (err) {
                console.log("Error in load model ",model.key)
            }
        });


    };



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



