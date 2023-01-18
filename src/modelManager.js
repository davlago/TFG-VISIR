/**
 * Clase para cargar los modelos 3D de cada persona
 */

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';


export default class ModelManager {

    constructor() {
        this.models={};
    }

    loadModels(modelsInfoArray) {
        return new Promise((resolve, reject) => {
            let promises=[];
            for (let i in modelsInfoArray) {
                promises.push(this.load(modelsInfoArray[i]))
            }

            Promise.all(promises).then(function(){
                console.log("All models loaded");
                resolve();
            });


        });
    }



    load(model){
        return new Promise((resolve, reject) => {
            let fbxLoader = new FBXLoader();
            fbxLoader.load(model.file,
                (object) => {
                    object.scale.set(0.06, 0.06, 0.06);
                    this.models[model.key]=object;
                    console.log("Loaded "+model.key);
                    resolve();
                });
        });
    }

    getModels(){
        return this.models;
    }
    
}



