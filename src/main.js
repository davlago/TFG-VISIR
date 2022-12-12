import { initSimulator } from './simulator.js';
import Models from './models.js';
import Textures from './textures.js';

let models = new Models();
let textures = new Textures();

models.loadModels().then(function () {
    textures.loadTextures();
    initSimulator(models, textures);
}); 
