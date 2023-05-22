export default class Observer {
    constructor(mainClass){
        this.mainClass = mainClass;
    }
    update(event) {
        // Método que será implementado por las subclases
        throw new Error('Method not implemented.');
    }
}

