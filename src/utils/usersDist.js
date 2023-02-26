/**
 * Clase que distribuye los usuarios
 */
const coordCircle = [1, 6, 14, 21, 29];
const coordAcom = [1, 7, 21, 42, 73];

export default class UsersDist {

    constructor() {
        this.coord = [];
    }

    generateGeomPos(n_users, radius, center){
        let grand = 0;
        let xi, zi;
        for(let i = 0; i < coordAcom.length; i++){
            if(coordAcom[i] >= n_users){
                grand = i;
                break;
            }
        }
        if(grand === 0) grand = 1;
        let radiusPart = (radius-3)/grand;
        for (let i = 0; i <= grand; i++) {
            for(let j = 0; j < coordCircle[i]; j++){
                let theta = (j / coordCircle[i]) * Math.PI * 2;
                xi =  radiusPart*i * Math.cos(theta);
                zi =  radiusPart*i * Math.sin(theta);
                this.coord.push({"x":xi, "z": zi});
            }
        }
    }
    /**
     * @returns Array de coordenadas
     */
    getCoords(){
        return this.coord;
    }

    /**
     * @param {Number} i Indice de la coordenada que buscas
     * @returns Un solo vertice
     */
    getOneCoord(i){
        return this.coord[i];
    }

}
