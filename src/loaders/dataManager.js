/**
 * Clase para cargar la data
 */

import * as data from '../../assets/data/data.json';

export default class DataManager {

    /**
     * Obtener la información del archivo data.json dada una clave
     * @param {String} key clave para obtener la data
     * @returns información de la data con esa key
     */
    getData(key){
        return data[key];
    }
    
}



