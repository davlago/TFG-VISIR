import ModelsManager from './src/engine/loaders/modelManager';
import TextureManager from './src/engine/loaders/textureManager';
import DataManager from './src/simulator/loaders/dataManager';

import Simulator from './src/simulator/simulator';

const dataKey = "infoData";

const texturesKey = "textures";
const modelsKey = "models";


let dataManager = new DataManager();

let modelManager = new ModelsManager();
let textureManager = new TextureManager();
let simulator = new Simulator(dataManager.getData(dataKey));

modelManager.loadModels(dataManager.getData(modelsKey)).then(function () {
    textureManager.loadTextures(dataManager.getData(texturesKey)).then(function () {
        simulator.initSimulator(modelManager, textureManager);
    });
}); 
