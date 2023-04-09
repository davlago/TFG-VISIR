/**
 * Nombre: Entidad
 * Descripción: TODO
 */

export default class EntityInfo {

    constructor(data, color) {
        this.info = data;
        this.color = color;
    }

    setData(key, data) {
        this.info[key] = data;
    }

    getDataByKey(key) {
        return this.info[key];
    }

    getData() {
        return this.info;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

}