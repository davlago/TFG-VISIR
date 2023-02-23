import ModelsManager from './src/engine/loaders/modelManager';
import TextureManager from './src/engine/loaders/textureManager';
import DataManager from './src/simulator/loaders/dataManager';

import GameEngine from './src/engine/gameEngine';

const modelsKey = "models";
const dataKey = "infoData";
const texturesKey = "textures";

let dataManager = new DataManager();

let modelManager = new ModelsManager();
let textureManager = new TextureManager();
let simulator = new GameEngine(dataManager.getData(dataKey));

modelManager.loadModels(dataManager.getData(modelsKey)).then(function () {
    textureManager.loadTextures(dataManager.getData(texturesKey)).then(function () {
        simulator.initSimulator(modelManager, textureManager);
    });
}); 
