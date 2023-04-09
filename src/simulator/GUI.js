export default class GUI {

    constructor(dataManager) {
        this.dataManager = dataManager;

    }

    changeBox(entity, type) {
        let info = null;
        if (type === "User") {
            info = this.dataManager.getUserById(entity.getName()).getData();
        }
        else if (type === "Community") {
            info = this.dataManager.getCommunityById(entity.getName()).getData();
        }
        document.getElementById("info-box").className = "info expand";
        document.getElementById("community-title").className = "myShow";
        document.getElementById("community-title").innerHTML = info.label || info.name;

        document.getElementById("community-type-row").className = "data row myShow";
        document.getElementById("community-type").innerHTML = type;

        document.getElementById("icross").className = "smalliIcon hide";
        document.getElementById("xcross").className = "smallXIcon myShow";
    }

}

document.getElementById("xcross").addEventListener('mouseup', () => {
    document.getElementById("info-box").className = "info retract";
    document.getElementById("icross").className = "smalliIcon myShow"
    document.getElementById("xcross").className = "smallXIcon hide";
    document.getElementById("community-title").className = "hide";
    document.getElementById("community-type-row").className = "data row hide";
});