/**
 * Clase de la comunidad
 */

import CommunityBorder from './communityBorder.js';
import { clone } from '../../utils/SkeletonUtils';
import User from './user.js';
import Entity from "../../engine/entities/entity";
import * as THREE from 'three';

export default class Community extends Entity {

    constructor(index, radius, data, pos, models, textureBase) {
        super();
        this.modelManager = models;
        this.geometry = new THREE.CylinderGeometry(radius, radius, 17, 32);
        this.material = new THREE.MeshPhongMaterial({ map: textureBase, transparent: true, opacity: 0 });
        this.circle = new THREE.Mesh(this.geometry, this.material);
        this.circle.name = index;
        this.border = new CommunityBorder(index, radius)
        
        console.log(pos);


        this.communityObject = new THREE.Group(); //Grupo de usuarios
        this.communityObject.name = "Community " + index;

        this.object = new THREE.Group(); //Comunidad, con grupo de usuarios, y la representación grafica
        this.object.add(this.communityObject);
        this.object.add(this.circle);
        this.object.add(this.border.get3DObject());

        this.setPosition(pos.x, pos.y, pos.z);

        //De momento hasta que se meta data
        let userArray = [{ model: "young" }, { model: "adult" }, { model: "elderly" }];

        this.createCommunity(userArray);
    }

    /**
     * Función que crea la comunidad y coloca cada usuario en su lugar
     * @param {Array} userArray Array de usuarios
     */
    createCommunity(userArray) {
        for (let i = 0; i < userArray.length; i++) {
            let model = clone(this.modelManager.getOneModel(userArray[i].model));
            let user = new User(model, i);

            //TODO función que genere la posición de cada usuario para ir pasandosela
            //De momento a mano
            let pos = this.getPosition();
            user.setPosition(i*10, 0, i*10);
            this.communityObject.add(user.get3DObject());
        }
    }

}