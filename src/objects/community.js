/**
 * Clase de la comunidad
 */

import CommunityBorder from './communityBorder.js';
import { clone } from '../utils/SkeletonUtils';
import User from './user.js';
import Entity from './entity.js';
import * as THREE from 'three';

export default class Community extends Entity {

    constructor(scene, index, radius, data, pos, models, textureBase) {
        super();
        this.scene = scene;
        this.modelManager = models;
        this.geometry = new THREE.CylinderGeometry(radius, radius, 17, 32);
        this.material = new THREE.MeshPhongMaterial({ map: textureBase, transparent: true, opacity: 0 });
        this.circle = new THREE.Mesh(this.geometry, this.material);
        this.circle.name = index;
        this.border = new CommunityBorder(scene, index, radius)
        this.setPosition(pos.x, pos.y, pos.z);
        this.userList = [];
        this.communityObject = new THREE.Group();
        this.communityObject.name = "Community " + index;

        //De momento hasta que se meta data
        let userArray = [{ model: "young" }, { model: "adult" }, { model: "elderly" }, { model: "elderly" }];

        this.createCommunity(userArray);
        this.addToScene();
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
            user.setPosition(i * 10, 0, i * 10);
            this.userList.push(user);
            this.communityObject.add(user.get3DObject());
        }
    }

    /**
     * Añade la comunidad completa junto a sus elementos auxiliares a la escena
     */
    addToScene() {
        this.scene.add(this.circle);
        this.scene.add(this.border.get3DObject());
        this.scene.add(this.communityObject);

    }

    /**
     * Función para establecer la posición de la comunidad
     * @param {Number} x 
     * @param {Number} y Altura
     * @param {Number} z 
     */
    setPosition(x, y, z) {
        this.circle.position.x = x;
        this.circle.position.y = y;
        this.circle.position.z = z;
        this.border.setPosition(this.circle.position.x, this.circle.position.y, this.circle.position.z);
    }

    /**
     * Función que se llama cuando se selecciona una comunidad
     */
    selectCommunity() {
        this.circle.material.opacity = 1;
        this.userList.selectCommunity();
    }

    /**
     * Función que se llama cuando se deja de seleccionar una comunidad
     */
    unselectCommunity() {
        this.circle.material.opacity = 0;
        this.userList.unselectCommunity();
    }

    /**
     * Función que devuelve las coordenadas exactas de la comunidad
     * @returns Object con las tres coordenadas
     */
    getPosition() {
        let pos = {
            "x": this.circle.position.x,
            "y": this.circle.position.y,
            "z": this.circle.position.z
        }
        return pos;
    }

}