import { initSimulator } from './simulator.js';
import Models from './models.js';

let models = new Models();

models.loadModels().then(function () {
    initSimulator();
}); 
