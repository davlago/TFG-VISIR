/**
 * Clase Simulator, tiene toda la información
 */
import Room from './entities/room';
import Community from './entities/community';
import PolygonDist from '../utils/polygonDist';
import GameEngine from '../engine/gameEngine';
import Light from './entities/light';


const roomSizeKey = "roomSize";


export default class Simulator extends GameEngine {

    constructor(data) {
        super(data);
        this.roomX = this.data[roomSizeKey].coordX;
        this.roomY = this.data[roomSizeKey].coordY;
        this.roomZ = this.data[roomSizeKey].coordZ;

        this.lightPosition = [
            { x: - this.roomX / 3, y: this.roomY / 2, z: + this.roomZ / 3 },
            { x: + this.roomX / 3, y: this.roomY / 2, z: + this.roomZ / 3 },
            { x: - this.roomX / 3, y: this.roomY / 2, z: - this.roomZ / 3 },
            { x: + this.roomX / 3, y: this.roomY / 2, z: - this.roomZ / 3 }]

    }

    createMyEntities() {

        this.entities["light"] = [];

        //Crear las 4 luces de la habitación
        for (let i = 0; i < 4; i++) {
            let light = new Light(0xffffff, 1, 250);
            let pos = this.lightPosition[i];
            light.setPosition(pos.x, pos.y, pos.z);
            this.entities["light"].push(light);
        }

        //Crear la habitación
        this.entities["room"] = new Room(this.data[roomSizeKey],
            this.texturesManager.getOneTexture("windowOpen"),
            this.texturesManager.getOneTexture("windowClose"),
            this.texturesManager.getOneTexture("wood")
        );


        //Crear comunidades de forma auxiliar
        this.entities["communities"] = [];
        this.polygonDist = new PolygonDist();
        let vertexArray = this.polygonDist.generatePolygon(5, this.roomX / 2.8);
        for (let i = 0; i < vertexArray.length - 1; i++) {
            let community = new Community(0, 20, null, vertexArray[i], this.modelsManager, this.texturesManager.getOneTexture("wood"));
            this.entities["communities"].push(community)
        }
    }

}
