import Simulator from './simulator.js';
import Models from './models.js';

let models = new Models();

let simulator = new Simulator();

models.loadModels().then(function(){
    simulator.init();
}); 
