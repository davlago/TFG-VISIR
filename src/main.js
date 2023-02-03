import ModelsManager from './modelManager';
import TextureManager from './textureManager';
import Simulator from './Simulator.js';
import * as data from './data.json'; //READ JSON

const modelsKey = "models";
const dataKey = "infoData";
const texturesKey = "textures";

let modelManager = new ModelsManager();
let textureManager = new TextureManager();
let simulator = new Simulator(data[dataKey]);

modelManager.loadModels(data[modelsKey]).then(function () {
    textureManager.loadTextures(data[texturesKey]).then(function () {
        simulator.initSimulator(modelManager, textureManager);
    });
}); 
