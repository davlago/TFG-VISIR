/**
 * Clase que distribuye las comunidades
 */

export default class PolygonDist {

    constructor(scene, n_sides, radius) {
        this.scene = scene;
        this.vertex = [];
        for (let i = 0; i <= n_sides; i++) {
            var theta = (i / n_sides) * Math.PI * 2;
            let x = radius * Math.cos(theta);
            let z = radius * Math.sin(theta);
            this.vertex.push(new THREE.Vector3(x, 1, z));
        }

        this.geometry = new THREE.BufferGeometry().setFromPoints(this.vertex);

        this.material = new THREE.LineBasicMaterial({ color: 0x00000 });

        this.line = new THREE.Line(this.geometry, this.material);
    }

    setPosition(x, y, z) {
        this.line.position.x = x;
        this.line.position.y = y;
        this.line.position.z = z;
    }

    getVertex(){
        return this.vertex;
    }

    getOneVertex(i){
        return this.vertex[i];
    }

    get3DObject() {
        return this.line
    }

}
