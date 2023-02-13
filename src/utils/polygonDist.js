import * as THREE from 'three';

/**
 * Clase que distribuye las comunidades
 */

export default class PolygonDist {

    constructor() {
        this.vertex = [];
    }

    /**
     * Generar y devolver un poligono dado lados y radio
     * @param {Number} n_sides Numero de lados del poligono
     * @param {Number} radius Radio del poligono
     * @returns Array de vertices
     */
    generatePolygon(n_sides, radius){
        for (let i = 0; i <= n_sides; i++) {
            let theta = (i / n_sides) * Math.PI * 2;
            let x = radius * Math.cos(theta);
            let z = radius * Math.sin(theta);
            this.vertex.push(new THREE.Vector3(x, 1, z));
        }
        return this.vertex;
    }

    /**
     * @returns Array de vertices
     */
    getVertex(){
        return this.vertex;
    }

    /**
     * @param {Number} i Indice del vertice que buscas
     * @returns Un solo vertice
     */
    getOneVertex(i){
        return this.vertex[i];
    }

}
