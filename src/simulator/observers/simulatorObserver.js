import Observer from "../../engine/observers/observer";

export default class SimulatorObserver extends Observer{
    constructor(mainClass){
        super(mainClass);
    }
    
    /**
     * Maneja un evento y los datos asociados.
     * @param {string} event - El nombre del evento.
     * @param {*} data - Los datos asociados al evento.
     */
    update(event, data) {
        if(event === "selectObject"){        
            this.mainClass.setSelected(data)
        }
        if(event === "noObject"){
            this.mainClass.setSelected(null)
        }
    }
}

