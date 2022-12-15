import Models from './models.js';
import Textures from './textures.js';
import Simulator from './Simulator.js';

let models = new Models();
let textures = new Textures();
let simulator = new Simulator();

models.loadModels().then(function () {
    textures.loadTextures();
    simulator.initSimulator(models, textures);
}); 
