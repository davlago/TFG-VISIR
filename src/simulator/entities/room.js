/**
 * Clase de la habitación principal
 */

import Entity from "../../engine/entities/entity";
import * as THREE from 'three';

 export default class Room extends Entity{

    constructor(roomSize, textureWallOpen, textureWallClose, textureFloor){
        super();
        this.cubeMaterialArray = [];
        this.setTextures(textureWallOpen,textureWallClose, textureFloor);
        this.mesh = new THREE.Mesh( this.geometry, this.cubeMaterialArray);
        this.mesh.name = "Room";
        this.setSize(roomSize.coordX*1.25,roomSize.coordY,roomSize.coordZ*1.25);
        this.setPosition(0,roomSize.coordY/2,0);

    }

    /**
     * Establece el tamaño de la habitación
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z
     */
    setSize(x,y,z){
        this.mesh.geometry = new THREE.BoxGeometry( x, y, z );
    }

    /**
     * Establece las testuras de las diferentes lugares de la habitación
     * @param {texture} textureWallOpen 
     * @param {texture} textureWallClose 
     * @param {texture} textureFloor 
     */

    setTextures(textureWallOpen,textureWallClose, textureFloor){
        /*Order:
            Walls: 1,2,5,6
            Ceiling and floor: 3,4 
        */

        this.cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: textureWallClose, transparent: false,side: THREE.BackSide} ) );
        this.cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: textureWallClose, transparent: false,side: THREE.BackSide } ) );
        this.cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: textureFloor, transparent: false,side: THREE.BackSide } ) );
        this.cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: textureFloor, transparent: false,side: THREE.BackSide } ) );
        this.cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: textureWallOpen, transparent: false,side: THREE.BackSide } ) );
        this.cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: textureWallOpen, transparent: false,side: THREE.BackSide } ) );
    }

    /** Establecer posición de la habitación
    * @param {*} x 
    * @param {*} y altura
    * @param {*} z 
    */
    setPosition(x,y,z){
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
    }

    /**
     * Devuelve el Objecto3D
     */
    get3DObject(){
        return this.mesh;
    }

}
