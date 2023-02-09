import ModelsManager from './src/loaders/modelManager';
import TextureManager from './src/loaders/textureManager';
import DataManager from './src/loaders/DataManager';

import Simulator from './src/engine/Simulator.js';

const modelsKey = "models";
const dataKey = "infoData";
const texturesKey = "textures";

let dataManager = new DataManager();

let modelManager = new ModelsManager();
let textureManager = new TextureManager();
let simulator = new Simulator(dataManager.getData(dataKey));

modelManager.loadModels(dataManager.getData(modelsKey)).then(function () {
    textureManager.loadTextures(dataManager.getData(texturesKey)).then(function () {
        simulator.initSimulator(modelManager, textureManager);
    });
}); 
