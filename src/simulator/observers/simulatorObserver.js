import Observer from "../../engine/observers/observer";

export default class SimulatorObserver extends Observer{
    constructor(mainClass){
        super(mainClass);
    }
    update(event) {
        console.log(event)
        this.mainClass.setSelected(event)
    }
}

