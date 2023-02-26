/**
 * Clase de la comunidad
 */

import CommunityBorder from './communityBorder.js';
import User from './user.js';
import Entity from "../../engine/entities/entity";
import * as THREE from 'three';

export default class Community extends Entity {

    constructor(index, radius, data, pos, textureBase) {
        super();
        this.communityInfo = data;
        this.geometry = new THREE.CylinderGeometry(radius, radius, 17, 32);
        this.material = new THREE.MeshPhongMaterial({ map: textureBase, transparent: true, opacity: 0 });
        this.circle = new THREE.Mesh(this.geometry, this.material);
        this.circle.name = index;
        this.border = new CommunityBorder(index, radius)
        
        this.communityObject = new THREE.Group(); //Grupo de usuarios
        this.communityObject.name = "Community " + index;
        this.communityUsers = {};

        this.object = new THREE.Group(); //Comunidad, con grupo de usuarios, y la representación grafica
        this.object.add(this.communityObject);
        this.object.add(this.circle);
        this.object.add(this.border.get3DObject());

        this.setPosition(pos.x, pos.y, pos.z);
    }

    addUser(idUser, user){
        this.communityUsers[idUser] = user;
        this.communityObject.add(user.get3DObject());
    }

}