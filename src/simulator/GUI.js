export default class GUI {

    constructor(dataManager, scene, goDown, filter) {
        this.dataManager = dataManager;
        this.scene = scene;
        this.goDown = goDown;
        this.filter = filter;

        document.getElementById("xcross").addEventListener('click', () => {
            this.infoClose()
        });
        document.getElementById("filterIcon").addEventListener('click', () => {
            this.filterOpen()
        });
        document.getElementById("xFilter").addEventListener('click', () => {
            this.filterClose()
        });
        this.filterCheckbox();

        this.alertBox()


    }

    filterCheckbox() {
        let filters = ["gen-Male", "gen-Female", "age-young", "age-adult", "age-elderly", "lang-GER", "lang-ES", "lang-FR", "lang-IT"];
        for (let id of filters) {
            document.getElementById(id).addEventListener('click', () => {
                this.filterMethod()
            });
        }
    }

    displayAlertBox() {
        document.getElementById('miCuadroEmergente').style.display = 'block';
    }
    noDisplayAlertBox() {
        document.getElementById('miCuadroEmergente').style.display = 'none';
    }

    alertBox() {
        document.getElementById('info-box').addEventListener('mouseover', this.displayAlertBox);
        document.getElementById('info-box').addEventListener('mouseout', this.noDisplayAlertBox);

        document.getElementById('icross').addEventListener('mouseover', this.displayAlertBox);
        document.getElementById('icross').addEventListener('mouseout', this.noDisplayAlertBox);
    }

    noAlertBox() {
        document.getElementById('info-box').removeEventListener('mouseover', this.displayAlertBox);
        document.getElementById('info-box').removeEventListener('mouseout', this.noDisplayAlertBox);

        document.getElementById('icross').removeEventListener('mouseover', this.displayAlertBox);
        document.getElementById('icross').removeEventListener('mouseout', this.noDisplayAlertBox);
    }

    infoClose() {
        document.getElementById("info-box").className = "info retract";
        document.getElementById("info-box").style.zIndex = 5;

        document.getElementById("icross").className = "smalliIcon myShow"
        document.getElementById("xcross").className = "smallXIcon hide";

        document.getElementById("title").className = "hide";
        document.getElementById("infoDiv").className = "hide";
        this.goDown();
        this.alertBox();
    }

    infoOpen() {
        document.getElementById("info-box").className = "info expand";
        document.getElementById("info-box").style.zIndex = 0;
        document.getElementById("icross").className = "smalliIcon hide";
        document.getElementById("xcross").className = "smallXIcon myShow";
        document.getElementById("infoDiv").className = "myShow";
        document.getElementById("title").className = "myShow";
        this.noAlertBox()
    }

    filterOpen() {
        document.getElementById("filter-box").className = "filter expand"
        document.getElementById("filterDiv").className = "myShow"
        document.getElementById("filterIcon").className = "hide"
    }

    filterClose() {
        document.getElementById("filterDiv").className = "hide"
        document.getElementById("filter-box").className = "filter retractFilter"
        document.getElementById("filterIcon").className = "myShow"
    }

    filterMethod() {
        let filters = ["gen-Male", "gen-Female", "age-young", "age-adult", "age-elderly", "lang-GER", "lang-ES", "lang-FR", "lang-IT"];
        let arrayFilter = [];
        for (let id of filters) {
            if (document.getElementById(id).checked) {
                arrayFilter.push(id.split("-")[1])
            }
        }
        this.filter(arrayFilter);
    }


    changeBox(entity, type) {
        let title;
        let communityInfo;
        let userInfo;
        if (type === "User") {
            userInfo = this.dataManager.getUserById(entity.getName()).getData();
            let comEntity = this.scene.getEntity(entity.getInfo().getDataByKey("community"));
            communityInfo = this.dataManager.getCommunityById(comEntity.getName()).getData();
            title = "User: " + this.dataManager.getUserById(entity.getName()).getData().label;
            document.getElementById("title").className = "myShow";
            this.showUserInfo(userInfo);
        }
        else if (type === "Community") {
            communityInfo = this.dataManager.getCommunityById(entity.getName()).getData();
            title = "Community: " + this.dataManager.getCommunityById(entity.getName()).getData().name;
        }
        this.showCommunityInfo(communityInfo, type);
        this.infoOpen();
        document.getElementById("title").innerHTML = title;

    }

    showUserInfo(userInfo) {
        document.getElementById("user-gender-row").className = "myShow";
        document.getElementById("user-gender").innerHTML = userInfo.explicit_community.Gender;
    }

    showCommunityInfo(communityInfo, type) {
        if (type === "User") {
            document.getElementById("user-community-title-row").className = "myShow";
            document.getElementById("user-community-title").innerHTML = communityInfo.name;
        }
        if (type === "Community") {
            document.getElementById("user-community-title-row").className = "hide";
            document.getElementById("user-gender-row").className = "hide";
        }

        document.getElementById("community-nUsers-row").className = "myShow";
        document.getElementById("community-nUsers").innerHTML = communityInfo.users.length;

    }
}

