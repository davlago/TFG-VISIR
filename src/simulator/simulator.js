/**
 * Clase Simulator, tiene toda la información
 */
import Room from './entities/room';
import Community from './entities/community';
import GameEngine from '../engine/gameEngine';
import DataManager from './managers/dataManager';
import * as levelData from '../../assets/data/GAM_DATA.json'
import * as simulatorMap from '../../assets/data/simulatorMap.json';
import User from './entities/user';

import { clone } from '../utils/SkeletonUtils';

import * as geometryUtils from "../utils/geometryUtils";
import { flag } from "../utils/geometryObjects";
import CircleFocus from './entities/circleFocus';
import GUI from './GUI';
import SimulatorObserver from './observers/simulatorObserver';


const roomSizeKey = "roomSize";
const generalCameraPositionKey = "cameraGeneralPosition";
const usersKey = "users";
const usersDetailsKey = "explicit_community";




export default class Simulator extends GameEngine {

    constructor() {
        super();
        this.observer = new SimulatorObserver(this);
        this.dataManager = new DataManager(simulatorMap);
        this.createSimulatorEntities = this.createSimulatorEntities.bind(this);
        this.postCreateManagers = this.postCreateManagers.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.goDown = this.goDown.bind(this);
        this.filter = this.filter.bind(this);
        this.roomSize = simulatorMap[roomSizeKey];
        this.entitySelected;
        this.gui = new GUI(this.dataManager, this.scene, this.goDown, this.filter);
    }


    postUpdates(deltaTime) {
        this.cameraManager.update(deltaTime);
        this.animationManager.update(deltaTime);
    }

    postCreateManagers() {
        this.inputManager.addObserver(this.observer);
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
        let vertexArray = geometryUtils.generatePolygon(numCommunities, this.roomSize.coordX * (0.5 - 1 / numCommunities));
        // (this.roomSize.coordX /2) -(200/numCommunities));
        let aux = 0;
        for (const [key, value] of Object.entries(communities)) {

            let usersArray = value.getDataByKey(usersKey);
            let numUsers = usersArray.length;

            let radius = geometryUtils.generateRadius(numUsers, simulatorMap.geometrical.coordAcom);
            let center = vertexArray[aux];
            let texture = this.texturesManager.getOneTexture("loft");
            if (value.getDataByKey("community-type") === "inexistent") {
                texture = null
            }
            let community = new Community(key, radius, value, center, texture);

            let coords = geometryUtils.generateGeomPos(numUsers, radius, simulatorMap.geometrical.coordAcom, simulatorMap.geometrical.coordCircle);
            for (let i = 0; i < numUsers; i++) {
                let userId = usersArray[i];
                let userInfo = this.dataManager.getUserById(userId);
                let userModel = userInfo.getDataByKey(usersDetailsKey);
                let flagLan = this.getBillboard(userModel[levelData.keys.atributeB.key])
                flagLan.name = userId;
                flagLan.type = "Flag";
                let model = this.getModel(userModel);
                model.add(flagLan);
                let user = new User(userId, model, userInfo);
                user.setPosition(coords[i].x + center.x, 2.5, coords[i].z + center.z);
                community.addUser(userId, user);
                this.inputManager.addEntity(user);
                this.animationManager.animateEntity(user)
            }

            this.communitiesArray.push(community);
            this.inputManager.addEntity(community);
            aux++;
        }
        this.scene.add("communities", this.communitiesArray);

    }

    getBillboard(atribute) {
        try {
            let billboard = new flag(this.texturesManager.getOneTexture(atribute));
            return clone(billboard);
        } catch (err) {
            console.log("Cant clone: " + atribute);
            let billboard = this.texturesManager.getOneTexture("WHITE");
            return clone(billboard);
        }
    }

    getModel(userModel) {
        let atribute2 = userModel[levelData.keys.atribute2.key];
        let atribute1 = userModel[levelData.keys.atribute1.key];
        try {
            let model = this.modelManager.getOneModel(atribute1 + "_" + atribute2);
            let modelClone = clone(model);
            modelClone.animations = model.animations;
            return modelClone;
        } catch (err) {
            console.log("Cant clone: " + atribute1 + "_" + atribute2);
            let model = this.modelManager.getOneModel(atribute1 + "_" + atribute2);
            let modelClone = clone(model);
            modelClone.animations = model.animations;
            return modelClone;
        }

    }

    focusObj(entity) {
        let pos = entity.getPosition();
        this.scene.remove("circleFocus");
        let color;
        if (entity.getType() === "community") {
            color = entity.getInfo().getColor();
            this.scene.add("circleFocus", new CircleFocus(entity.getRadius() + 3, color, pos))
            this.cameraManager.focusObj(entity, 30);
        }
        else if (entity.getType() === "user") {
            let comEntity = this.scene.getEntity(entity.getInfo().getDataByKey("community"));
            color = comEntity.getInfo().getColor();
            this.scene.add("circleFocus", new CircleFocus(comEntity.getRadius() + 3, color, comEntity.getPosition()))
            this.cameraManager.focusObj(entity, 30);
        }

    }


    setSelected(selectObject) {
        while (selectObject.name === "") {
            selectObject = selectObject.parent;
        }
        if (selectObject.type === "SkinnedMesh") {
            selectObject = selectObject.parent;
        }
        let name = selectObject.name;
        if (selectObject.type === "Flag") {
            name = selectObject.name
        }
        let myEntity = this.scene.getEntity(name);
        if (myEntity.getCanClicked()) {
            if (this.entitySelected !== undefined) {
                let entitySelectedName = this.entitySelected.getName()
                if (selectObject.name !== entitySelectedName) {
                    this.scene.getEntity(entitySelectedName).goDown();
                    myEntity.setClicked();
                    this.entitySelected = myEntity;
                    this.focusObj(this.entitySelected);
                    console.log(myEntity)
                    this.gui.setInfo(myEntity);
                }
            }
            else {
                myEntity.setClicked();
                this.entitySelected = myEntity;
                this.focusObj(this.entitySelected);
                this.gui.setInfo(myEntity);
            }
        }

    }

    goDown() {
        if (this.entitySelected !== undefined) {
            this.entitySelected.goDown();
            this.entitySelected = undefined;
            this.scene.remove("circleFocus");
            this.cameraManager.noFocusObj(this.scene.getEntity("room"), simulatorMap[generalCameraPositionKey]);
        }
    }

    filter(arrayFilter) {
        console.log(arrayFilter);
        let usersInfo = this.dataManager.getUsers();
        let atribute1, atribute2, atributeB;
        for (let [userName, user] of Object.entries(usersInfo)) {
            const entity = this.scene.getEntity(userName);
            if (entity !== undefined) {
                atribute1 = user.getDataByKey("explicit_community")[levelData.keys.atribute1.key];
                atribute2 = user.getDataByKey("explicit_community")[levelData.keys.atribute2.key];
                atributeB = user.getDataByKey("explicit_community")[levelData.keys.atributeB.key];
                if (arrayFilter.includes(atribute1) && arrayFilter.includes(atribute2) && arrayFilter.includes(atributeB)) {
                    entity.setCanCliked(true);
                    entity.setOpacity(1);
                }
                else {
                    this.gui.infoClose()
                    entity.setCanCliked(false);
                    entity.setOpacity(0.3);
                }
            }
        }
    }

}