/**
 * Clase que crea un borde para las comunidades
 */

import * as THREE from 'three';

export default class CommunityBorder {

    constructor( index, radius) {
        this.geometry = new THREE.CylinderGeometry( radius,radius,2, 32);
        this.edges = new THREE.EdgesGeometry( this.geometry );
        this.material = new THREE.MeshBasicMaterial( { color: 0x008000 } );
        this.circle = new THREE.LineSegments( this.edges, this.material );
        this.circle.name = "Borde "+index;
    }

    
    /**
     * Función para establecer la posición del borde
     * @param {Number} x 
     * @param {Number} y Altura
     * @param {Number} z 
     */
    setPosition(x, y, z) {
        this.circle.position.x = x;
        this.circle.position.y = y;
        this.circle.position.z = z;
    }

    /**
     * Función que devuelve el objecto3D
     * @returns Objecto borde
     */
    get3DObject() {
        return this.circle;
    }

}