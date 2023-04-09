/**
 * Nombre: Entidad
 * Descripción: TODO
 */

export default class EntityInfo {

    constructor(data) {
        this.info = data;
    }

    setData(key, data){
        this.info[key] = data;
    }

    getDataByKey(key){
        return this.info[key];
    }

    getData(){
        return this.info;
    }

}