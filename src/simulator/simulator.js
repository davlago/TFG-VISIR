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
        this.createSimulatorEntities = this.createSimulatorEntities.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.getSelected = this.getSelected.bind(this);
        this.roomSize = simulatorMap[roomSizeKey];
        this.entitySelected;

    }

    postUpdates(deltaTime) {
        this.cameraManager.update();
    }

    createManagers() {
        this.cameraManager = new CameraManager(this.scene.getEntity("camera"), simulatorMap[generalCameraPositionKey], this.renderer);
        this.inputManager = new InputManager(this.scene.getCamera(), this.renderer, this.setSelected, this.getSelected);
    }

    setSelected(entity) {
        this.entitySelected = entity;
        this.cameraManager.focusObj(entity);
        this.scene.focusObj(entity);
        let type = entity.constructor.name;
        this.changeBox(entity, type);
    }

    changeBox(entity, type) {
        let info = null;
        if (type === "User") {
            info = this.dataManager.getUserById(entity.getName()).getData();
        }
        else if (type === "Community") {
            info = this.dataManager.getCommunityById(entity.getName()).getData();
        }
        document.getElementById("info-box").className = "info expand";
        document.getElementById("community-title").className = "myShow";
        document.getElementById("community-title").innerHTML = info.label || info.name;

        document.getElementById("community-type-row").className = "data row myShow";
        document.getElementById("community-type").innerHTML = type;

        document.getElementById("icross").className = "smalliIcon hide";
        document.getElementById("xcross").className = "smallXIcon myShow";
    }

    getSelected() {
        return this.entitySelected;
    }



    createMyEntities() {
        return new Promise((resolve, reject) => {
            this.dataManager.loadData().then(() => {
                this.createSimulatorEntities();
                resolve();
            });
        });
    }

    createSimulatorEntities() {
        let lightArray = [];

        //Crear las 4 luces de la habitación
        for (let i = 0; i < 4; i++) {
            let light = new Light(0xffffff, 1, 250);
            let pos = simulatorMap[lightPositionKey][i];
            light.setPosition(pos.x, pos.y, pos.z);
            lightArray.push(light);
        }
        this.scene.add("light", lightArray)

        //Crear la habitación
        let room = new Room(this.roomSize,
            this.texturesManager.getOneTexture("windowOpen"),
            this.texturesManager.getOneTexture("windowClose"),
            this.texturesManager.getOneTexture("wood")
        );
        this.scene.add("room", room)


        this.cameraManager.focusObj(this.scene.getEntity("room"));

        this.communitiesArray = [];

        let communities = this.dataManager.getCommunities();
        let numCommunities = Object.keys(communities).length;
        let vertexArray = geometryUtils.generatePolygon(numCommunities, this.roomSize.coordX / 2.8);

        let aux = 0;
        for (const [key, value] of Object.entries(communities)) {

            let usersArray = value.getDataByKey(usersKey);
            let numUsers = usersArray.length;

            let radius = geometryUtils.generateRadius(numUsers, simulatorMap.geometrical.coordAcom);
            let center = vertexArray[aux];

            let community = new Community(key, radius, value, center, this.texturesManager.getOneTexture("wood"));
            community.setName(key)

            let coords = geometryUtils.generateGeomPos(numUsers, radius, simulatorMap.geometrical.coordAcom, simulatorMap.geometrical.coordCircle);
            for (let i = 0; i < numUsers; i++) {
                let userId = usersArray[i];
                let userInfo = this.dataManager.getUserById(userId);
                let userModel = userInfo.getDataByKey(usersDetailsKey);
                let model = this.getModel(userModel);
                let user = new User(userId, model, userInfo);
                user.setPosition(coords[i].x + center.x, 2, coords[i].z + center.z);
                user.setName(userId);
                community.addUser(userId, user);
                this.inputManager.addEntity(user);
                //this.scene.add(userId, user);
            }

            this.communitiesArray.push(community);
            this.inputManager.addEntity(community);
            aux++;
        }
        this.scene.add("communities", this.communitiesArray);
        let lightFocus = new Light(0xffffff, 0, 250);
        this.scene.add("lightFocus", lightFocus);

    }

    getModel(userModel) {
        let gender = userModel[genderKey];
        try {
            let model = this.modelManager.getOneModel(gender);
            return clone(model);
        } catch (err) {
            console.log("Cant clone: " + gender);
            let model = this.modelManager.getOneModel("Not specified");
            return clone(model);
        }

    }
}
document.getElementById("xcross").addEventListener('mouseup', () => {
    document.getElementById("info-box").className = "info retract";
    document.getElementById("icross").className = "smalliIcon myShow"
    document.getElementById("xcross").className = "smallXIcon hide";
    document.getElementById("community-title").className = "hide";
    document.getElementById("community-type-row").className = "data row hide";
});