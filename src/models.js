/**
 * Clase para cargar los modelos 3D de cada persona
 */

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

let young;
let adult;
let elderly;
export default class Models {

    constructor() {
        console.log(window.location.pathname);
    }

    loadModels() {
        return new Promise((resolve, reject) => {
            loadYoung().then(function () {
                loadAdult().then(function () {
                    loadElderly().then(function () {
                        resolve();
                    });
                });
            });

        });
    }

    getModelsArray() {
        return [young, adult, elderly]
    }
}

async function loadYoung() {
    return new Promise((resolve, reject) => {
        let fbxLoader = new FBXLoader();
        fbxLoader.load(
            '/models/young.fbx',
            (object) => {
                young = object;
                //young.scale.set(0.06, 0.06, 0.06);
                young.scale.set(0.2, 0.2, 0.2);
                console.log("Cargado young")
                resolve();
            });

    });

}

async function loadAdult() {
    return new Promise((resolve, reject) => {
        let fbxLoader = new FBXLoader();
        fbxLoader.load(
            '/models/adult.fbx',
            (object) => {
                adult = object;
                adult.scale.set(0.07, 0.07, 0.07);
                console.log("Cargado adult")
                resolve();
            });

    });
}

async function loadElderly() {
    return new Promise((resolve, reject) => {
        let fbxLoader = new FBXLoader();
        fbxLoader.load(
            '/models/elderly.fbx',
            (object) => {
                elderly = object;
                elderly.scale.set(0.06, 0.06, 0.06);
                console.log("Cargado elderly")
                resolve();
            });

    });
}

