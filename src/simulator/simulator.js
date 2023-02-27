/**
 * Clase Simulator, tiene toda la información
 */
import Room from './entities/room';
import Community from './entities/community';
import GameEngine from '../engine/gameEngine';
import Light from './entities/light';
import DataManager from './managers/dataManager';
import CameraManager from './managers/cameraManager';

import * as simulatorData from '../../assets/data/simulatorData.json';
import User from './entities/user';

import { clone } from '../utils/SkeletonUtils';

import * as geometryUtils from "../utils/geometryUtils";



const roomSizeKey = "roomSize";
const generalCameraPositionKey = "cameraGeneralPosition";
const usersKey = "users";
const usersDetailsKey = "explicit_community";
const ageKey = "ageGroup";
const langKey = "language";


export default class Simulator extends GameEngine {

    constructor() {
        super();

        this.dataManager = new DataManager();
        this.roomSize = simulatorData[roomSizeKey];
        let lightPosition = { x: this.roomSize.coordX / 3, y: this.roomSize.coordY / 2, z: this.roomSize.coordZ / 3 }

        this.lightsPosition = [
            { x: - lightPosition.x, y: lightPosition.y, z: + lightPosition.z },
            { x: + lightPosition.x, y: lightPosition.y, z: + lightPosition.z },
            { x: - lightPosition.x, y: lightPosition.y, z: - lightPosition.z },
            { x: + lightPosition.x, y: lightPosition.y, z: - lightPosition.z }
        ]

    }

    createManagers(){
        this.cameraManager = new CameraManager(this.entities["camera"], simulatorData[generalCameraPositionKey]);
        this.cameraManager.focusObj(this.entities["room"]);
    }

    createMyEntities() {
        return new Promise((resolve, reject) => {

            const that = this;
            this.dataManager.loadData().then(() => {


                that.entities["light"] = [];

                //Crear las 4 luces de la habitación
                for (let i = 0; i < 4; i++) {
                    let light = new Light(0xffffff, 1, 250);
                    let pos = that.lightsPosition[i];
                    light.setPosition(pos.x, pos.y, pos.z);
                    that.entities["light"].push(light);
                }

                //Crear la habitación
                that.entities["room"] = new Room(that.roomSize,
                    that.texturesManager.getOneTexture("windowOpen"),
                    that.texturesManager.getOneTexture("windowClose"),
                    that.texturesManager.getOneTexture("wood")
                );



                that.entities["communities"] = [];

                let communities = that.dataManager.getCommunities();
                let numCommunities = Object.keys(communities).length;
                let vertexArray = geometryUtils.generatePolygon(numCommunities, that.roomSize.coordX / 2.8);

                let aux = 0;
                for (const [key, value] of Object.entries(communities)) {

                    let usersArray = value.getDataByKey(usersKey);
                    let numUsers = usersArray.length;

                    let radius = geometryUtils.generateRadius(numUsers, simulatorData.geometrical.coordAcom);
                    let center = vertexArray[aux];

                    let community = new Community(key, radius, value, center, that.texturesManager.getOneTexture("wood"));

                    let coords = geometryUtils.generateGeomPos(numUsers, radius, simulatorData.geometrical.coordAcom, simulatorData.geometrical.coordCircle);
                    for (let i = 0; i < numUsers; i++) {
                        let userId = usersArray[i];
                        let userInfo = that.dataManager.getUserById(userId);
                        let userModel = userInfo.getDataByKey(usersDetailsKey);
                        let model = that.getModel(userModel);
                        let user = new User(userId, model, userInfo);
                        user.setPosition(coords[i].x, 0, coords[i].z);
                        community.addUser(userId, user);
                    }

                    that.entities["communities"].push(community)
                    aux++;
                }
                resolve();
            });
        });
    }

    getModel(userModel) {
        let age = userModel[ageKey];
        if (age === undefined || age === "") {
            age = "young";
        }
        let model = this.modelManager.getOneModel(age);
        return clone(model);
    }
}

