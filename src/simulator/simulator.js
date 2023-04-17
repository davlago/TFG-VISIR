/**
 * Clase Simulator, tiene toda la información
 */
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
import CircleFocus from './entities/circleFocus';
import InputManager from './managers/inputManager';
import GUI from './GUI';


const roomSizeKey = "roomSize";
const generalCameraPositionKey = "cameraGeneralPosition";
const usersKey = "users";
const usersDetailsKey = "explicit_community";
const genderKey = "Gender";
const ageKey = "ageGroup";
const artKey = "RelationshipWithArt";




export default class Simulator extends GameEngine {

    constructor() {
        super();

        this.dataManager = new DataManager(simulatorMap);
        this.createSimulatorEntities = this.createSimulatorEntities.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.getSelected = this.getSelected.bind(this);
        this.goDown = this.goDown.bind(this);
        this.roomSize = simulatorMap[roomSizeKey];
        this.entitySelected;
        this.gui = new GUI(this.dataManager, this.scene, this.goDown);
    }

    postUpdates(deltaTime) {
        this.cameraManager.update(deltaTime);
    }

    createManagers() {
        this.cameraManager = new CameraManager(this.scene.getEntity("camera"), simulatorMap[generalCameraPositionKey], this.renderer);
        this.inputManager = new InputManager(this.scene.getCamera(), this.renderer, this.setSelected, this.getSelected);
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

        let light = new Light(0xffffff, 1);
        this.scene.add("light", light)

        //Crear la habitación
        let room = new Room(this.roomSize,
            this.texturesManager.getOneTexture("windowOpen"),
            this.texturesManager.getOneTexture("windowClose"),
            this.texturesManager.getOneTexture("wood")
        );
        this.scene.add("room", room)

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

            let community = new Community(key, radius, value, center, this.texturesManager.getOneTexture("loft"));
            community.setName(key)

            let coords = geometryUtils.generateGeomPos(numUsers, radius, simulatorMap.geometrical.coordAcom, simulatorMap.geometrical.coordCircle);
            for (let i = 0; i < numUsers; i++) {
                let userId = usersArray[i];
                let userInfo = this.dataManager.getUserById(userId);
                let userModel = userInfo.getDataByKey(usersDetailsKey);
                let model = this.getModel(userModel);
                let user = new User(userId, model, userInfo);
                user.setPosition(coords[i].x + center.x, 2.5, coords[i].z + center.z);
                user.setName(userId);
                community.addUser(userId, user);
                this.inputManager.addEntity(user);
            }

            this.communitiesArray.push(community);
            this.inputManager.addEntity(community);
            aux++;
        }
        this.scene.add("communities", this.communitiesArray);

    }

    getModel(userModel) {
        let gender = userModel[genderKey];
        let age = userModel[ageKey];
        try {
            let model = this.modelManager.getOneModel(age+"_"+gender);
            return clone(model);
        } catch (err) {
            console.log("Cant clone: " + age+"_"+gender);
            let model = this.modelManager.getOneModel("adult_Female");
            return clone(model);
        }

    }

    focusObj(entity, type) {
        let pos = entity.getPosition();
        this.scene.remove("circleFocus");
        let color;
        if (type === "Community") {
            color = entity.getInfo().getColor();
            this.scene.add("circleFocus", new CircleFocus(entity.getRadius() + 3, color, pos))
            this.cameraManager.focusObj(entity, 30);
        }
        else if (type === "User") {
            let comEntity = this.scene.getEntity(entity.getInfo().getDataByKey("community"));
            color = comEntity.getInfo().getColor();
            this.scene.add("circleFocus", new CircleFocus(comEntity.getRadius() + 3, color, comEntity.getPosition()))
            this.cameraManager.focusObj(entity, 30);
        }

    }


    setSelected(entity) {
        console.log(entity)
        this.entitySelected = entity;
        let type = entity.constructor.name;
        this.focusObj(entity, type);
        this.gui.changeBox(entity, type);
    }

    getSelected() {
        return this.entitySelected;
    }

    goDown(){
        this.entitySelected.goDown();
        this.entitySelected = undefined;
        this.scene.remove("circleFocus");
        this.cameraManager.noFocusObj(this.scene.getEntity("room"),50, 100);
    }

}