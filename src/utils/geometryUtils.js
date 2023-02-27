import * as THREE from 'three';

export function generateGeomPos(n_users, radius, coordAcom, coordCircle){
    let coord = [];
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
            coord.push({"x":xi, "z": zi});
        }
    }
    return coord;
}

export function generatePolygon(n_sides, radius){
    let vertex = [];
    for (let i = 0; i <= n_sides; i++) {
        let theta = (i / n_sides) * Math.PI * 2;
        let x = radius * Math.cos(theta);
        let z = radius * Math.sin(theta);
        vertex.push(new THREE.Vector3(x, 1, z));
    }
    return vertex;
}

export function generateRadius(length, coordAcom) {
    let grand;
    for (let i = 0; i < coordAcom.length; i++) {
        if (coordAcom[i] >= length) {
            grand = i;
            break;
        }
    }
    let radius = grand * 10;
    if (radius === 0) radius = 4;
    return radius;
}

