/**
 * Clase de la comunidad
 */

import CommunityBorder from './communityBorder.js';
import {clone} from '../utils/SkeletonUtils';
import User from './user.js';
import Entity from './entity.js';
import * as THREE from 'three';

export default class Community extends Entity{

    constructor(scene, index, radius, data, pos, models, textureBase) {
        super();
        this.scene = scene;
        this.modelManager = models;
        this.geometry = new THREE.CylinderGeometry( radius,radius,17, 32);
        this.material = new THREE.MeshPhongMaterial( { map:textureBase, transparent: true, opacity: 0} );
        this.circle = new THREE.Mesh( this.geometry, this.material );
        this.circle.name = index;
        this.border = new CommunityBorder(scene, index, radius)
        this.setPosition(pos.x, pos.y, pos.z);
        this.userList = [];
        this.communityObject = new THREE.Group();
        this.communityObject.name = "Community " + index; 

        //De momento hasta que se meta data
        this.createCommunity();
        this.addToScene();
    }

    createCommunity(){
       let userArray = [{model: "young"},{model: "adult"},{model: "elderly"},{model: "elderly"}];
       for(let i = 0; i < userArray.length; i++){
            let model = clone(this.modelManager.getOneModel(userArray[i].model));
            let user = new User(model, i);
            user.setPosition(i*10,0,i*10);
            this.userList.push(user);
            this.communityObject.add(user.get3DObject());
       }
    }

    addToScene(){
        this.scene.add(this.circle);
        this.scene.add(this.border.get3DObject());
        this.scene.add(this.communityObject);

    }

    setPosition(x, y, z) {
        this.circle.position.x = x;
        this.circle.position.y = y;
        this.circle.position.z = z;
        this.border.setPosition(this.circle.position.x, this.circle.position.y, this.circle.position.z);
    }

    selectCommunity(){
        this.circle.material.opacity = 1;
        this.userList.selectCommunity();
    }

    unselectCommunity(){
        this.circle.material.opacity = 0;
        this.userList.unselectCommunity();
    }

    getPosition(){
        let pos ={
            "x":this.circle.position.x,
            "y":this.circle.position.y,
            "z":this.circle.position.z
        }
        return pos;
    }

    getInfo(){
        return this.info;
    }

    get3DObject() {
        return this.circle;
    }

    drawBorder(){
        this.border.draw();
    }

}