import Observer from "../../engine/observers/observer";

export default class SimulatorObserver extends Observer{
    constructor(mainClass){
        super(mainClass);
    }
    update(event, data) {
        if(event === "selectObject"){        
            this.mainClass.setSelected(data)
        }
    }
}

