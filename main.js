import ModelsManager from './src/loaders/modelManager';
import TextureManager from './src/loaders/textureManager';
import Simulator from './src/engine/Simulator.js';
import * as data from './assets/data/data.json'; //READ JSON

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
