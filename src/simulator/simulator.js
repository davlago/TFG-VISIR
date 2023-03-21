/**
 * Clase Simulator, tiene toda la información
 */
import * as THREE from 'three';

import Room from './entities/room';
import Community from './entities/community';
import GameEngine from '../engine/gameEngine';
import Light from '../engine/entities/light';
import DataManager from './managers/dataManager';
import CameraManager from './managers/cameraManager';

import * as simulatorMap from '../../assets/data/simulatorMap.json';
import User from './entities/user';

import { clone } from '../utils/SkeletonUtils';

import * as geometryUtils from "../utils/geometryUtils";
import InputManager from './managers/inputManager';



const roomSizeKey = "roomSize";
const lightPositionKey = "lightPosition";
const generalCameraPositionKey = "cameraGeneralPosition";
const usersKey = "users";
const usersDetailsKey = "explicit_community";
const genderKey = "Gender";
const artKey = "RelationshipWithArt";




export default class Simulator extends GameEngine {

    constructor() {
        super();

        this.dataManager = new DataManager();
        this.roomSize = simulatorMap[roomSizeKey];

    }

    onDocumentMouseUp(event, that,commClick){
        event.preventDefault();
        that.mouse.x = ( event.clientX / that.renderer.domElement.clientWidth ) * 2 - 1;
        that.mouse.y = - ( event.clientY / that.renderer.domElement.clientHeight ) * 2 + 1;
        that.raycaster.setFromCamera( that.mouse, that.entities["camera"].get3DObject() );

        //PROVISIONAL
        let intersects = that.raycaster.intersectObjects(commClick);
        if(intersects.length > 0){
            let selectObject = intersects[0].object;
            console.log(selectObject);
            that.cameraManager.setPosition(selectObject.name)
            that.cameraManager.focusObj(selectObject);
        }

    }

    postUpdates(deltaTime){
        this.cameraManager.update();
    }

    createManagers(){
        this.cameraManager = new CameraManager(this.entities["camera"], simulatorMap[generalCameraPositionKey], this.renderer);
        this.inputManager = new InputManager(this.entities["camera"], this.renderer);
    }

    createMyEntities() {
        return new Promise((resolve, reject) => {

            const that = this;
            this.dataManager.loadData().then(() => {


                that.entities["light"] = [];

                //Crear las 4 luces de la habitación
                for (let i = 0; i < 4; i++) {
                    let light = new Light(0xffffff, 1, 250);
                    let pos = simulatorMap[lightPositionKey][i];
                    light.setPosition(pos.x, pos.y, pos.z);
                    that.entities["light"].push(light);
                }

                //Crear la habitación
                that.entities["room"] = new Room(that.roomSize,
                    that.texturesManager.getOneTexture("windowOpen"),
                    that.texturesManager.getOneTexture("windowClose"),
                    that.texturesManager.getOneTexture("wood")
                );

                this.cameraManager.focusObj(this.entities["room"].get3DObject());

                that.entities["communities"] = [];

                let communities = that.dataManager.getCommunities();
                let numCommunities = Object.keys(communities).length;
                let vertexArray = geometryUtils.generatePolygon(numCommunities, that.roomSize.coordX / 2.8);

                let aux = 0;
                for (const [key, value] of Object.entries(communities)) {

                    let usersArray = value.getDataByKey(usersKey);
                    let numUsers = usersArray.length;

                    let radius = geometryUtils.generateRadius(numUsers, simulatorMap.geometrical.coordAcom);
                    let center = vertexArray[aux];

                    let community = new Community(key, radius, value, center, that.texturesManager.getOneTexture("wood"));
                    community.setName(key)

                    let coords = geometryUtils.generateGeomPos(numUsers, radius, simulatorMap.geometrical.coordAcom, simulatorMap.geometrical.coordCircle);
                    for (let i = 0; i < numUsers; i++) {
                        let userId = usersArray[i];
                        let userInfo = that.dataManager.getUserById(userId);
                        let userModel = userInfo.getDataByKey(usersDetailsKey);
                        let model = that.getModel(userModel);
                        let user = new User(userId, model, userInfo);
                        user.setPosition(coords[i].x, 0, coords[i].z);
                        //user.name = userId;
                        user.setName(userId);
                        console.log(user.name);
                        community.addUser(userId, user);
                        this.inputManager.addEntity(user);
                    }

                    that.entities["communities"].push(community);
                    this.inputManager.addEntity(community);
                    aux++;
                }
                resolve();
            });
        });
    }

    getModel(userModel) {
        let gender = userModel[genderKey];
        try{
            let model = this.modelManager.getOneModel(gender);
            return clone(model);
        }catch(err){
            console.log("Cant clone: "+ gender);
            let model = this.modelManager.getOneModel("Not specified");
            return clone(model);
        }
       
    }
}

