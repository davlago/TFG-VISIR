/**
 * Clase para tener las luces generales de la habitación
 */


import * as THREE from "three";

export default class Scene {
    constructor(  ){
        this.scene = new THREE.Scene();
        this.entities ={};
    }

    add(name, entity){
        if(Array.isArray(entity)){
            for(let e of entity){
                this.scene.add(e.get3DObject());
                this.entities[e.name] = e;
                if(e.hasChildren()){
                    let childrens = e.getChildrenEntities();
                    for (let [entityName, entity] of Object.entries(childrens)) {
                        this.scene.add(entity.get3DObject())
                        this.entities[entityName] = entity;
                    }
                }
            }
        }
        else{
            this.scene.add(entity.get3DObject());
            this.entities[name] = entity;
        }
    }

    update(deltaTimeSec){
        for (let [entityName, entity] of Object.entries(this.entities)) {
            if(Array.isArray(entity)){
                for(let e of entity){
                    e.update(deltaTimeSec);   
                }
            }
            else{
                entity.update(deltaTimeSec);
            }
        }
    }

    focusObj(entity){
        this.entities["lightFocus"].setConfLight(0xff2222, 2, 50);
        let pos = entity.getPosition();
        this.entities["lightFocus"].setPosition(pos.x, 10, pos.z);
        console.log("pongo la luz en ", entity.getPosition())
    }

    getCamera(){
        return this.entities.camera.get3DObject();
    }

    getEntity(key){
        return this.entities[key];
    }

    get3DObject(){
        return this.scene;
    }

}
