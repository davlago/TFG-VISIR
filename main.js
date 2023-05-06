import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import ModelManager from './src/engine/managers/modelManager';
import TextureManager from './src/engine/managers/textureManager';
import * as texturesModelsData from './assets/data/texturesModelsData.json';

import Simulator from './src/simulator/simulator';

const texturesKey = "textures";
const modelsKey = "models";

let modelManager = new ModelManager();
let textureManager = new TextureManager();
let simulator = new Simulator();

let promises = [
    modelManager.loadModels(texturesModelsData[modelsKey]),
    textureManager.loadTextures(texturesModelsData[texturesKey])
]

Promise.all(promises).then(function () {
    simulator.initSimulator(modelManager, textureManager);
});
