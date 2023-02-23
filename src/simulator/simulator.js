/**
 * Clase Simulator, tiene toda la información
 */
import Room from './entities/room';
import Community from './entities/community';
import PolygonDist from '../utils/polygonDist';
import GameEngine from '../engine/gameEngine';


const roomSizeKey = "roomSize";

export default class Simulator extends GameEngine{

    constructor(data) {
        super(data);
    }

    createMyEntities(){
        this.entities["room"] = new Room(this.data[roomSizeKey],
            this.texturesManager.getOneTexture("windowOpen"),
            this.texturesManager.getOneTexture("windowClose"),
            this.texturesManager.getOneTexture("wood")
        );

        this.entities["communities"] = [];
        this.polygonDist = new PolygonDist();
        let vertexArray = this.polygonDist.generatePolygon(5, this.data[roomSizeKey].coordX/2.8);
        console.log(vertexArray)   
        for(let i = 0; i < vertexArray.length-1; i++){
            let community = new Community(0, 20, null, vertexArray[i] ,this.modelsManager , this.texturesManager.getOneTexture("wood"));
            this.entities["communities"].push(community)
        }
    }

}
